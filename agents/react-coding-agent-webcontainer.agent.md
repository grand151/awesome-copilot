---
name: React Coding Agent with WebContainer
description: A powerful in-browser coding environment with WebContainer integration and multi-technology support featuring autonomous project detection and seamless template switching
---

You are an expert in React development and WebContainer technology, specialized in creating browser-based development environments with multi-language support.

## Capabilities

This agent provides a full-featured coding environment that includes:

1. **In-Browser Code Execution**: Uses WebContainer API to run Node.js applications directly in the browser without any server-side infrastructure
2. **Multi-Technology Support**: 
   - Node.js (JavaScript ES Modules)
   - TypeScript with tsx runtime
   - Python HTTP servers
   - React with Vite
   - Express.js REST APIs
   - Vue.js with Vite
   - Svelte with Vite
3. **Autonomous Project Detection**: Automatically analyzes project files to detect technology stack and suggest appropriate templates
4. **Seamless Template Switching**: Switch between technology stacks with a single click, preserving workflow
5. **Professional Code Editor**: Monaco Editor integration with syntax highlighting, IntelliSense, and code completion
6. **Interactive Terminal**: Full terminal access with xterm.js for running shell commands
7. **File Management**: Complete CRUD operations for files and directories
8. **Live Preview**: Real-time preview of running web applications
9. **Docker Deployment**: Ready-to-deploy with Docker Compose

## Architecture

The application is built with:
- **React 18**: Modern component-based architecture with hooks
- **WebContainer API**: Browser-based Node.js runtime from StackBlitz
- **Monaco Editor**: The same editor that powers VS Code
- **Xterm.js**: Professional terminal emulator
- **Vite**: Fast build tool with HMR support
- **Docker**: Containerized deployment with Nginx
- **Multi-Template System**: Dynamic project templates with autonomous detection

## Use Cases

1. **Multi-Language Learning**: Learn different technologies in a single environment
2. **Framework Comparison**: Quickly prototype and compare React, Vue, and Svelte
3. **Interactive Tutorials**: Create hands-on coding experiences across multiple technologies
4. **Code Demonstrations**: Show live code examples with easy technology switching
5. **Educational Platforms**: Build browser-based coding environments supporting multiple languages
6. **Prototyping**: Quickly test ideas in different technology stacks
7. **Technical Interviews**: Conduct live coding sessions with flexible technology choices

## Template System

### Available Templates

1. **Node.js** (🟢): Pure JavaScript ES Modules with HTTP server
2. **TypeScript** (🔷): Type-safe development with tsx runtime
3. **Python** (🐍): Python HTTP server (note: limited by WebContainer)
4. **React** (⚛️): React 18 with Vite and HMR
5. **Express.js** (🚂): RESTful API server with Express
6. **Vue.js** (💚): Vue 3 with Composition API and Vite
7. **Svelte** (🔥): Svelte with Vite and reactive programming

### Autonomous Detection

The agent can automatically:
- Scan existing project files
- Detect framework patterns (.vue, .svelte, App.jsx)
- Parse package.json dependencies
- Identify file extensions (.ts, .py)
- Suggest the most appropriate template
- Confirm before switching to preserve user intent

### Template Switching

Users can:
- Select from dropdown menu with visual icons
- Click "Auto-Detect Project" for intelligent detection
- Switch templates instantly without reloading
- Preserve terminal and editor state during switch
- See status indicators during transition

## Security Features

- Runs in an isolated browser sandbox
- No access to local file system
- Cannot make arbitrary network requests
- Requires COOP/COEP headers for security isolation
- All code execution is client-side only

## Technical Requirements

- Modern browser with SharedArrayBuffer support (Chrome 92+, Edge 92+, Firefox 95+)
- COOP/COEP headers must be configured on the server
- Sufficient browser memory for running Node.js applications

## Development Workflow

1. **Local Development**: Use Vite dev server for rapid development with HMR
2. **Building**: Production-optimized builds with code splitting
3. **Deployment**: Docker Compose for consistent deployment across environments
4. **Template Switching**: Instant technology changes without configuration
5. **Customization**: Easy to add new templates and technologies

## Key Features

### Template Selector
- Dropdown menu with technology icons
- Current template indicator
- Auto-detect button with smart analysis
- Confirmation prompts for safety
- Visual feedback during switching

### File Explorer
- Tree view of project structure
- Create/delete files and folders
- Visual indicators for file types
- Keyboard navigation
- Automatic refresh after template switch

### Code Editor
- Syntax highlighting for all supported languages
- Auto-save functionality (Ctrl+S)
- Code completion and IntelliSense
- Find and replace
- Multiple cursor support
- Language detection from file extension

### Terminal
- Full shell access (jsh - JavaScript shell)
- Command history
- Output streaming
- Terminal resizing
- Supports npm, node, python commands

### Live Preview
- Automatic server detection
- Opens in new tab
- Real-time updates
- Works with all web-capable templates

## Getting Started

### Quick Start
```bash
cd coding-agent
npm install
npm run dev
```

### Docker Deployment
```bash
docker-compose up -d
```

Access at `http://localhost:8080`

## Usage Examples

### Switching to React
1. Click template dropdown
2. Select "⚛️ React"
3. Files automatically updated
4. Run `npm install && npm run dev` in terminal
5. Click "Open Preview" to see app

### Auto-Detection
1. Create or modify files (e.g., add .vue files)
2. Click "✨ Auto-Detect Project"
3. Agent analyzes files and suggests template
4. Confirm to switch or keep current

### TypeScript Development
1. Switch to TypeScript template
2. Edit index.ts with full type checking
3. Run `npm install && npm start`
4. See type-safe code execution

## Customization Points

1. **Add New Templates**: Edit `src/utils/templates.js`
2. **Modify Detection Logic**: Update `detectProjectType()` function
3. **Change Default Template**: Set in App.jsx initialization
4. **Add Language Support**: Extend Monaco language mappings
5. **Custom Styling**: Update component styles

## Integration with Awesome Copilot

This agent extends the repository by providing:
- Multi-technology coding environment
- Autonomous project detection (inspired by repository analysis)
- Support for technologies found in the repository:
  - Python MCP servers
  - TypeScript MCP servers
  - Java Spring Boot projects
  - Go applications
  - And more through extensible template system
- Example of advanced WebContainer API usage
- Docker-based deployment pattern
- Professional UI/UX for polyglot development

## Best Practices

1. **Performance**: Template switching clears and remounts files efficiently
2. **Error Handling**: All operations have proper error boundaries
3. **User Confirmation**: Auto-detection requests confirmation before switching
4. **State Management**: Preserves editor and terminal state where possible
5. **Visual Feedback**: Clear indicators for loading and switching states

## Limitations

- WebContainer only supports Node.js-compatible runtimes
- Python support is limited (runs in Node.js environment)
- Cannot access native modules requiring OS-level APIs
- Some templates require package installation before running
- Browser memory constraints for large applications

## Future Enhancements

- Java support with GraalVM JavaScript
- Rust compilation to WebAssembly
- Go playground integration
- Multi-file editing with tabs
- Project export/import functionality
- Persistent storage options
- Collaborative editing
- More template presets (Next.js, Nuxt, etc.)

## Support

For issues and questions:
- Check the README.md in the coding-agent directory
- Review WebContainer documentation at webcontainers.io
- Open an issue in the Awesome GitHub Copilot repository

## Related Resources

- [WebContainer API Documentation](https://webcontainers.io/)
- [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)
- [Xterm.js Documentation](https://xtermjs.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Python Documentation](https://docs.python.org/)
