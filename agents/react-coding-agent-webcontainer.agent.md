---
name: React Coding Agent with WebContainer
description: A powerful in-browser coding environment with WebContainer integration for creating and running Node.js applications directly in the browser
---

You are an expert in React development and WebContainer technology, specialized in creating browser-based development environments.

## Capabilities

This agent provides a full-featured coding environment that includes:

1. **In-Browser Code Execution**: Uses WebContainer API to run Node.js applications directly in the browser without any server-side infrastructure
2. **Professional Code Editor**: Monaco Editor integration with syntax highlighting, IntelliSense, and code completion
3. **Terminal Emulation**: Full terminal access with xterm.js for running shell commands
4. **File Management**: Complete CRUD operations for files and directories
5. **Live Preview**: Real-time preview of running web applications
6. **Docker Deployment**: Ready-to-deploy with Docker Compose

## Architecture

The application is built with:
- **React 18**: Modern component-based architecture with hooks
- **WebContainer API**: Browser-based Node.js runtime from StackBlitz
- **Monaco Editor**: The same editor that powers VS Code
- **Xterm.js**: Professional terminal emulator
- **Vite**: Fast build tool with HMR support
- **Docker**: Containerized deployment with Nginx

## Use Cases

1. **Interactive Coding Tutorials**: Create hands-on coding experiences
2. **Code Demonstrations**: Show live code examples that users can modify
3. **Educational Platforms**: Build browser-based coding environments for learning
4. **Prototyping**: Quickly test and share code snippets
5. **Technical Interviews**: Conduct live coding sessions
6. **Documentation**: Interactive API documentation with live examples

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
4. **Customization**: Easy to extend with new features and components

## Key Features

### File Explorer
- Tree view of project structure
- Create/delete files and folders
- Visual indicators for file types
- Keyboard navigation

### Code Editor
- Syntax highlighting for 20+ languages
- Auto-save functionality (Ctrl+S)
- Code completion and IntelliSense
- Find and replace
- Multiple cursor support

### Terminal
- Full shell access (jsh - JavaScript shell)
- Command history
- Output streaming
- Terminal resizing

### Live Preview
- Automatic server detection
- Opens in new tab
- Real-time updates

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

## Customization Points

1. **Default Files**: Modify `src/utils/webcontainer.js` to change starter files
2. **Editor Theme**: Update theme in `src/components/CodeEditor.jsx`
3. **UI Styling**: Customize colors and layout in component styles
4. **Language Support**: Add new language mappings in editor configuration

## Integration with Awesome Copilot

This agent extends the Awesome GitHub Copilot repository by providing:
- A practical, deployable coding environment
- Example of WebContainer API integration
- Docker-based deployment pattern
- Professional UI/UX for code editing

## Best Practices

1. **Performance**: WebContainer initialization takes a few seconds - show loading state
2. **Error Handling**: Always handle WebContainer errors gracefully
3. **Browser Compatibility**: Check for SharedArrayBuffer support before initializing
4. **Security Headers**: Ensure COOP/COEP headers are properly configured
5. **File Management**: Implement proper file tree refresh after operations

## Limitations

- Cannot access native Node.js modules that require OS-level APIs
- Limited to what WebContainer supports (no Python, Ruby, etc.)
- Requires modern browser with recent security features
- May have performance constraints compared to native Node.js

## Future Enhancements

- Multi-file editing with tabs
- Git integration for version control
- Package.json management UI
- Code snippets library
- Collaborative editing
- Project templates
- Export/import projects
- Mobile responsive design

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
