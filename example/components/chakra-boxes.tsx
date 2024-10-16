import React, { useState, useEffect, useRef } from "react";
import { Box, Input, VStack } from "@chakra-ui/react";

const ChakraBoxes = () => {
  const [numBoxes, setNumBoxes] = useState(100); // Default number of boxes
  const [indentations, setIndentations] = useState(Array.from({ length: numBoxes }, (_, i) => i * 10)); // Initial indentations
  const [highlightedIndex, setHighlightedIndex] = useState(null); // Index of the box in the center
  const [offset, setOffset] = useState(0);
  const boxRefs = useRef([]); // Ref array to hold references to each box
  const stackRef = useRef();

  // Function to handle number of boxes change
  const handleNumBoxesChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumBoxes(value);

    // Update the indentation array when number of boxes changes
    setIndentations(
      Array.from({ length: value }, (_, i) => i * 10) // Example: indentation increases by 10px per box
    );
  };

  const calculateClosestBoxToCenter = () => {
    if (!stackRef.current) {
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
      <VStack
        ref={stackRef} 
        spacing={4}
        marginLeft={`${-offset}px`}
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
    </Box>

  );
};

export default ChakraBoxes;