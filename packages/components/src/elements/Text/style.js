export const TextStyle = {
  default: {
    text: {
      flexWrap: 'wrap',
      width: '100%',
      __fun: [({ vars }) => ({
        fontFamily: vars.text.fontFamily,
        fontSize: vars.text.fontSize,
        color: vars.text.color,
        padding: vars.spacing.xl,
      })]
    },
  },
  h1: {
    text: {
      fontWeight: '900',
    },
    __fun: [({ vars }) => ({
      text: {
        __ios: {
          color: 'yellow'
        }
      }
    })]
  },
  h2: {
    text: {
      fontWeight: '500',
      __fun: [({ vars }) => ({
        fontSize: vars.text.fontSize * 1.8,
      })]
    },
  },
  h3: {
    text: {
      fontWeight: '500',
      __fun: [({ vars }) => ({
        fontSize: vars.text.fontSize * 1.4,
      })]
    },
  },
  small: {
    text: {
      __fun: [({ vars }) => ({
        fontFamily: vars.text.fontFamilySmall,
        fontSize: vars.text.fontSize * 0.9,
      })]
    },
  },
  muted: {
    text: {
      __fun: [({ vars }) => ({
        color: vars.colors.muted,
      })]
    },
  },
}
