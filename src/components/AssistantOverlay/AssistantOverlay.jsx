import React, { useEffect, useState, useRef } from 'react'
import Groq from 'groq-sdk'
import "./AssistantOverlay.css"
import Space from '../Space'
import Section from '../Section'
import BulletPoint from '../BulletPoint'
import { SaveIcon, SendIcon, Sparkles, X, ArrowUpRight } from 'lucide-react'

import searchIndex from '../../data/searchIndex.json'

function AssistantOverlay({ onClose }) {
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [apiKey, setApiKey] = useState(null)
  const [isCheckingKey, setIsCheckingKey] = useState(true)

  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    const key = localStorage.getItem('ai_api_key')
    setApiKey(key || '')
    setIsCheckingKey(false)
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
    }
  }, [messages, isLoading])

  const saveApiKey = () => {
    if (!apiKeyInput.trim()) return
    setApiKey(apiKeyInput)
    localStorage.setItem('ai_api_key', apiKeyInput)
  }

  const handleAskAssistant = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    const userQuestion = prompt.trim()
    setPrompt('')
    setIsLoading(true)

    setMessages(prev => [...prev, { role: 'user', content: userQuestion }])

    try {
      const groqClient = new Groq({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      })

      // Token Optimization: Filter the search index to only include relevant documentation pages
      const keywords = userQuestion
        .toLowerCase()
        .split(/[^a-zA-Z0-9]/)
        .filter(word => word.length > 2)

      const relevantPages = searchIndex.filter(page => {
        const textToSearch = `${page.title} ${page.content}`.toLowerCase()
        return keywords.some(keyword => textToSearch.includes(keyword))
      })

      // Fallback to the first 3 pages if no explicit keywords match to maintain context
      const pagesToContextualize = relevantPages.length > 0 ? relevantPages : searchIndex.slice(0, 3)

      const contextString = pagesToContextualize
        .map(page => `DOCUMENT PAGE: ${page.title}\nROUTE PATH: ${page.path}\nCONTENT DETAILS: ${page.content}`)
        .join("\n\n")

      const systemPrompt = `
  You are a highly professional, technically precise conversational support AI for the coDIRECT ecosystem documentation workspace.
  
  CRITICAL TECHNICAL DOCUMENTATION CONTEXT REFERENCE:
  ${contextString}
  
  BEHAVIORAL DIRECTIVES:
  1. GREETINGS: If addressed with general openings ("Hi", "Hello", "Hey"), greet them back warmly, explicitly identify yourself as the coDIRECT technical documentation assistant, and invite workflow questions.
  2. BOUNDARY FILTER: If a user query does not relate to coDIRECT or lacks relevant context parameters, respond EXACTLY with:
       <p>I'm sorry, but I can only assist with questions directly regarding the coDIRECT ecosystem.</p>
  3. COMPETITIVE COMPARISONS: Never deflect questions comparing coDIRECT to other platforms (e.g., "Why choose coDIRECT over LiveEdit?"). Address them confidently by highlighting coDIRECT's distinctive values, open-sourceness, being free, timeline speed, and deep native Bitfocus Companion integration.
  4. DOCUMENT LINKING RULE: Whenever your solution draws from, references, or answers a problem documented in an index page, you MUST imbed an inline link component: <DocLink path="EXACT_ROUTE_PATH">Descriptive Link Text</DocLink>.
  5. BE CONCISE!
  6. ONLY ADD DocLinks WHEN NECESSARY! DO NOT ADD THEM JUST CAUSE!
  7. ALWAYS HELP FIRST. IF YOU CAN ANSWER IN NATURAL LANGUAGE, DO NOT SEND THE USER TO A DOCS PAGE!
  8. DO NOT CONSTANTLY ASK THE USER TO CONTINUE EXPLORING THE DOCS! IT IS ANNOYING!

  MARKUP & SANITIZATION RULES:
  - NEVER output raw Markdown notations (*, #, -, lists).
  - NEVER leak internal routing functions like "navigate('/...')" or raw HTML anchor links "<a>" from your source index into the text.
  - You MUST wrap all structural layout data cleanly inside these tags:
    * Parent layout sections for grouped items: <Section title="Descriptive Section Title">...</Section>
    * Point breakout line definitions: <BulletPoint>Technical item or detail step description</BulletPoint>
    * Standard conversational or descriptive lines: <p>Paragraph text details...</p>
    * Contextual routing buttons (can be used directly inside text flows): <DocLink path="/target-path">Button Text</DocLink>
`

      const response = await groqClient.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: "user", content: userQuestion }
        ],
        stream: false
      })

      const assistantReply = response.choices[0]?.message?.content || '<p>Connection pipeline returned empty data arrays.</p>'
      setMessages(prev => [...prev, { role: 'assistant', content: assistantReply }])

    } catch (error) {
      console.error("Groq API Error Encountered:", error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const parseInlineLinks = (text) => {
    if (typeof text !== 'string') return text

    const linkRegex = /<DocLink path="([^"]+)">([^<]+)<\/DocLink>/gi
    const segments = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push(text.substring(lastIndex, match.index))
      }

      const path = match[1]
      const linkText = match[2]

      segments.push(
        <a key={match.index} href={path} className="ai-doc-link-chip" target="_blank" rel="noopener noreferrer">
          {linkText} <ArrowUpRight size={13} className="link-chip-arrow" />
        </a>
      )

      lastIndex = linkRegex.lastIndex
    }

    if (lastIndex < text.length) {
      segments.push(text.substring(lastIndex))
    }

    return segments.length > 0 ? segments : text
  }

  const parseRawContent = (rawHtml) => {
    if (!rawHtml) return []

    const regex = /(<Section title="[^"]+">|<\/Section>|<BulletPoint>|<\/BulletPoint>|<p>|<\/p>)/gi
    const pieces = rawHtml.split(regex)

    let structuredBlocks = []
    let currentSectionTitle = null
    let sectionChildren = []
    let activeTag = null

    pieces.forEach((piece, index) => {
      if (!piece) return
      const cleanPiece = piece.trim()
      if (!cleanPiece) return

      const lowerPiece = cleanPiece.toLowerCase()

      if (lowerPiece.startsWith('<section')) {
        const match = piece.match(/title="([^"]+)"/i)
        currentSectionTitle = match ? match[1] : "Details"
        activeTag = 'SECTION'
      } else if (lowerPiece === '</section>') {
        if (sectionChildren.length > 0) {
          structuredBlocks.push({ type: 'SECTION_BLOCK', title: currentSectionTitle, children: [...sectionChildren] })
        }
        sectionChildren = []
        currentSectionTitle = null
        activeTag = null
      } else if (lowerPiece === '<bulletpoint>') {
        activeTag = currentSectionTitle ? 'SEC_BULLET' : 'BULLET'
      } else if (lowerPiece === '</bulletpoint>') {
        activeTag = currentSectionTitle ? 'SECTION' : null
      } else if (lowerPiece === '<p>') {
        activeTag = currentSectionTitle ? 'SEC_P' : 'P'
      } else if (lowerPiece === '</p>') {
        activeTag = currentSectionTitle ? 'SECTION' : null
      } else {
        if (activeTag === 'SEC_BULLET') {
          sectionChildren.push(<BulletPoint key={index}>{parseInlineLinks(cleanPiece)}</BulletPoint>)
        } else if (activeTag === 'SEC_P') {
          sectionChildren.push(<p key={index} className="ai-chat-p">{parseInlineLinks(cleanPiece)}</p>)
        } else if (activeTag === 'BULLET') {
          structuredBlocks.push({ type: 'BULLET_BLOCK', content: <BulletPoint>{parseInlineLinks(cleanPiece)}</BulletPoint> })
        } else if (activeTag === 'P' || activeTag === 'SECTION' || !activeTag) {
          structuredBlocks.push({ type: 'P_BLOCK', content: <p className="ai-chat-p">{parseInlineLinks(cleanPiece)}</p> })
        }
      }
    })

    if (sectionChildren.length > 0 && currentSectionTitle) {
      structuredBlocks.push({ type: 'SECTION_BLOCK', title: currentSectionTitle, children: sectionChildren })
    }

    return structuredBlocks
  }

  const renderRevealContent = (rawHtml) => {
    const blocks = parseRawContent(rawHtml)

    return blocks.map((block, index) => {
      const cascadeDelay = `${index * 80}ms`

      if (block.type === 'SECTION_BLOCK') {
        return (
          <div key={index} className="reveal-fade-wrapper" style={{ animationDelay: cascadeDelay }}>
            <Section title={block.title}>
              {block.children}
            </Section>
          </div>
        )
      }

      return (
        <div key={index} className="reveal-fade-wrapper" style={{ animationDelay: cascadeDelay }}>
          {block.content}
        </div>
      )
    })
  }

  if (isCheckingKey) return <div className="assistant-overlay" />

  const hasStarted = messages.length > 0

  return (
    <div className='assistant-overlay'>
      <button className="overlay-close-btn" onClick={onClose} aria-label="Close Assistant">
        <X size={22} />
      </button>

      <div className="assistant">
        {!apiKey ? (
          <div className="setup-wrapper">
            <h1>Ask any question regarding coDIRECT</h1>
            <Space direction='vertical' amount='1.5rem' />
            <div className='input-container'>
              <input
                className='api-input'
                placeholder='API Key'
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
              />
              <button className='submit-button api' onClick={saveApiKey}>
                SET <SaveIcon size={18} />
              </button>
            </div>
            <p className="helper-link">Get your API key from <a className='link' href='https://console.groq.com/keys' target='_blank' rel='noopener noreferrer'>Groq</a></p>
          </div>
        ) : (
          <div className="chat-layout-wrapper">

            {!hasStarted && (
              <div className="chat-hero-banner">
                <div className="flashy-icon-ring"><Sparkles size={26} className="sparkle-glow" /></div>
                <h1>Ask any question regarding coDIRECT</h1>
              </div>
            )}

            {hasStarted && (
              <div className="chat-response-scroller">
                <div className="chat-scroller-inner">
                  {messages.map((msg, i) => (
                    <div key={i} className={`chat-bubble-row ${msg.role}`}>
                      <div className="bubble-speaker-label">{msg.role === 'user' ? 'You' : 'coDIRECT AI'}</div>
                      <div className="bubble-content-text">
                        {msg.role === 'user' ? <p className="ai-chat-p">{msg.content}</p> : renderRevealContent(msg.content)}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="ai-loading-pulse">Thinking...</div>
                  )}

                  <div ref={messagesEndRef} style={{ height: '2px' }} />
                </div>
              </div>
            )}

            <form className='input-container' onSubmit={handleAskAssistant}>
              <input
                className='prompt-input'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Ask...'
                disabled={isLoading}
              />
              <button type="submit" className='submit-button' disabled={isLoading || !prompt.trim()}>
                <SendIcon size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssistantOverlay