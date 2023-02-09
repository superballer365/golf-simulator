import React from "react";
import { Html as _Html } from "@react-three/drei";
import { MantineProvider, useMantineTheme } from "@mantine/core";

type HtmlProps = React.ComponentProps<typeof _Html>;

/**
 * Wrapper around drei's Html component for rendering arbitrary
 * HTML inside the threejs canvas. This component wraps the contents
 * in a mantine provider with the current theme, serving as a basic
 * context bridge for mantine info.
 */
export default function Html(props: HtmlProps) {
  const theme = useMantineTheme();

  const { children, ...restProps } = props;
  return (
    <_Html {...restProps}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </_Html>
  );
}
