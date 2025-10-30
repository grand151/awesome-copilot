import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { projectTemplates } from '../utils/templates';

export default function TemplateSelector({ onSelectTemplate, currentTemplate, onAutoDetect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const templates = Object.entries(projectTemplates);

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    try {
      await onAutoDetect();
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSelectTemplate = (templateKey) => {
    onSelectTemplate(templateKey);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#2d2d30',
          border: '1px solid #3e3e42',
          borderRadius: '4px',
          color: '#cccccc',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '500',
        }}
      >
        <span>
          {projectTemplates[currentTemplate]?.icon || '📦'}{' '}
          {projectTemplates[currentTemplate]?.name || 'Select Template'}
        </span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '4px',
              backgroundColor: '#2d2d30',
              border: '1px solid #3e3e42',
              borderRadius: '4px',
              minWidth: '220px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              zIndex: 1000,
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                padding: '8px',
                borderBottom: '1px solid #3e3e42',
              }}
            >
              <button
                onClick={handleAutoDetect}
                disabled={isDetecting}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#094771',
                  border: 'none',
                  borderRadius: '3px',
                  color: 'white',
                  cursor: isDetecting ? 'wait' : 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                }}
              >
                <Sparkles size={16} />
                {isDetecting ? 'Detecting...' : 'Auto-Detect Project'}
              </button>
            </div>

            <div style={{ padding: '4px' }}>
              {templates.map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => handleSelectTemplate(key)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    backgroundColor:
                      currentTemplate === key ? '#094771' : 'transparent',
                    border: 'none',
                    borderRadius: '3px',
                    color: '#cccccc',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textAlign: 'left',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (currentTemplate !== key) {
                      e.currentTarget.style.backgroundColor = '#37373d';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentTemplate !== key) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{template.icon}</span>
                  <span style={{ fontWeight: '500' }}>{template.name}</span>
                </button>
              ))}
            </div>

            <div
              style={{
                padding: '8px 12px',
                fontSize: '11px',
                color: '#888',
                borderTop: '1px solid #3e3e42',
              }}
            >
              💡 Auto-detect analyzes your files to suggest the best template
            </div>
          </div>
        </>
      )}
    </div>
  );
}
