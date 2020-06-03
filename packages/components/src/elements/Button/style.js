export const ButtonStyle = {
  default: {
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100,
      width: '96%',
      marginHorizontal: '2%',
      __fun: [({ vars }) => ({
        borderRadius: vars.borderRadius,
        paddingVertical: vars.spacing.m,
        paddingHorizontal: vars.spacing.l,
        marginVertical: vars.spacing.s,
        backgroundColor: vars.colors.primary,
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
      backgroundColor: 'transparent',
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
