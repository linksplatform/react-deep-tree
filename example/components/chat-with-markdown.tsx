import React, { useState } from 'react';
import { ChakraProvider, Box, Textarea, Button, VStack, HStack, Avatar, Text, useColorModeValue } from '@chakra-ui/react';
import ChakraMarkdown from './chakra-markdown'; // Import the renamed component

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
                {/* Rendering the message text with markdown support */}
                <ChakraMarkdown content={message.text} />
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