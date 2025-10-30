import { useState, useEffect } from 'react';
import { File, Folder, FolderOpen, Trash2 } from 'lucide-react';

export default function FileExplorer({ webcontainer, onFileSelect, selectedFile }) {
  const [files, setFiles] = useState([]);
  const [expandedDirs, setExpandedDirs] = useState(new Set(['/']));
  const [newItemName, setNewItemName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createType, setCreateType] = useState('file');

  useEffect(() => {
    if (webcontainer) {
      loadFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcontainer]);

  const loadFiles = async () => {
    if (!webcontainer) return;
    
    try {
      const fileList = await listDirectory('.');
      setFiles(fileList);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const listDirectory = async (path) => {
    const entries = await webcontainer.fs.readdir(path, { withFileTypes: true });
    const items = [];

    for (const entry of entries) {
      const fullPath = path === '.' ? entry.name : `${path}/${entry.name}`;
      const item = {
        name: entry.name,
        path: fullPath,
        isDirectory: entry.isDirectory(),
      };

      if (entry.isDirectory() && expandedDirs.has(fullPath)) {
        item.children = await listDirectory(fullPath);
      }

      items.push(item);
    }

    return items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
  };

  const toggleDirectory = async (path) => {
    const newExpanded = new Set(expandedDirs);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedDirs(newExpanded);
    await loadFiles();
  };

  const handleCreateItem = async () => {
    if (!newItemName.trim()) return;

    try {
      if (createType === 'file') {
        await webcontainer.fs.writeFile(newItemName, '// New file\n');
      } else {
        await webcontainer.fs.mkdir(newItemName, { recursive: true });
      }
      await loadFiles();
      setIsCreating(false);
      setNewItemName('');
    } catch (error) {
      console.error('Error creating item:', error);
      alert(`Error creating ${createType}: ${error.message}`);
    }
  };

  const handleDeleteItem = async (path, isDirectory) => {
    if (!confirm(`Are you sure you want to delete ${path}?`)) return;

    try {
      if (isDirectory) {
        await webcontainer.fs.rm(path, { recursive: true });
      } else {
        await webcontainer.fs.rm(path);
      }
      await loadFiles();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(`Error deleting: ${error.message}`);
    }
  };

  const renderTree = (items, level = 0) => {
    return items.map((item) => (
      <div key={item.path} style={{ marginLeft: `${level * 16}px` }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '6px 8px',
            cursor: 'pointer',
            backgroundColor: selectedFile === item.path ? '#094771' : 'transparent',
            borderRadius: '4px',
            marginBottom: '2px',
          }}
          onMouseEnter={(e) => {
            if (selectedFile !== item.path) {
              e.currentTarget.style.backgroundColor = '#2a2d2e';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedFile !== item.path) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', flex: 1 }}
            onClick={() => {
              if (item.isDirectory) {
                toggleDirectory(item.path);
              } else {
                onFileSelect(item.path);
              }
            }}
          >
            {item.isDirectory ? (
              expandedDirs.has(item.path) ? (
                <FolderOpen size={16} style={{ marginRight: '8px', color: '#dcb67a' }} />
              ) : (
                <Folder size={16} style={{ marginRight: '8px', color: '#dcb67a' }} />
              )
            ) : (
              <File size={16} style={{ marginRight: '8px', color: '#519aba' }} />
            )}
            <span style={{ fontSize: '13px' }}>{item.name}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteItem(item.path, item.isDirectory);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#cccccc',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
        {item.isDirectory && item.children && renderTree(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div style={{
      height: '100%',
      backgroundColor: '#252526',
      padding: '10px',
      overflowY: 'auto',
      fontSize: '13px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid #3e3e42',
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#cccccc' }}>
          FILES
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              setCreateType('file');
              setIsCreating(true);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#cccccc',
              cursor: 'pointer',
              padding: '4px',
            }}
            title="New File"
          >
            <File size={16} />
          </button>
          <button
            onClick={() => {
              setCreateType('folder');
              setIsCreating(true);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#cccccc',
              cursor: 'pointer',
              padding: '4px',
            }}
            title="New Folder"
          >
            <Folder size={16} />
          </button>
        </div>
      </div>

      {isCreating && (
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleCreateItem();
              if (e.key === 'Escape') setIsCreating(false);
            }}
            placeholder={`New ${createType} name...`}
            autoFocus
            style={{
              width: '100%',
              padding: '6px 8px',
              backgroundColor: '#3c3c3c',
              border: '1px solid #007acc',
              color: '#cccccc',
              fontSize: '13px',
              borderRadius: '3px',
            }}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              onClick={handleCreateItem}
              style={{
                padding: '4px 12px',
                backgroundColor: '#007acc',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px',
                borderRadius: '3px',
              }}
            >
              Create
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewItemName('');
              }}
              style={{
                padding: '4px 12px',
                backgroundColor: '#3c3c3c',
                border: 'none',
                color: '#cccccc',
                cursor: 'pointer',
                fontSize: '12px',
                borderRadius: '3px',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>{renderTree(files)}</div>
    </div>
  );
}
