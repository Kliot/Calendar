import { ThemeProvider } from "styled-components";

const colorDefs = {
  textPrimary: "#000000",
  textSecondary: "#56584B",
  grey: "#ECEDEB",
  orange: "#DC8007",
  bcBlue: "#EBF7FA",
  coral: "#FF8B7C",
  green: "#87BD40",
  tumeric: "#E8C934",
  lightBlue: "#166671",
};

const theme = {
  bodyFontFamily: `'Arial', sans-serif`,
  ...colorDefs,
};

type themeProps = React.PropsWithChildren<{}>;

const Theme = ({ children }: themeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
