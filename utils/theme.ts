import { extendTheme } from '@chakra-ui/react';
import { GlobalStyleProps } from '@chakra-ui/theme-tools';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

export const theme = extendTheme({
  config,
  fonts: {
    body: 'Graphik',
    heading: 'Graphik-Medium',
  },
  styles: {
    global: (props: GlobalStyleProps) => ({
      'html, body': {
        color: props.colorMode === 'dark' ? 'gray.100' : 'blackAlpha.800',
        backgroundColor:
          props.colorMode === 'light' ? 'gray.100' : 'blackAlpha.800',
        minHeight: '100vh',
      },
      a: {
        width: 'full',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        color: 'teal.900',
        _hover: {
          color: 'teal.500',
          backgroundColor: 'teal.700',
        },
      },
      variants: {
        danger: {
          backgroundColor: 'red.400',
          color: 'whiteAlpha.900',
          _hover: {
            color: 'whiteAlpha.700',
            backgroundColor: 'red.700',
          },
        },
      },
    },
    Heading: {
      baseStyle: { lineHeight: '1em', fontWeight: 'normal' },
    },
    Badge: {
      baseStyle: { borderRadius: 'lg' },
    },
  },
});
