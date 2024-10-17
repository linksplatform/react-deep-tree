import React, { useState } from 'react';
import { ChakraProvider, Box, Textarea, Button, VStack, HStack, Avatar, Text, Link as ChakraLink, Heading } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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

  // Custom renderers for Markdown components using Chakra UI
  const renderers = {
    // Render headers using Chakra's Heading component
    h1: ({ children }) => <Heading as="h1" size="xl" mb={2}>{children}</Heading>,
    h2: ({ children }) => <Heading as="h2" size="lg" mb={2}>{children}</Heading>,
    h3: ({ children }) => <Heading as="h3" size="md" mb={2}>{children}</Heading>,

    // Render links using Chakra's Link component
    a: ({ href, children }) => (
      <ChakraLink href={href} color="blue.500" isExternal>
        {children}
      </ChakraLink>
    ),
  };

  return (
    <ChakraProvider>
      <Box bg="gray.100" h="100vh" p={4} display="flex" flexDirection="column">
        {/* Chat Messages Display */}
        <VStack
          flex="1"
          bg="white"
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
              <Box bg="blue.50" p={3} borderRadius="lg" maxW="80%">
                <Text fontSize="sm" fontWeight="bold">
                  {message.sender}
                </Text>
                {/* Rendering the message text with markdown support */}
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
            bg="white"
            resize="none" // Disable manual resize
            overflow="hidden" // Hide overflow when max height is reached
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