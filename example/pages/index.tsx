import React from "react";
import DeepTree from "../components/deep-tree";
import { DataNode } from "../components/deep-tree";
// import DeepTree from "react-deep-tree";
// import type { DataNode } from "react-deep-tree";
import {
  ChakraProvider,
  Box,
  Button,
  useColorMode,
  IconButton,
  HStack
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const data: DataNode[] = [
  {
    content: 'Text of a first level of the first element',
    children: [
      {
        content: 'Text of a second level of the first element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
    ],
  },
  {
    content: 'Text of a first level of the second element',
    children: [
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
      {
        content: 'Text of a second level of the second element',
        children: [],
      },
    ],
  },
];

const TreeFrame = ({ children }) => {
  return (
    <Box
      height="100vh"
      overflowX="hidden"
      paddingTop={'50vh'}
      paddingBottom={'50vh'}
    >
      {children}
    </Box>
  );
}

const ContentFrame = ({ children }) => {
  return (
    <Box
      bg={'red'}
      p={'0.75em'}
      width={'42em'}         // Make the width responsive
    // mx={'auto'}            // Center the box when it's smaller than the screen width
    >
      {children}
    </Box>
  );
};

const ListComponent = ({ children }) => {
  return <Box as='ol' sx={{ listStyleType: 'none' }} paddingLeft={'5em'}>
    {children}
  </Box>
}

const ListItemComponent = ({ children }) => {
  return <Box as='li'>
    {children}
  </Box>
}

function Page() {
  const { colorMode, toggleColorMode } = useColorMode();

  return <Box
    // display="flex"
    // justifyContent="center"
    // alignItems="center"
    // 
    position="relative" // Set position relative for parent container 
  >
    {/* Theme Toggle Button */}
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      colorScheme="green"
      size="lg"
      position="absolute" // Absolute positioning for button
      top="0.75em"          // Adjust top and right values to place it in the upper right corner
      right="0.75em"
    />
    <DeepTree
      data={data}
      List={ListComponent}
      ListItem={ListItemComponent}
      ContentFrame={ContentFrame}
      TreeFrame={TreeFrame}
    />
  </Box>;
}

const HorizontalScrollAnimation = () => {
  return (
    <Box overflow="hidden" width="100%">
      <HStack
        spacing={8}
        animation="scroll 10s linear infinite"
        whiteSpace="nowrap"
        display="inline-flex"
      >
        <Box w="200px" h="100px" bg="red.500" />
        <Box w="200px" h="100px" bg="green.500" />
        <Box w="200px" h="100px" bg="blue.500" />
        <Box w="200px" h="100px" bg="yellow.500" />
        <Box w="200px" h="100px" bg="purple.500" />
      </HStack>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </Box>
  );
};

// import { HStack, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ScrollSync from "../components/scroll-sync";
import ChakraBoxes from "../components/chakra-boxes";

const MotionBox = motion(Box as any);

const HorizontalScrollWithFramer = () => {
  return (
    <Box overflow="hidden" width="100%">
      <MotionBox
        display="flex"
        animate={{ x: [-1000, 0] }} // Adjust for your content width
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        <HStack spacing={8} whiteSpace="nowrap">
          <Box w="200px" h="100px" bg="red.500" />
          <Box w="200px" h="100px" bg="green.500" />
          <Box w="200px" h="100px" bg="blue.500" />
          <Box w="200px" h="100px" bg="yellow.500" />
          <Box w="200px" h="100px" bg="purple.500" />
        </HStack>
      </MotionBox>
    </Box>
  );
};

// export default HorizontalScrollWithFramer;

export default function Index() {
  return <ChakraProvider>
    {/* <Page /> */}
    {/* <HorizontalScrollAnimation></HorizontalScrollAnimation> */}
    {/* <HorizontalScrollWithFramer></HorizontalScrollWithFramer> */}
    {/* <ScrollSync></ScrollSync> */}
    <ChakraBoxes></ChakraBoxes>
  </ChakraProvider>;
}
