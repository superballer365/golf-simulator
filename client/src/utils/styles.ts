import { CSSObject, MantineTheme } from "@mantine/core";

export const stylesWithThemedBackgroundColor = (
  theme: MantineTheme,
  extraStyles?: CSSObject
): CSSObject => ({
  backgroundColor:
    theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0],
  ...extraStyles,
});

export const stylesWithThemedLabelColor = (
  theme: MantineTheme,
  extraStyles?: CSSObject
): CSSObject => ({
  label: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[0],
  },
  ...extraStyles,
});
