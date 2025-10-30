import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ webcontainer, selectedFile }) {
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (selectedFile && webcontainer) {
      loadFile(selectedFile);
    }
  }, [selectedFile, webcontainer]);

  const loadFile = async (path) => {
    setIsLoading(true);
    try {
      const content = await webcontainer.fs.readFile(path, 'utf-8');
      setFileContent(content);
    } catch (error) {
      console.error('Error loading file:', error);
      setFileContent(`// Error loading file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorChange = (value) => {
    setFileContent(value);
  };

  const handleSave = async () => {
    if (!selectedFile || !webcontainer) return;

    try {
      await webcontainer.fs.writeFile(selectedFile, fileContent);
      console.log('File saved:', selectedFile);
    } catch (error) {
      console.error('Error saving file:', error);
      alert(`Error saving file: ${error.message}`);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Add save keyboard shortcut
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave();
    });
  };

  const getLanguage = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      json: 'json',
      html: 'html',
      css: 'css',
      md: 'markdown',
      py: 'python',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      cs: 'csharp',
      go: 'go',
      rs: 'rust',
      php: 'php',
      rb: 'ruby',
      sh: 'shell',
      yaml: 'yaml',
      yml: 'yaml',
      xml: 'xml',
      sql: 'sql',
    };
    return languageMap[ext] || 'plaintext';
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {selectedFile && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          backgroundColor: '#2d2d30',
          borderBottom: '1px solid #3e3e42',
        }}>
          <div style={{ fontSize: '13px', color: '#cccccc' }}>
            {selectedFile}
          </div>
          <button
            onClick={handleSave}
            style={{
              padding: '6px 16px',
              backgroundColor: '#007acc',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              borderRadius: '3px',
            }}
          >
            Save (Ctrl+S)
          </button>
        </div>
      )}
      <div style={{ flex: 1 }}>
        {selectedFile ? (
          isLoading ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#cccccc',
            }}>
              Loading...
            </div>
          ) : (
            <Editor
              height="100%"
              language={getLanguage(selectedFile)}
              value={fileContent}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                tabSize: 2,
              }}
            />
          )
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#888',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div style={{ fontSize: '48px' }}>📝</div>
            <div>Select a file to start editing</div>
          </div>
        )}
      </div>
    </div>
  );
}
