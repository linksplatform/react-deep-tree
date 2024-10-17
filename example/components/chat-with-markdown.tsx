import React, { useState } from 'react';
import { ChakraProvider, Box, Textarea, Button, VStack, HStack, Avatar, Text, Link as ChakraLink, Heading, useColorMode, useColorModeValue } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import MonacoEditor from '@monaco-editor/react'; // Monaco Editor

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { colorMode, toggleColorMode } = useColorMode(); // Chakra color mode

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

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

  return (
    <ChakraProvider>
      <Box bg={useColorModeValue("gray.100", "gray.900")} h="100vh" p={4} display="flex" flexDirection="column">
        {/* Chat Messages Display */}
        <VStack
          flex="1"
          bg={useColorModeValue("white", "gray.800")}
          w="100%"
          overflowY="auto"
          p={4}
          spacing={4}
          borderRadius="md"
          boxShadow="md"
        >
          {messages.map((message) => (
            <HStack key={message.id} align="start" w="100%">
              <Avatar name={message.sender} size="sm" />
              <Box bg={useColorModeValue("blue.50", "blue.900")} p={3} borderRadius="lg" width="80%">
                <Text fontSize="sm" fontWeight="bold">
                  {message.sender}
                </Text>
                <ReactMarkdown components={renderers} children={message.text} />
                <Text fontSize="xs" color="gray.500">
                  {message.timestamp}
                </Text>
              </Box>
            </HStack>
          ))}
        </VStack>

        {/* Input Section */}
        <HStack mt={4} spacing={2} align="end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message with Markdown..."
            bg={useColorModeValue("white", "gray.800")}
            resize="none"
            overflow="hidden"
            flex="1"
          />
          <Button colorScheme="blue" onClick={sendMessage}>
            Send
          </Button>
        </HStack>
      </Box>
    </ChakraProvider>
  );
}

export default ChatApp;