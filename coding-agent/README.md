# React Coding Agent with WebContainer

A powerful in-browser coding environment built with React and WebContainer technology. This application provides a full-featured development environment that runs entirely in your browser, with no server-side code execution required.

## 🚀 Features

- **In-Browser Code Execution**: Run Node.js applications directly in your browser using WebContainer
- **Monaco Editor Integration**: Professional code editing experience with syntax highlighting, IntelliSense, and keyboard shortcuts
- **Built-in Terminal**: Full-featured terminal with xterm.js for running commands
- **File Management**: Create, edit, and delete files and folders with an intuitive file explorer
- **Live Preview**: Instant preview of your running applications
- **Docker Support**: Easy deployment with Docker and Docker Compose

## 🏗️ Architecture

The application consists of three main components:

1. **File Explorer**: Browse and manage project files
2. **Code Editor**: Edit files with Monaco Editor (the same editor that powers VS Code)
3. **Terminal**: Execute commands in a real shell environment

All code execution happens in a WebContainer instance running in your browser, providing a safe and isolated environment.

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **WebContainer API**: Browser-based runtime for Node.js
- **Monaco Editor**: Professional code editor
- **Xterm.js**: Terminal emulator
- **Vite**: Fast build tool and dev server
- **Lucide React**: Beautiful icons
- **Docker**: Containerization and deployment

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- Modern browser with SharedArrayBuffer support (Chrome, Edge, or Firefox)

## 🚀 Getting Started

### Local Development

1. Navigate to the coding-agent directory:
```bash
cd coding-agent
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Docker Deployment

From the repository root:

1. Build and start the container:
```bash
docker-compose up -d
```

2. Access the application at `http://localhost:8080`

3. Stop the container:
```bash
docker-compose down
```

## 🎮 Usage

### Creating Files and Folders

1. Click the file or folder icon in the file explorer header
2. Enter the name and press Enter or click Create
3. The new item will appear in the file tree

### Editing Code

1. Click on any file in the file explorer to open it in the editor
2. Make your changes
3. Save with `Ctrl+S` (or `Cmd+S` on Mac) or click the Save button

### Running Commands

Use the terminal to run any Node.js commands:

- `npm install <package>` - Install packages
- `node index.js` - Run your code
- `npm start` - Run the start script
- `ls` - List files
- `cat <filename>` - View file contents

### Viewing Output

When you run a web server (like the example in `index.js`), click the "Open Preview" button in the header to view your application in a new tab.

## 🔒 Security

WebContainer runs in a secure, sandboxed environment in your browser. All code execution is isolated and cannot access your local file system or network beyond what's explicitly allowed.

The application requires these headers to function:
- `Cross-Origin-Embedder-Policy: require-corp`
- `Cross-Origin-Opener-Policy: same-origin`

These are automatically configured in both the development server (Vite) and production deployment (Nginx).

## 🏗️ Project Structure

```
coding-agent/
├── src/
│   ├── components/
│   │   ├── CodeEditor.jsx    # Monaco editor wrapper
│   │   ├── FileExplorer.jsx  # File tree navigation
│   │   └── Terminal.jsx      # Terminal emulator
│   ├── utils/
│   │   └── webcontainer.js   # WebContainer initialization
│   ├── styles/
│   │   └── index.css         # Global styles
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── public/                   # Static assets
├── Dockerfile               # Docker build configuration
├── nginx.conf              # Nginx configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🧩 Customization

### Modifying Default Files

Edit `src/utils/webcontainer.js` to change the default files that are created when the application starts.

### Changing Themes

The Monaco editor theme can be changed in `src/components/CodeEditor.jsx` by modifying the `theme` prop.

### Adding Language Support

Add new language mappings in the `getLanguage` function in `src/components/CodeEditor.jsx`.

## 🐛 Troubleshooting

### WebContainer won't initialize

- Ensure you're using a modern browser (Chrome 92+, Edge 92+, or Firefox 95+)
- Check that the site is served with proper COOP/COEP headers
- Look for console errors for more details

### Files not saving

- Check the browser console for errors
- Ensure the WebContainer has fully initialized (loading indicator should disappear)

### Terminal not responding

- Try refreshing the page to reinitialize the WebContainer
- Check that you're typing in the terminal area (click to focus)

## 🤝 Contributing

This is part of the [Awesome GitHub Copilot](https://github.com/github/awesome-copilot) repository. Contributions are welcome!

## 📄 License

MIT License - see the parent repository for details.

## 🙏 Acknowledgments

- Built with [WebContainer API](https://webcontainers.io/) by StackBlitz
- Uses [Monaco Editor](https://microsoft.github.io/monaco-editor/) by Microsoft
- Terminal powered by [Xterm.js](https://xtermjs.org/)

---

**Note**: This application requires a browser environment that supports SharedArrayBuffer. It will not work in environments where these security headers cannot be set (e.g., some static file hosting services without configuration support).
