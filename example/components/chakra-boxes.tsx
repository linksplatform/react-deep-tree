import React, { useState, useEffect, useRef } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";

const numBoxes = 100;
const indentations = Array.from({ length: numBoxes }, (_, i) => i * 100);

const ChakraBoxes = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(0); 
  const [offset, setOffset] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0); 

  const calculateScrollPercentage = () => {
    const scrollTop = window.scrollY; 
    const docHeight = document.documentElement.scrollHeight; 
    const winHeight = window.innerHeight; 

    const totalScrollable = docHeight - winHeight;
    const scrolled = (scrollTop / totalScrollable) * 100;

    setScrollPercentage(scrolled);

    const calculatedIndex = Math.round((scrolled / 100) * (numBoxes - 1));
    setHighlightedIndex(calculatedIndex);
    setOffset(indentations[calculatedIndex]);
  };

  useEffect(() => {
    calculateScrollPercentage();
    window.addEventListener('scroll', calculateScrollPercentage);
    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage);
    };
  }, [numBoxes]);

  return (
    <Box overflowX={'hidden'}>
      <Text fontFamily="monospace" position="fixed" top={0} right={0} p={4} fontSize="lg" zIndex={1}>
        Scroll Percentage: {scrollPercentage.toFixed(2).padStart(5, '0')}%
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