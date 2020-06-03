export const ButtonStyle = {
  default: {
    wrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      __fun: [({ vars }) => ({
        padding: vars.spacing.s,
      })],
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minWidth: 100,
      __fun: [({ vars }) => ({
        backgroundColor: vars.colors.primary,
        borderRadius: vars.borderRadius,
        paddingVertical: vars.spacing.m,
        paddingHorizontal: vars.spacing.l,
      })],
    },
    text: {
      __fun: [({ vars }) => ({
        color: vars.colors.white,
        fontSize: vars.text.fontSize,
      })],
    },
  },

  success: {
    button: {
      __fun: [({ vars }) => ({
        backgroundColor: vars.colors.green,
      })]
    },
  },

  error: {
    button: {
      __fun: [({ vars }) => ({
        backgroundColor: vars.colors.red,
      })]
    },
  },

  warning: {
    button: {
      __fun: [({ vars }) => ({
        backgroundColor: vars.colors.yellow,
      })]
    },
  },

  info: {
    button: {
      __fun: [({ vars }) => ({
        backgroundColor: vars.colors.blue,
      })]
    },
  },

  transparent: {
    button: {
      borderWidth: 1,
      backgroundColor: 'transparent',
      __fun: [({ vars }) => ({
        borderColor: vars.colors.grey,
      })]
    },
    text: {
      __fun: [({ vars }) => ({
        color: vars.text.color,
      })]
    },
  },

  disabled: {
    button: {
      __fun: [({ vars }) => ({
        backgroundColor: vars.colors.muted,
      })]
    },
    text: {
      __fun: [({ vars }) => ({
        color: vars.text.color,
      })]
    },
  },
}
