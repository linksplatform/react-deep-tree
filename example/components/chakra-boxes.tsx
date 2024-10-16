import React, { useState, useEffect, useRef } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box as any);

const numBoxes = 100;
const indentations = Array.from({ length: numBoxes }, (_, i) => i * 100);

const ChakraBoxes = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(0); // Directly calculate index
  const [offset, setOffset] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0); // State for scroll percentage
  const canvasRef = useRef();

  const calculateScrollPercentage = () => {
    const scrollTop = window.scrollY; // Distance from the top
    const docHeight = document.documentElement.scrollHeight; // Full document height
    const winHeight = window.innerHeight; // Visible window height

    const totalScrollable = docHeight - winHeight;
    const scrolled = (scrollTop / totalScrollable) * 100;

    setScrollPercentage(scrolled);

    // Calculate the index based on the scroll percentage
    const calculatedIndex = Math.round((scrolled / 100) * (numBoxes - 1));
    setHighlightedIndex(calculatedIndex);
    setOffset(indentations[calculatedIndex]);
  };

  useEffect(() => {
    // Call the function initially and on scroll
    calculateScrollPercentage();

    window.addEventListener('scroll', calculateScrollPercentage);

    // Cleanup the scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage);
    };
  }, [numBoxes]);

  return (
    <Box overflowX={'hidden'}>
      <Text position="fixed" top={0} right={0} p={4} fontSize="lg" zIndex={1}>
        Scroll Percentage: {scrollPercentage.toFixed(2)}%
      </Text>
      <MotionBox
        ref={canvasRef}
        animate={{ marginLeft: `${-offset}px` }} // Animation on margin change
        transition={{
          duration: 0.4,
          ease: "easeOut", // Built-in easing function
        }} // Adjust the transition duration
        paddingTop={`50vh`}
        paddingBottom={`50vh`}
      >
        <VStack spacing={4}>
          {Array.from({ length: numBoxes }).map((_, index) => (
            <Box
              key={index}
              width="200px"
              height="50px"
              bg={highlightedIndex === index ? "yellow.300" : "teal.300"} // Highlight the box closest to center
              mt={4}
              ml={`${indentations[index]}px`} // Adjust left margin for indentation
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="background-color 0.3s ease"
            >
              Box {index + 1}
            </Box>
          ))}
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default ChakraBoxes;