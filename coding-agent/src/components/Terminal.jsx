import { useState, useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

export default function TerminalComponent({ webcontainer }) {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current || !webcontainer) return;

    const terminal = new Terminal({
      convertEol: true,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
      fontSize: 14,
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
      }
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = terminal;
    fitAddonRef.current = fitAddon;

    // Start shell
    const startShell = async () => {
      const shellProcess = await webcontainer.spawn('jsh', {
        terminal: {
          cols: terminal.cols,
          rows: terminal.rows,
        },
      });

      shellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        })
      );

      const input = shellProcess.input.getWriter();
      terminal.onData((data) => {
        input.write(data);
      });

      terminal.write('$ ');
    };

    startShell();

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      terminal.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [webcontainer]);

  return (
    <div style={{
      height: '100%',
      backgroundColor: '#1e1e1e',
      padding: '10px'
    }}>
      <div ref={terminalRef} style={{ height: '100%' }} />
    </div>
  );
}
