import React, { useState, useRef, useEffect } from 'react';
import { ChakraProvider, Box, Textarea, Button, VStack, HStack, Avatar, Text, useColorModeValue } from '@chakra-ui/react';
import ChakraMarkdown from './chakra-markdown'; // Import the renamed component

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const chatBgColor = useColorModeValue("white", "gray.800");
  const messageBgColor = useColorModeValue("blue.50", "blue.900");

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
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset textarea height after sending
      }
    }
  };

  // Function to adjust the height of the textarea
  const autoResizeTextarea = () => {
    const maxTextareaHeight = window.innerHeight * 0.3; // 30% of screen height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxTextareaHeight)}px`; // Adjust the height, limiting to 30%
    }
  };

  useEffect(() => {
    // Run the resize function when the input value changes
    autoResizeTextarea();
  }, [input]);

  return (
    <ChakraProvider>
      <Box bg={bgColor} h="100vh" p={4} display="flex" flexDirection="column">
        {/* Chat Messages Display */}
        <VStack
          flex="1"
          bg={chatBgColor}
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
              <Box bg={messageBgColor} p={3} borderRadius="lg" width="90%">
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
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onInput={autoResizeTextarea} // Call onInput to trigger auto-resize
            placeholder="Type a message with Markdown..."
            bg={chatBgColor}
            resize="none"
            overflow="hidden"
            flex="1"
            maxHeight={`30vh`} // Max height: 30% of screen height
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