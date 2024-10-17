import React, { useState, useEffect } from 'react';
import { Box, Text, Link as ChakraLink, Heading, useColorModeValue, useColorMode } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';

const ChakraMarkdown = React.memo<any>(({ content }) => {
  const { colorMode } = useColorMode();
  const monacoTheme = colorMode === 'dark' ? 'vs-dark' : 'vs-light';
  const [editorHeight, setEditorHeight] = useState('200px');
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
      const code = String(children);
      if (inline) {
        return <Text as="code" bg={useColorModeValue("gray.100", "gray.700")} p="1" borderRadius="md">{code}</Text>;
      }
      useEffect(() => {
        const lines = code.split('\n').length;
        const lineHeight = 20; // Approximate height of each line in pixels
        setEditorHeight(`${lines * lineHeight}px`);
      }, [children]);
      return (
        <Box border="1px solid" borderColor={useColorModeValue("gray.200", "gray.600")} borderRadius="md" overflow="hidden" my={2}>
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
            }}
          />
        </Box>
      );
    },
  };
  return <ReactMarkdown components={renderers} children={content} />;
});

export default ChakraMarkdown;