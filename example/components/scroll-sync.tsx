import React, { useEffect, useState, useRef } from 'react';
import { Box, Flex, VStack } from "@chakra-ui/react";

const ScrollSync = () => {
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const containerRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  const boxes = [
    { bg: "tomato", height: "300px" },
    { bg: "blue.300", height: "400px" },
    { bg: "green.300", height: "350px" },
    { bg: "yellow.400", height: "500px" },
  ];

  const handleScroll = () => {
    const container = containerRef.current;
    const containerHeight = container.offsetHeight;
    const scrollPosition = container.scrollTop;
    const middlePosition = scrollPosition + containerHeight / 2;

    // Check which box is in the middle of the viewport
    let closestBoxIndex = 0;
    let closestDistance = Infinity;

    boxes.forEach((box, index) => {
      const boxElement = document.getElementById(`box-${index}`);
      const boxTop = boxElement.offsetTop;
      const boxHeight = boxElement.offsetHeight;
      const boxMiddle = boxTop + boxHeight / 2;

      const distance = Math.abs(middlePosition - boxMiddle);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestBoxIndex = index;
      }
    });

    setCurrentBoxIndex(closestBoxIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Sync horizontal scroll when the box in the middle changes
    const horizontalContainer = horizontalScrollRef.current;
    const boxWidth = 200; // Adjust the width based on your box size
    horizontalContainer.scrollLeft = currentBoxIndex * boxWidth;
  }, [currentBoxIndex]);

  return (
    <Flex direction="column" align="center" height="100vh" overflow="hidden">
      <Flex ref={horizontalScrollRef} width="100%" overflowX="auto">
        {boxes.map((box, index) => (
          <Box key={index} width="200px" height="50px" bg={box.bg} />
        ))}
      </Flex>

      <VStack
        ref={containerRef}
        spacing={6}
        height="100%"
        overflowY="auto"
        width="100%"
        p={4}
      >
        {boxes.map((box, index) => (
          <Box
            key={index}
            id={`box-${index}`}
            bg={box.bg}
            height={box.height}
            width="100%"
          >
            Box {index + 1}
          </Box>
        ))}
      </VStack>
    </Flex>
  );
};

export default ScrollSync;