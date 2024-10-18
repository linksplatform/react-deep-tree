import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Text, Link as ChakraLink, Heading, useColorModeValue, useColorMode } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import debounce from 'lodash/debounce';

function calculateChildrenHeight(parentDiv) {
  let childrenHeight = 0;
  const children = parentDiv.children;
  for (let i = 0; i < children.length; i++) {
    childrenHeight += children[i].offsetHeight;
  }
  return childrenHeight;
}

const ChakraMarkdown = React.memo<any>(({ content }) => {
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
      const { colorMode } = useColorMode();
      const monacoTheme = colorMode === 'dark' ? 'vs-dark' : 'vs-light';

      const codeContainerRef = useRef(null);



      const language = className ? className.replace('language-', '') : 'plaintext';
      const code = String(children).trim();

      const lines = code.split('\n').length;
      const lineHeight = 18; // Approximate height of each line in pixels
      // const horizonalScrollBarHeight = 12;
      // const totalHeight = lines * lineHeight + horizonalScrollBarHeight;
      const defaultHeight = lines * lineHeight;
      // setEditorHeight(`${totalHeight}px`);

      const heightRef = useRef(defaultHeight);
      const [editorHeight, setEditorHeight] = useState(defaultHeight);
      heightRef.current = editorHeight;

      if (inline) {
        return <Text as="code" bg={useColorModeValue("gray.100", "gray.700")} p="1" borderRadius="md">{code}</Text>;
      }

      const updateHeight = useCallback(() => {
        // setEditorHeight(defaultHeight);
        // setTimeout(() => {
        const childrenHeight = calculateChildrenHeight(codeContainerRef.current);
        const scrollHeight = codeContainerRef.current?.scrollHeight;
        const offsetHeight = codeContainerRef.current?.offsetHeight;
        // const newHeight = Math.max(childrenHeight);
        console.log('resize', 'childrenHeight', childrenHeight);
        console.log('resize', 'scrollHeight', scrollHeight);
        console.log('resize', 'clientHeight', codeContainerRef.current.clientHeight);
        console.log('resize', 'offsetHeight', codeContainerRef.current.offsetHeight);
        console.log('resize', 'editorHeight', heightRef.current);

        // if (editorHeight < childrenHeight) {
        //   setEditorHeight(childrenHeight);
        // } else {
        //   const scrollHeight = codeContainerRef.current?.scrollHeight;
        //   const offsetHeight = codeContainerRef.current?.offsetHeight;
        //   const newHeight = Math.max(childrenHeight, scrollHeight, offsetHeight);
        //   setEditorHeight(newHeight);
        // }
        // if (newHeight > defaultHeight && editorHeight !== newHeight) {

        // }

        if (heightRef.current <= childrenHeight) {
          const newHeight = Math.max(childrenHeight, scrollHeight);
          setEditorHeight(newHeight);
        } else {
          const newHeight = Math.min(childrenHeight, scrollHeight);
          setEditorHeight(newHeight);
        }


        // const scrollHeight = codeContainerRef.current?.scrollHeight;
        // console.log('resize', 'scrollHeight', scrollHeight);
        // setEditorHeight(scrollHeight);

        // }, 0);
      }, [editorHeight]);

      useEffect(() => {
        return () => {
          window.removeEventListener('resize', updateHeight);
          console.log('unmount');
          // updateHeight.cancel(); // Cancels the debounced function
        };
      }, []);
      return (
        <Box
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="0"
          overflow="visible"
          my={2}
        >
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
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              folding: false,
              glyphMargin: false,
              renderLineHighlight: 'none',
              cursorWidth: 1,
              wordWrap: 'on',
            }}
            onMount={(editor) => {
              const keepIds = ["editor.action.clipboardCopyAction"];
              const contextmenu = editor.getContribution('editor.contrib.contextmenu');
              const realMethod = contextmenu._getMenuActions;
              contextmenu._getMenuActions = function () {
                const items = realMethod.apply(contextmenu, arguments);
                return items.filter(function (item) {
                  return keepIds.includes(item.id);
                });
              };

              const codeContainer = editor._domElement?.querySelector('.view-lines');
              codeContainerRef.current = codeContainer; // Assign the ref
              // if (codeContainer?.offsetHeight > 0) {
              //   setEditorHeight(codeContainer.offsetHeight);
              // }

              console.log(editor);

              window.addEventListener('resize', updateHeight);

              const eventHandler = editor.onDidChangeModelDecorations(() => {
                const childrenHeight = calculateChildrenHeight(codeContainerRef.current);
                const scrollHeight = codeContainerRef.current?.scrollHeight;
                const offsetHeight = codeContainerRef.current?.offsetHeight;
                const newHeight = Math.max(childrenHeight, scrollHeight, offsetHeight);
                console.log('onmount', 'childrenHeight', childrenHeight);
                console.log('onmount', 'scrollHeight', scrollHeight);
                console.log('onmount', 'clientHeight', codeContainerRef.current.clientHeight);
                console.log('onmount', 'offsetHeight', codeContainerRef.current.offsetHeight);
                setEditorHeight(newHeight);
                eventHandler.dispose();
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