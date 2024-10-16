import React, { useState, useEffect, useRef } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";

const numBoxes = 100;
const indentations = Array.from({ length: numBoxes }, (_, i) => i * 100);

const ChakraBoxes = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(0); 
  const [offset, setOffset] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0); // Save ratio instead of percentage

  const calculateScrollRatio = () => {
    const scrollTop = window.scrollY; 
    const documentHeight = document.documentElement.scrollHeight; 
    const windowHeight = window.innerHeight; 

    const totalScrollable = documentHeight - windowHeight;
    const ratio = scrollTop / totalScrollable;

    setScrollRatio(ratio);

    const calculatedIndex = Math.round(ratio * (numBoxes - 1));
    setHighlightedIndex(calculatedIndex);
    setOffset(indentations[calculatedIndex]);
  };

  useEffect(() => {
    calculateScrollRatio();
    window.addEventListener('scroll', calculateScrollRatio);
    return () => {
      window.removeEventListener('scroll', calculateScrollRatio);
    };
  }, [numBoxes]);

  return (
    <Box overflowX={'hidden'}>
      <Text fontFamily="monospace" position="fixed" top={0} right={0} p={4} fontSize="lg" zIndex={1}>
        Scroll Percentage: {(scrollRatio*100).toFixed(2).padStart(5, '0')}%
      </Text>
      <Box
        marginLeft={`${-offset}px`}
        transition="margin-left 0.3s ease-out" 
        paddingTop={`50vh`}
        paddingBottom={`50vh`}
      >
        <VStack spacing={4}>
          {Array.from({ length: numBoxes }).map((_, index) => (
            <Box
              key={index}
              width="200px"
              height="50px"
              bg={highlightedIndex === index ? "yellow.300" : "teal.300"}
              mt={4}
              ml={`${indentations[index]}px`}
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="background-color 0.3s ease"
            >
              Box {index + 1}
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default ChakraBoxes;