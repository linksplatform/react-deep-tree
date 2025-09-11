import React, { useRef, useState, useEffect } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';

interface MonacoMarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  maxHeight?: string;
  minHeight?: string;
}

const MonacoMarkdownEditor: React.FC<MonacoMarkdownEditorProps> = ({
  value,
  onChange,
  onEnter,
  placeholder = "Type your message with Markdown...",
  maxHeight = "30vh",
  minHeight = "100px"
}) => {
  const { colorMode } = useColorMode();
  const editorRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState(minHeight);
  
  const monacoTheme = colorMode === 'dark' ? 'vs-dark' : 'vs-light';

  // Auto-resize editor based on content
  const updateEditorHeight = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const contentHeight = editor.getContentHeight();
      const maxHeightPx = parseInt(maxHeight.replace('vh', '')) * window.innerHeight / 100;
      const minHeightPx = parseInt(minHeight.replace('px', ''));
      
      const newHeight = Math.min(Math.max(contentHeight, minHeightPx), maxHeightPx);
      setEditorHeight(`${newHeight}px`);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Set up auto-resize
    editor.onDidContentSizeChange(updateEditorHeight);
    
    // Initial height calculation
    updateEditorHeight();
    
    // Configure editor for better markdown editing experience
    editor.updateOptions({
      automaticLayout: true,
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      minimap: { enabled: false },
      lineNumbers: 'off',
      folding: false,
      selectOnLineNumbers: false,
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      renderLineHighlight: 'none',
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto',
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8
      }
    });

    // Show placeholder when empty
    if (!value) {
      editor.setValue('');
    }

    // Add keyboard shortcut for Enter to send (Ctrl+Enter for new line)
    if (onEnter) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        // Ctrl+Enter adds new line (default behavior)
        editor.trigger('keyboard', 'type', { text: '\n' });
      });
      
      editor.addCommand(monaco.KeyCode.Enter, () => {
        // Enter sends message
        onEnter();
      });
    }
  };

  const handleEditorChange = (newValue) => {
    onChange(newValue || '');
    // Trigger height update after content change
    setTimeout(updateEditorHeight, 0);
  };

  useEffect(() => {
    updateEditorHeight();
  }, [value]);

  return (
    <Box
      border="1px solid"
      borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
      borderRadius="md"
      overflow="hidden"
      flex="1"
    >
      <MonacoEditor
        height={editorHeight}
        language="markdown"
        theme={monacoTheme}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          placeholder: placeholder,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          minimap: { enabled: false },
          lineNumbers: 'off',
          folding: false,
          selectOnLineNumbers: false,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          renderLineHighlight: 'none',
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8
          },
          fontSize: 14,
          fontFamily: 'ui-monospace, SFMono-Regular, "Roboto Mono", monospace'
        }}
      />
    </Box>
  );
};

export default MonacoMarkdownEditor;