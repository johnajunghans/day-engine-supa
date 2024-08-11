// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
        900: "#916A2C",
        800: "#AA7C33",
        700: "#C28E3A",
        600: "#DAA041",
        500: "#F1B049",
        400: "#F4B95A",
        300: "#F5C06C",
        200: "#F6C87D",
        100: "#F7D08F"
    },
    bgTheme: {
        blue: {
            dark: "#0E4FB6",
            light: "#346BC4"
        },
        green: {
            dark: "#296B4B",
            light: "#458968"
        },
        purple: {
            dark: "#501B68",
            light: "#6D3787"
        },
        red: {
            dark: "#7D1425",
            light: "#973242"
        },
        darkBrown: {
            dark: "#1F140E",
            light: "#4B362A"
        },
        lightBrown: {
            dark: "#986546",
            light: "#AD7F62"
        },
        grey: {
            dark: "#88888B",
            light: "#A9A9AD"
        }
    },
    greys: {
        light: "#DADCE0",
        med: "#999EA2",
        dark: "#70757A"
    }
  },
  components: {
    Button: {
        variants: {
            primary: {
                bg: "brand.500",
                border: "1px solid",
                borderColor: "brand.700",
                _hover: {bg: "brand.600", borderColor: "brand.800"},
                fontSize: "1rem",
                fontWeight: "700"
            },
            secondary: {

            }
        }
    }
  }
})