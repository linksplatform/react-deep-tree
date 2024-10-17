import React, { useState } from 'react';
import { ChakraProvider, Box, Input, Button, VStack, HStack, Avatar, Text } from '@chakra-ui/react';

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
            <Box bg="blue.50" p={3} borderRadius="lg" width="80%">
              <Text fontSize="sm" fontWeight="bold">
                {message.sender}
              </Text>
              <Text fontSize="md">{message.text}</Text>
              <Text fontSize="xs" color="gray.500">
                {message.timestamp}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>

      {/* Input Section */}
      <HStack mt={4} spacing={2}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          bg="white"
          flex="1"
        />
        <Button colorScheme="blue" onClick={sendMessage}>
          Send
        </Button>
      </HStack>
    </Box>
  );
}

export default ChatApp;