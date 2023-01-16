import { Box, BoxProps, CSSObject } from "@mantine/core";
import React from "react";

const BASE_Z_INDEX = 1;
const OVERLAY_ITEM_Z_INDEX = 2;

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
    <Box pos="relative" h="100%" w="100%" sx={{ zIndex: BASE_Z_INDEX }}>
      <Box id="container" pos="absolute" h="100%" w="100%" p="xs">
        <Box id="overlay" pos="relative" h="100%" w="100%">
          <OverlayItem id="topLeft" top={0} left={0} content={topLeft} />
          <OverlayItem
            id="topCenter"
            top={0}
            left="50%"
            sx={{ translate: "-50%" }}
            content={topCenter}
          />
          <OverlayItem id="topRight" top={0} right={0} content={topRight} />
          <OverlayItem
            id="bottomLeft"
            bottom={0}
            left={0}
            content={bottomLeft}
          />
          <OverlayItem
            id="bottomCenter"
            bottom={0}
            left="50%"
            sx={{ translate: "-50%" }}
            content={bottomCenter}
          />
          <OverlayItem
            id="bottomRight"
            bottom={0}
            right={0}
            content={bottomRight}
          />
        </Box>
      </Box>
      {children}
    </Box>
  );
}

function OverlayItem(
  props: Omit<BoxProps, "pos" | "sx" | "children"> & {
    id: string;
    content?: JSX.Element;
    sx?: CSSObject;
  }
) {
  const baseSx: CSSObject = { zIndex: OVERLAY_ITEM_Z_INDEX };
  const { sx, content, ...restProps } = props;

  return (
    <Box {...restProps} pos="absolute" sx={{ ...sx, ...baseSx }}>
      {content ?? null}
    </Box>
  );
}
