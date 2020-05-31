export const TextStyle = {
  default: {
    text: {
      flexWrap: 'wrap',
      width: '100%',
      __fun: [({ vars }) => ({
        fontFamily: vars.text.fontFamily,
        fontSize: vars.text.fontSize,
        color: vars.text.color,
        padding: vars.spacing.s,
      })]
    },
  },
  h1: {
    text: {
      __fun: [({ vars }) => ({
        fontFamily: vars.text.fontFamilyBold,
        fontSize: vars.text.fontSize * 2.4,
        paddingTop: vars.spacing.l,
      })]
    },
  },
  h2: {
    text: {
      __fun: [({ vars }) => ({
        fontFamily: vars.text.fontFamilyBold,
        fontSize: vars.text.fontSize * 1.8,
        paddingTop: vars.spacing.m,
      })]
    },
  },
  h3: {
    text: {
      __fun: [({ vars }) => ({
        fontSize: vars.text.fontSize * 1.4,
      })]
    },
  },
  small: {
    text: {
      __fun: [({ vars }) => ({
        fontSize: vars.text.fontSize * 0.8,
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
