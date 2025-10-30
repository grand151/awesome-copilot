import { WebContainer } from '@webcontainer/api';

let webcontainerInstance = null;

export async function getWebContainer() {
  if (!webcontainerInstance) {
    webcontainerInstance = await WebContainer.boot();
  }
  return webcontainerInstance;
}

export const defaultFiles = {
  'package.json': {
    file: {
      contents: JSON.stringify({
        name: 'example-app',
        type: 'module',
        dependencies: {},
        scripts: {
          start: 'node index.js'
        }
      }, null, 2)
    }
  },
  'index.js': {
    file: {
      contents: `console.log('Hello from WebContainer!');
console.log('Edit files and run commands to see changes.');

// Example: Simple HTTP server
import { createServer } from 'http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(\`
    <!DOCTYPE html>
    <html>
      <head>
        <title>WebContainer App</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f5;
          }
          h1 { color: #333; }
          p { color: #666; line-height: 1.6; }
          .box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>🚀 WebContainer is Running!</h1>
          <p>Your Node.js app is running inside the browser.</p>
          <p>Edit the code in the editor and run <code>npm start</code> to see changes.</p>
          <p>Current time: \${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  \`);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});
`
    }
  },
  'README.md': {
    file: {
      contents: `# WebContainer Example

This is a sample project running in WebContainer.

## Available Commands

- \`npm start\` - Run the application
- \`node index.js\` - Run the main file directly
- \`ls\` - List files
- \`cat <filename>\` - View file contents

## Try These

1. Edit \`index.js\` to modify the server response
2. Create new files using the file explorer
3. Run commands in the terminal
4. See your changes in real-time!
`
    }
  }
};

export async function initializeFiles(webcontainer) {
  await webcontainer.mount(defaultFiles);
}
