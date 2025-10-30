// Quick start templates and scaffolding helpers inspired by repository prompts
export const quickStartTemplates = {
  'express-api': {
    name: 'Express REST API',
    icon: '🚂',
    description: 'Complete REST API with Express, including routes and middleware',
    files: {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'express-rest-api',
            version: '1.0.0',
            type: 'module',
            scripts: {
              start: 'node server.js',
              dev: 'node --watch server.js'
            },
            dependencies: {
              express: '^4.18.0',
              cors: '^2.8.5'
            }
          }, null, 2)
        }
      },
      'server.js': {
        file: {
          contents: `import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sample API routes
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = { id, name: 'Sample User', email: 'user@example.com' };
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = { id, ...req.body };
  res.json(updatedUser);
});

app.delete('/api/users/:id', (req, res) => {
  res.status(204).send();
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(\`✅ Server running on http://localhost:\${PORT}\`);
  console.log(\`📝 Try: curl http://localhost:\${PORT}/api/users\`);
});
`
        }
      },
      'README.md': {
        file: {
          contents: `# Express REST API

## Available Endpoints

- \`GET /health\` - Health check
- \`GET /api/users\` - Get all users
- \`GET /api/users/:id\` - Get user by ID
- \`POST /api/users\` - Create new user
- \`PUT /api/users/:id\` - Update user
- \`DELETE /api/users/:id\` - Delete user

## Getting Started

\`\`\`bash
npm install
npm start
\`\`\`

## Test the API

\`\`\`bash
# Get all users
curl http://localhost:3001/api/users

# Create a user
curl -X POST http://localhost:3001/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"New User","email":"new@example.com"}'
\`\`\`
`
        }
      }
    }
  },

  'react-todo': {
    name: 'React Todo App',
    icon: '⚛️',
    description: 'Complete Todo application with React hooks and local storage',
    files: {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'react-todo-app',
            type: 'module',
            scripts: {
              dev: 'vite',
              build: 'vite build'
            },
            dependencies: {
              react: '^18.2.0',
              'react-dom': '^18.2.0',
              vite: '^5.0.0',
              '@vitejs/plugin-react': '^4.2.0'
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
  server: { port: 3001 }
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
    <title>React Todo App</title>
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
        file: {
          contents: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`
        }
      },
      'src/App.jsx': {
        file: {
          contents: `import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'system-ui'
    }}>
      <h1>✅ Todo App</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '5px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      <div>
        {todos.map(todo => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              marginBottom: '10px',
              background: '#f5f5f5',
              borderRadius: '5px'
            }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{
              flex: 1,
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#999' : '#000'
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: '5px 10px',
                background: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        {todos.filter(t => !t.done).length} remaining
      </p>
    </div>
  )
}

export default App
`
        }
      }
    }
  },

  'typescript-api': {
    name: 'TypeScript API',
    icon: '🔷',
    description: 'Type-safe REST API with TypeScript and Express',
    files: {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: 'typescript-api',
            type: 'module',
            scripts: {
              start: 'tsx server.ts',
              dev: 'tsx watch server.ts'
            },
            dependencies: {
              express: '^4.18.0',
              tsx: '^4.7.0'
            }
          }, null, 2)
        }
      },
      'server.ts': {
        file: {
          contents: `import express, { Request, Response, NextFunction } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const app = express();
const PORT = 3001;

app.use(express.json());

// Mock database
const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
];

// GET all users
app.get('/api/users', (req: Request, res: Response<ApiResponse<User[]>>) => {
  res.json({ success: true, data: users });
});

// GET user by ID
app.get('/api/users/:id', (req: Request, res: Response<ApiResponse<User>>) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (user) {
    res.json({ success: true, data: user });
  } else {
    res.status(404).json({ success: false, error: 'User not found' });
  }
});

// POST create user
app.post('/api/users', (req: Request, res: Response<ApiResponse<User>>) => {
  const newUser: User = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(\`✅ TypeScript API running on http://localhost:\${PORT}\`);
});
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
              skipLibCheck: true,
              forceConsistentCasingInFileNames: true
            }
          }, null, 2)
        }
      }
    }
  },

  'dockerfile': {
    name: 'Dockerfile Multi-Stage',
    icon: '🐳',
    description: 'Multi-stage Dockerfile for Node.js applications',
    files: {
      'Dockerfile': {
        file: {
          contents: `# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build if needed (uncomment for TypeScript/React)
# RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Run application
CMD ["npm", "start"]
`
        }
      },
      '.dockerignore': {
        file: {
          contents: `node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.DS_Store
dist
build
coverage
*.log
`
        }
      },
      'docker-compose.yml': {
        file: {
          contents: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
`
        }
      }
    }
  }
};

export async function applyQuickStart(webcontainer, templateKey) {
  const template = quickStartTemplates[templateKey];
  if (!template) {
    throw new Error(`Unknown quick start template: ${templateKey}`);
  }

  await webcontainer.mount(template.files);
  return template;
}
