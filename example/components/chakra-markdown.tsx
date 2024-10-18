import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Link as ChakraLink, Heading, useColorModeValue, useColorMode } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import debounce from 'lodash/debounce';

const ChakraMarkdown = React.memo<any>(({ content }) => {
  const { colorMode } = useColorMode();
  const editorRef = useRef();
  const monacoTheme = colorMode === 'dark' ? 'vs-dark' : 'vs-light';
  const [editorHeight, setEditorHeight] = useState(0);
  const renderers = {
    h1: ({ children }) => <Heading as="h1" size="xl" mb={2}>{children}</Heading>,
    h2: ({ children }) => <Heading as="h2" size="lg" mb={2}>{children}</Heading>,
    h3: ({ children }) => <Heading as="h3" size="md" mb={2}>{children}</Heading>,
    a: ({ href, children }) => (
      <ChakraLink href={href} color="blue.500" isExternal>
        {children}
      </ChakraLink>
    ),
    code: ({ inline, children, className }) => {
      const language = className ? className.replace('language-', '') : 'plaintext';
      const code = String(children).trim();
      if (inline) {
        return <Text as="code" bg={useColorModeValue("gray.100", "gray.700")} p="1" borderRadius="md">{code}</Text>;
      }
      useEffect(() => {
        const lines = code.split('\n').length;
        const lineHeight = 18; // Approximate height of each line in pixels
        // const horizonalScrollBarHeight = 12;
        // const totalHeight = lines * lineHeight + horizonalScrollBarHeight;
        const totalHeight = lines * lineHeight;
        // setEditorHeight(`${totalHeight}px`);
      }, [children]);
      return (
        <Box
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="0"
          overflow="visible"
          onResize={() => {
            console.log('resize');
            setEditorHeight(0);
          }}
          my={2}>
          <MonacoEditor

            height={editorHeight}
            language={language}
            theme={monacoTheme}
            value={code}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "off",
              scrollbar: { vertical: 'hidden' },
              overviewRulerLanes: 0,             // Disable the overview ruler
              hideCursorInOverviewRuler: true,   // Hide cursor in the ruler
              folding: false,                    // Disable code folding
              glyphMargin: false,                // Hide the glyph margin (left margin with icons)
              renderLineHighlight: 'none',       // Disable the current line highlight
              cursorWidth: 1,
              wordWrap: 'on',
            }}
            onMount={(editor, monaco) => {
              console.log('mount');
              const keepIds = ["editor.action.clipboardCopyAction"];
              const contextmenu = editor.getContribution('editor.contrib.contextmenu');
              const realMethod = contextmenu._getMenuActions;
              contextmenu._getMenuActions = function () {
                const items = realMethod.apply(contextmenu, arguments);
                return items.filter(function (item) {
                  return keepIds.includes(item.id);
                });
              };

              console.log('editor', editor);
              const el = editor._domElement;
              console.log('el', el);
              const codeContainer = el?.querySelector?.('.view-lines');
              console.log('codeContainer', codeContainer);


              let prevLineCount = 0;

              const LINE_HEIGHT = 18;
              const CONTAINER_GUTTER = 10;

              window.addEventListener('resize', debounce(function (event) {
                // Your code here
                // console.log('Window resized to: ', window.innerWidth, window.innerHeight);
                // const lines = code.split('\n').length;
                // const lineHeight = 18; // Approximate height of each line in pixels
                // // const horizonalScrollBarHeight = 12;
                // // const totalHeight = lines * lineHeight + horizonalScrollBarHeight;
                // const totalHeight = lines * lineHeight;
                // if (editorHeight === totalHeight) {
                //   setEditorHeight(totalHeight-lineHeight); // Force change
                // } else {
                //   setEditorHeight(totalHeight);
                // }

                if (codeContainer.offsetHeight > 0) {
                  // el.style.height = codeContainer.offsetHeight + 'px';
                  const newHeight = codeContainer.offsetHeight;
                  if (editorHeight !== newHeight) {
                    setEditorHeight(newHeight);
                  }
                  // editor.layout();
                }
              }, 200));

              editor.onDidChangeModelDecorations(() => {
                // wait until dom rendered
                setTimeout(() => {
                  console.log('codeContainer.offsetHeight', codeContainer?.offsetHeight);
                  if (codeContainer.offsetHeight > 0) {
                    // el.style.height = codeContainer.offsetHeight + 'px';
                    const newHeight = codeContainer.offsetHeight;
                    setEditorHeight(newHeight);
                    // editor.layout();
                  }
                  // const height =
                  //   codeContainer.childElementCount > prevLineCount
                  //     ? codeContainer.offsetHeight // unfold
                  //     : codeContainer.childElementCount * LINE_HEIGHT + CONTAINER_GUTTER; // fold
                  // prevLineCount = codeContainer.childElementCount;
                }, 10);
              });
            }}
          />
        </Box>
      );
    },
  };
  return <ReactMarkdown components={renderers} children={content} />;
});

export default ChakraMarkdown;