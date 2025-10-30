import { useState, useEffect } from 'react';
import { Code2, Terminal as TerminalIcon, Globe, RefreshCw, Zap } from 'lucide-react';
import FileExplorer from './components/FileExplorer';
import CodeEditor from './components/CodeEditor';
import Terminal from './components/Terminal';
import TemplateSelector from './components/TemplateSelector';
import QuickStartPanel from './components/QuickStartPanel';
import { getWebContainer, initializeFiles, switchTemplate, detectAndSwitchTemplate } from './utils/webcontainer';
import { projectTemplates } from './utils/templates';
import { applyQuickStart } from './utils/quickstart';

function App() {
  const [webcontainer, setWebcontainer] = useState(null);
  const [selectedFile, setSelectedFile] = useState('index.js');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentTemplate, setCurrentTemplate] = useState('nodejs');
  const [isSwitching, setIsSwitching] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);

  useEffect(() => {
    initWebContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initWebContainer = async () => {
    try {
      setIsLoading(true);
      const container = await getWebContainer();
      await initializeFiles(container, currentTemplate);
      
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

  const handleSwitchTemplate = async (templateName) => {
    if (!webcontainer || isSwitching) return;
    
    setIsSwitching(true);
    setPreviewUrl('');
    
    try {
      await switchTemplate(webcontainer, templateName);
      setCurrentTemplate(templateName);
      
      // Update selected file based on template
      const firstFiles = {
        nodejs: 'index.js',
        typescript: 'index.ts',
        python: 'main.py',
        react: 'src/App.jsx',
        express: 'server.js',
        vue: 'src/App.vue',
        svelte: 'src/App.svelte'
      };
      setSelectedFile(firstFiles[templateName] || 'index.js');
      
      console.log(`✅ Switched to ${templateName} template`);
    } catch (err) {
      console.error('Failed to switch template:', err);
      alert(`Failed to switch template: ${err.message}`);
    } finally {
      setIsSwitching(false);
    }
  };

  const handleAutoDetect = async () => {
    if (!webcontainer) return;
    
    try {
      const detectedType = await detectAndSwitchTemplate(webcontainer);
      console.log(`🔍 Auto-detected project type: ${detectedType}`);
      
      if (detectedType !== currentTemplate) {
        const confirmSwitch = confirm(
          `Auto-detected ${detectedType} project. Switch template?`
        );
        if (confirmSwitch) {
          await handleSwitchTemplate(detectedType);
        }
      } else {
        alert(`Project is already using ${detectedType} template ✓`);
      }
    } catch (err) {
      console.error('Auto-detection failed:', err);
      alert('Auto-detection failed. Using current template.');
    }
  };

  const handleApplyQuickStart = async (templateKey) => {
    if (!webcontainer || isSwitching) return;
    
    setIsSwitching(true);
    setPreviewUrl('');
    
    try {
      await applyQuickStart(webcontainer, templateKey);
      
      // Detect and set appropriate template type
      const detectedType = await detectAndSwitchTemplate(webcontainer);
      setCurrentTemplate(detectedType);
      
      // Set appropriate first file
      const firstFiles = {
        'express-api': 'server.js',
        'react-todo': 'src/App.jsx',
        'typescript-api': 'server.ts',
        'dockerfile': 'Dockerfile'
      };
      setSelectedFile(firstFiles[templateKey] || 'README.md');
      
      console.log(`✅ Applied ${templateKey} quick start template`);
    } catch (err) {
      console.error('Failed to apply quick start:', err);
      alert(`Failed to apply template: ${err.message}`);
    } finally {
      setIsSwitching(false);
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
      opacity: isSwitching ? 0.6 : 1,
      pointerEvents: isSwitching ? 'none' : 'auto',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Code2 size={24} color="#007acc" />
            <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
              React Coding Agent
            </h1>
          </div>
          <TemplateSelector
            currentTemplate={currentTemplate}
            onSelectTemplate={handleSwitchTemplate}
            onAutoDetect={handleAutoDetect}
          />
          <button
            onClick={() => setShowQuickStart(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: '#0e639c',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
            }}
            title="Quick Start Templates"
          >
            <Zap size={16} />
            Quick Start
          </button>
          {isSwitching && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontSize: '13px',
              color: '#007acc'
            }}>
              <RefreshCw size={14} className="spinning" />
              Switching template...
            </div>
          )}
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

      {/* Quick Start Panel */}
      {showQuickStart && (
        <QuickStartPanel
          onApplyTemplate={handleApplyQuickStart}
          onClose={() => setShowQuickStart(false)}
        />
      )}

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
        <div>
          {projectTemplates[currentTemplate]?.icon} {projectTemplates[currentTemplate]?.name} | Ready
        </div>
        <div>{selectedFile || 'No file selected'}</div>
      </div>
    </div>
  );
}

export default App;
