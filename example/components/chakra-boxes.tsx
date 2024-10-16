import React, { useState } from "react";
import { Box, Button, Input, VStack } from "@chakra-ui/react";

const ChakraBoxes = () => {
  const [numBoxes, setNumBoxes] = useState(100); // Default number of boxes
  const [indentations, setIndentations] = useState(Array.from({ length: numBoxes }, (_, i) => i * 10)); // Initial indentations

  // Function to handle number of boxes change
  const handleNumBoxesChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNumBoxes(value);
    
    // Update the indentation array when number of boxes changes
    setIndentations(
      Array.from({ length: value }, (_, i) => i * 10) // Example: indentation increases by 10px per box
    );
  };

  return (
    <VStack spacing={4} overflowX={'hidden'}>   
      <Input
        type="number"
        value={numBoxes}
        onChange={handleNumBoxesChange}
        placeholder="Enter number of boxes"
        width="200px"
      />

      {Array.from({ length: numBoxes }).map((_, index) => (
        <Box
          key={index}
          width="200px"
          height="50px"
          bg="teal.300"
          mt={4}
          ml={`${indentations[index]}px`} // Adjust left margin for indentation
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Box {index + 1}
        </Box>
      ))}
    </VStack>
  );
};

export default ChakraBoxes;