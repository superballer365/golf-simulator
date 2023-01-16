import { Box } from "@mantine/core";
import React from "react";

interface OverlayProps {
  topLeft?: JSX.Element;
  topCenter?: JSX.Element;
  topRight?: JSX.Element;
  bottomLeft?: JSX.Element;
  bottomCenter?: JSX.Element;
  bottomRight?: JSX.Element;
}

export default function Overlay({
  topLeft,
  topCenter,
  topRight,
  bottomLeft,
  bottomCenter,
  bottomRight,
  children,
}: React.PropsWithChildren<OverlayProps>) {
  return (
    <Box pos="relative" h="100%" w="100%">
      <Box
        id="container"
        pos="absolute"
        h="100%"
        w="100%"
        p="xs"
        sx={{ zIndex: 10 }}
      >
        <Box id="overlay" pos="relative" h="100%" w="100%">
          <Box id="topLeft" pos="absolute" top={0} left={0}>
            {topLeft ?? null}
          </Box>
          <Box
            id="topCenter"
            pos="absolute"
            top={0}
            left="50%"
            sx={{ translate: "-50%" }}
          >
            {topCenter ?? null}
          </Box>
          <Box id="topRight" pos="absolute" top={0} right={0}>
            {topRight ?? null}
          </Box>
          <Box id="bottomLeft" pos="absolute" bottom={0} left={0}>
            {bottomLeft ?? null}
          </Box>
          <Box
            id="bottomCenter"
            pos="absolute"
            bottom={0}
            left="50%"
            sx={{ translate: "-50%" }}
          >
            {bottomCenter ?? null}
          </Box>
          <Box id="bottomRight" pos="absolute" bottom={0} right={0}>
            {bottomRight ?? null}
          </Box>
        </Box>
      </Box>
      {children}
    </Box>
  );
}
