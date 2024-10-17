import React from 'react';
import { Box, Text, Link as ChakraLink, Heading, useColorModeValue, useColorMode } from '@chakra-ui/react';
import MonacoEditor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';

function ChakraMarkdown({ content }) {
  // Access Chakra's color mode
  const { colorMode } = useColorMode();

  // Dynamic theme for Monaco Editor based on Chakra UI color mode
  const monacoTheme = colorMode === 'dark' ? 'vs-dark' : 'vs-light';

  // Custom renderers for Markdown components using Chakra UI and Monaco Editor for code blocks
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
      if (inline) {
        return <Text as="code" bg={useColorModeValue("gray.100", "gray.700")} p="1" borderRadius="md">{children}</Text>;
      }
      return (
        <Box border="1px solid" borderColor={useColorModeValue("gray.200", "gray.600")} borderRadius="md" overflow="hidden" my={2}>
          <MonacoEditor
            height="200px"
            language={language}
            theme={monacoTheme}
            value={String(children).trim()}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "off",
            }}
          />
        </Box>
      );
    },
  };

  return <ReactMarkdown components={renderers} children={content} />;
}

export default ChakraMarkdown;