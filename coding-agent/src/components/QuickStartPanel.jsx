import { useState } from 'react';
import { Zap, X } from 'lucide-react';
import { quickStartTemplates } from '../utils/quickstart';

export default function QuickStartPanel({ onApplyTemplate, onClose }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const templates = Object.entries(quickStartTemplates);

  const handleApply = async (key) => {
    if (confirm(`Apply ${quickStartTemplates[key].name} template? This will replace current files.`)) {
      await onApplyTemplate(key);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#2d2d30',
          borderRadius: '8px',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
            borderBottom: '1px solid #3e3e42',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Zap size={24} color="#007acc" />
            <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0, color: '#cccccc' }}>
              Quick Start Templates
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#cccccc',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Description */}
        <div style={{ padding: '20px', borderBottom: '1px solid #3e3e42' }}>
          <p style={{ margin: 0, color: '#cccccc', fontSize: '14px', lineHeight: '1.6' }}>
            Jump-start your project with production-ready templates. Each template includes
            complete code, dependencies, and configuration files.
          </p>
        </div>

        {/* Templates Grid */}
        <div style={{ padding: '20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {templates.map(([key, template]) => (
              <div
                key={key}
                style={{
                  backgroundColor: '#37373d',
                  borderRadius: '6px',
                  padding: '20px',
                  cursor: 'pointer',
                  border: selectedTemplate === key ? '2px solid #007acc' : '2px solid transparent',
                  transition: 'all 0.2s',
                }}
                onClick={() => setSelectedTemplate(key)}
                onMouseEnter={(e) => {
                  if (selectedTemplate !== key) {
                    e.currentTarget.style.borderColor = '#555';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTemplate !== key) {
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                  {template.icon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: '#cccccc' }}>
                  {template.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#999', margin: 0, lineHeight: '1.5' }}>
                  {template.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(key);
                  }}
                  style={{
                    marginTop: '16px',
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#007acc',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Apply Template
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #3e3e42',
            color: '#888',
            fontSize: '12px',
          }}
        >
          💡 Tip: Templates are based on patterns from the Awesome Copilot repository
        </div>
      </div>
    </div>
  );
}
