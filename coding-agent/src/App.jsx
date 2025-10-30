import { useState, useEffect } from 'react';
import { Code2, Terminal as TerminalIcon, Globe } from 'lucide-react';
import FileExplorer from './components/FileExplorer';
import CodeEditor from './components/CodeEditor';
import Terminal from './components/Terminal';
import { getWebContainer, initializeFiles } from './utils/webcontainer';

function App() {
  const [webcontainer, setWebcontainer] = useState(null);
  const [selectedFile, setSelectedFile] = useState('index.js');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    initWebContainer();
  }, []);

  const initWebContainer = async () => {
    try {
      setIsLoading(true);
      const container = await getWebContainer();
      await initializeFiles(container);
      
      // Listen for server-ready event
      container.on('server-ready', (port, url) => {
        console.log('Server ready on port', port, 'url:', url);
        setPreviewUrl(url);
      });

      setWebcontainer(container);
      setError(null);
    } catch (err) {
      console.error('Failed to initialize WebContainer:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <div style={{ fontSize: '48px' }}>🚀</div>
        <div style={{ fontSize: '20px' }}>Initializing WebContainer...</div>
        <div style={{ fontSize: '14px', color: '#888' }}>This may take a moment</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <div style={{ fontSize: '48px' }}>⚠️</div>
        <div style={{ fontSize: '20px', color: '#f48771' }}>Error initializing WebContainer</div>
        <div style={{ fontSize: '14px', color: '#888', maxWidth: '600px', textAlign: 'center' }}>
          {error}
        </div>
        <div style={{ fontSize: '12px', color: '#666', maxWidth: '600px', textAlign: 'center' }}>
          Note: WebContainer requires a browser that supports SharedArrayBuffer. 
          Make sure your browser is up to date and the site is served with proper COOP/COEP headers.
        </div>
        <button
          onClick={initWebContainer}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007acc',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            borderRadius: '4px',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        backgroundColor: '#2d2d30',
        borderBottom: '1px solid #3e3e42',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Code2 size={24} color="#007acc" />
          <h1 style={{ fontSize: '18px', fontWeight: '600' }}>
            React Coding Agent
          </h1>
          <span style={{ 
            fontSize: '12px', 
            color: '#888',
            padding: '2px 8px',
            backgroundColor: '#3e3e42',
            borderRadius: '3px',
          }}>
            WebContainer
          </span>
        </div>
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#007acc',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '13px',
            }}
          >
            <Globe size={16} />
            Open Preview
          </a>
        )}
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* File Explorer */}
        <div style={{
          width: '250px',
          borderRight: '1px solid #3e3e42',
          overflow: 'auto',
        }}>
          <FileExplorer
            webcontainer={webcontainer}
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
          />
        </div>

        {/* Editor and Terminal */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Code Editor */}
          <div style={{ height: '60%', borderBottom: '1px solid #3e3e42' }}>
            <CodeEditor
              webcontainer={webcontainer}
              selectedFile={selectedFile}
            />
          </div>

          {/* Terminal */}
          <div style={{ height: '40%', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#2d2d30',
              borderBottom: '1px solid #3e3e42',
            }}>
              <TerminalIcon size={16} color="#888" />
              <span style={{ fontSize: '13px', color: '#cccccc' }}>Terminal</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Terminal webcontainer={webcontainer} />
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 16px',
        backgroundColor: '#007acc',
        fontSize: '12px',
        color: 'white',
      }}>
        <div>WebContainer Status: Ready</div>
        <div>{selectedFile || 'No file selected'}</div>
      </div>
    </div>
  );
}

export default App;
