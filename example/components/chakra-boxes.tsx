import React, { useState, useEffect, useRef } from "react";
import { Box, Input, VStack } from "@chakra-ui/react";

import { motion } from "framer-motion";

const MotionBox = motion(Box as any);

const ChakraBoxes = () => {
  const [numBoxes, setNumBoxes] = useState(100); // Default number of boxes
  const [indentations, setIndentations] = useState(Array.from({ length: numBoxes }, (_, i) => i * 100)); // Initial indentations
  const [highlightedIndex, setHighlightedIndex] = useState(null); // Index of the box in the center
  const [offset, setOffset] = useState(0);
  const boxRefs = useRef([]); // Ref array to hold references to each box
  const canvasRef = useRef();

  // Function to handle number of boxes change
  const handleNumBoxesChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumBoxes(value);

    // Update the indentation array when number of boxes changes
    setIndentations(
      Array.from({ length: value }, (_, i) => i * 100) // Example: indentation increases by 10px per box
    );
  };

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

  useEffect(() => {
    // Call the function initially and on scroll
    calculateClosestBoxToCenter();
    window.addEventListener('scroll', calculateClosestBoxToCenter);

    // Cleanup the scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', calculateClosestBoxToCenter);
    };
  }, [numBoxes]);

  return (
    <Box overflowX={'hidden'}>
      <Input
        type="number"
        value={numBoxes}
        onChange={handleNumBoxesChange}
        placeholder="Enter number of boxes"
        width="200px"
      />
      <MotionBox
        ref={canvasRef}
        animate={{ marginLeft: `${-offset}px` }} // Animation on margin change
        transition={{
          duration: 0.4,
          // ease: "easeIn", // Built-in easing function
          ease: "easeOut", // Built-in easing function
          // ease: "linear", // Built-in easing function
        }} // Adjust the transition duration
        paddingTop={`50vh`}
        paddingBottom={`50vh`}
      >
        <VStack
          spacing={4}
        >
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