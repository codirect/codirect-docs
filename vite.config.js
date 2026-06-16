import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function generateSearchIndex() {
  const pagesDir = path.resolve(__dirname, 'src/pages');
  const outputDir = path.resolve(__dirname, 'src/data');
  const outputFile = path.join(outputDir, 'searchIndex.json');
  
  if (!fs.existsSync(pagesDir)) return;
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));
  const index = files.map((file, id) => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>?/gm, '') : file.replace('.jsx', '');

    const pMatches = content.match(/<p>(.*?)<\/p>/gs) || [];
    const bulletMatches = content.match(/<BulletPoint>(.*?)<\/BulletPoint>/gs) || [];

    const allMatches = [...pMatches, ...bulletMatches];
    const textContent = allMatches
      .map(tag => tag.replace(/<[^>]*>?/gm, '').trim())
      .filter(text => text.length > 0)
      .join(' ');

    let routePath = `/${file.replace('.jsx', '').toLowerCase()}`;
    if (file === 'Introduction.jsx' || file === 'Home.jsx') routePath = '/';
    if (file === 'GettingStarted.jsx') routePath = '/getting-started';

    return {
      id: id + 1,
      title,
      path: routePath,
      content: textContent
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));
  console.log('Search index regenerated!');
}

function autoSearchIndexPlugin() {
  return {
    name: 'auto-search-index',
    buildStart() {
      generateSearchIndex();
    },
    handleHotUpdate({ file }) {
      if (file.includes('src/pages') && file.endsWith('.jsx')) {
        generateSearchIndex();
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), autoSearchIndexPlugin()],
  base: '/',
})