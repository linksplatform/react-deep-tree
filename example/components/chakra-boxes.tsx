import React, { useState, useEffect, useRef } from "react";
import { Box, Input, VStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box as any);

const numBoxes = 100;
const indentations = Array.from({ length: numBoxes }, (_, i) => i * 100);

const ChakraBoxes = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(null); // Index of the box in the center
  const [offset, setOffset] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0); // State for scroll percentage
  const boxRefs = useRef([]); // Ref array to hold references to each box
  const canvasRef = useRef();

  const calculateClosestBoxToCenter = () => {
    if (!canvasRef.current) {
      return;
    }
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    let closestIndex = null;
    let closestDistance = Infinity;

    boxRefs.current.forEach((box, index) => {
      if (!box) {
        return;
      }
      const boxRect = box.getBoundingClientRect();
      const boxCenter = boxRect.top + boxRect.height / 2;
      const distanceToCenter = Math.abs(boxCenter - viewportCenter);
      if (distanceToCenter < closestDistance) {
        closestDistance = distanceToCenter;
        closestIndex = index;
      }
    });

    setHighlightedIndex(closestIndex);
    setOffset(indentations[closestIndex]);
  };

  const calculateScrollPercentage = () => {
    const scrollTop = window.scrollY; // Distance from the top
    const docHeight = document.documentElement.scrollHeight; // Full document height
    const winHeight = window.innerHeight; // Visible window height

    const totalScrollable = docHeight - winHeight;
    const scrolled = (scrollTop / totalScrollable) * 100;

    setScrollPercentage(scrolled);
  };

  useEffect(() => {
    // Call the function initially and on scroll
    calculateClosestBoxToCenter();
    calculateScrollPercentage();

    window.addEventListener('scroll', calculateClosestBoxToCenter);
    window.addEventListener('scroll', calculateScrollPercentage);

    // Cleanup the scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', calculateClosestBoxToCenter);
      window.removeEventListener('scroll', calculateScrollPercentage);
    };
  }, [numBoxes]);

  return (
    <Box overflowX={'hidden'}>
      <Text position="fixed" top={0} left={0} p={4} fontSize="lg" bg="white" zIndex={1}>
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
              ref={(el) => (boxRefs.current[index] = el)} // Assign the ref to the box
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