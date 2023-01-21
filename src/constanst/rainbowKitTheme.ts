import { darkTheme } from "@rainbow-me/rainbowkit";

const defaultTheme = darkTheme({
  accentColor: '#30314e',
  accentColorForeground: '#f4f4f5',
});
export const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    modalBackground: '#30314e',
    connectButtonBackground: '#30314e',
  },
  fonts: {
    body: 'Poppins',
  },
}