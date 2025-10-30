// Project templates for different technologies found in the repository
export const projectTemplates = {
  nodejs: {
    name: 'Node.js',
    icon: '🟢',
    language: 'javascript',
    files: {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'nodejs-app',
            type: 'module',
            dependencies: {},
            scripts: {
              start: 'node index.js',
              dev: 'node --watch index.js'
            }
          }, null, 2)
        }
      },
      'index.js': {
        file: {
          contents: `// Node.js Application
import { createServer } from 'http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Node.js server running in WebContainer!',
    timestamp: new Date().toISOString(),
    technology: 'Node.js'
  }));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(\`✅ Node.js server running at http://localhost:\${PORT}\`);
});
`
        }
      }
    }
  },

  typescript: {
    name: 'TypeScript',
    icon: '🔷',
    language: 'typescript',
    files: {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'typescript-app',
            type: 'module',
            dependencies: {
              'tsx': '^4.7.0'
            },
            scripts: {
              start: 'tsx index.ts',
              dev: 'tsx watch index.ts'
            }
          }, null, 2)
        }
      },
      'index.ts': {
        file: {
          contents: `// TypeScript Application
interface ServerConfig {
  port: number;
  host: string;
}

interface Response {
  message: string;
  timestamp: string;
  technology: string;
  typed: boolean;
}

const config: ServerConfig = {
  port: 3001,
  host: 'localhost'
};

async function startServer(): Promise<void> {
  const { createServer } = await import('http');
  
  const server = createServer((req, res) => {
    const response: Response = {
      message: 'TypeScript server running in WebContainer!',
      timestamp: new Date().toISOString(),
      technology: 'TypeScript',
      typed: true
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response, null, 2));
  });

  server.listen(config.port, () => {
    console.log(\`✅ TypeScript server running at http://\${config.host}:\${config.port}\`);
  });
}

startServer().catch(console.error);
`
        }
      },
      'tsconfig.json': {
        file: {
          contents: JSON.stringify({
            compilerOptions: {
              target: 'ES2022',
              module: 'ES2022',
              moduleResolution: 'node',
              strict: true,
              esModuleInterop: true,
              skipLibCheck: true
            }
          }, null, 2)
        }
      }
    }
  },

  python: {
    name: 'Python',
    icon: '🐍',
    language: 'python',
    files: {
      'main.py': {
        file: {
          contents: `#!/usr/bin/env python3
"""Python Application running in WebContainer"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from datetime import datetime

class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        response = {
            'message': 'Python server running in WebContainer!',
            'timestamp': datetime.now().isoformat(),
            'technology': 'Python',
            'version': '3.x'
        }
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response, indent=2).encode())
    
    def log_message(self, format, *args):
        pass  # Suppress default logging

def main():
    port = 3001
    server = HTTPServer(('', port), SimpleHandler)
    print(f'✅ Python server running at http://localhost:{port}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\\n👋 Server stopped')

if __name__ == '__main__':
    main()
`
        }
      },
      'README.md': {
        file: {
          contents: `# Python Application

Run with: \`python main.py\`

This is a Python HTTP server running in WebContainer.
`
        }
      }
    }
  },

  react: {
    name: 'React',
    icon: '⚛️',
    language: 'javascript',
    files: {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'react-app',
            type: 'module',
            dependencies: {
              'react': '^18.2.0',
              'react-dom': '^18.2.0',
              'vite': '^5.0.0',
              '@vitejs/plugin-react': '^4.2.0'
            },
            scripts: {
              dev: 'vite',
              build: 'vite build',
              preview: 'vite preview'
            }
          }, null, 2)
        }
      },
      'vite.config.js': {
        file: {
          contents: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  }
})
`
        }
      },
      'index.html': {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App in WebContainer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
        }
      },
      'src/main.jsx': {
        directory: {}
      },
      'src/App.jsx': {
        file: {
          contents: `import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      fontFamily: 'system-ui', 
      maxWidth: '600px', 
      margin: '40px auto',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>⚛️ React in WebContainer!</h1>
      <p>This React app is running entirely in your browser.</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          background: '#61dafb',
          color: '#000'
        }}
      >
        Count: {count}
      </button>
    </div>
  )
}

export default App
`
        }
      }
    }
  },

  express: {
    name: 'Express.js',
    icon: '🚂',
    language: 'javascript',
    files: {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'express-app',
            type: 'module',
            dependencies: {
              'express': '^4.18.0'
            },
            scripts: {
              start: 'node server.js'
            }
          }, null, 2)
        }
      },
      'server.js': {
        file: {
          contents: `import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Express.js server running in WebContainer!',
    timestamp: new Date().toISOString(),
    technology: 'Express.js',
    endpoints: {
      'GET /': 'This endpoint',
      'GET /api/data': 'Sample data endpoint',
      'POST /api/echo': 'Echo back JSON'
    }
  });
});

app.get('/api/data', (req, res) => {
  res.json({
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]
  });
});

app.post('/api/echo', (req, res) => {
  res.json({
    echo: req.body,
    receivedAt: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(\`✅ Express server running at http://localhost:\${PORT}\`);
});
`
        }
      }
    }
  },

  vue: {
    name: 'Vue.js',
    icon: '💚',
    language: 'javascript',
    files: {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'vue-app',
            type: 'module',
            dependencies: {
              'vue': '^3.3.0',
              'vite': '^5.0.0',
              '@vitejs/plugin-vue': '^5.0.0'
            },
            scripts: {
              dev: 'vite',
              build: 'vite build'
            }
          }, null, 2)
        }
      },
      'vite.config.js': {
        file: {
          contents: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001
  }
})
`
        }
      },
      'index.html': {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue App in WebContainer</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`
        }
      },
      'src/main.js': {
        file: {
          contents: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`
        }
      },
      'src/App.vue': {
        file: {
          contents: `<template>
  <div class="app">
    <h1>💚 Vue.js in WebContainer!</h1>
    <p>This Vue app is running entirely in your browser.</p>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<style scoped>
.app {
  font-family: system-ui;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background: #42b883;
  color: white;
}
</style>
`
        }
      }
    }
  },

  svelte: {
    name: 'Svelte',
    icon: '🔥',
    language: 'javascript',
    files: {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'svelte-app',
            type: 'module',
            dependencies: {
              'svelte': '^4.0.0',
              'vite': '^5.0.0',
              '@sveltejs/vite-plugin-svelte': '^3.0.0'
            },
            scripts: {
              dev: 'vite',
              build: 'vite build'
            }
          }, null, 2)
        }
      },
      'vite.config.js': {
        file: {
          contents: `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3001
  }
})
`
        }
      },
      'svelte.config.js': {
        file: {
          contents: `export default {
  // Svelte config options
}
`
        }
      },
      'index.html': {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Svelte App in WebContainer</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`
        }
      },
      'src/main.js': {
        file: {
          contents: `import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
`
        }
      },
      'src/App.svelte': {
        file: {
          contents: `<script>
  let count = 0;
</script>

<div class="app">
  <h1>🔥 Svelte in WebContainer!</h1>
  <p>This Svelte app is running entirely in your browser.</p>
  <button on:click={() => count++}>
    Count: {count}
  </button>
</div>

<style>
  .app {
    font-family: system-ui;
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    text-align: center;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background: #ff3e00;
    color: white;
  }
</style>
`
        }
      }
    }
  }
};

// Autonomous technology detection based on file patterns
export function detectProjectType(files) {
  const fileNames = Object.keys(files);
  
  // Check for specific framework files
  if (fileNames.some(f => f.includes('.vue'))) return 'vue';
  if (fileNames.some(f => f.includes('.svelte'))) return 'svelte';
  if (fileNames.some(f => f.includes('App.jsx') || f.includes('App.tsx'))) return 'react';
  
  // Check package.json for dependencies
  const packageJson = files['package.json'];
  if (packageJson) {
    try {
      const content = typeof packageJson === 'string' 
        ? packageJson 
        : packageJson.file?.contents || '';
      const pkg = JSON.parse(content);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      
      if (deps['express']) return 'express';
      if (deps['react']) return 'react';
      if (deps['vue']) return 'vue';
      if (deps['svelte']) return 'svelte';
      if (deps['typescript'] || deps['tsx']) return 'typescript';
    } catch (e) {
      // Ignore parse errors
    }
  }
  
  // Check for Python files
  if (fileNames.some(f => f.endsWith('.py'))) return 'python';
  
  // Check for TypeScript files
  if (fileNames.some(f => f.endsWith('.ts') && !f.includes('node_modules'))) return 'typescript';
  
  // Default to Node.js
  return 'nodejs';
}

export async function initializeFilesWithTemplate(webcontainer, templateName = 'nodejs') {
  const template = projectTemplates[templateName];
  if (!template) {
    throw new Error(`Unknown template: ${templateName}`);
  }
  
  await webcontainer.mount(template.files);
  return template;
}

export { projectTemplates as templates };
