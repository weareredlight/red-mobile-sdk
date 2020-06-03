export const LoadingStyle = {
  default: {
    wrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      __fun: [({ vars }) => ({
        paddingVertical: vars.spacing.s,
        paddingHorizontal: vars.spacing.m,
      })],
    },
    icon: {
      size: 'small',
      __fun: [({ vars }) => ({
        color: vars.colors.primary,
      })],
    },
    text: {
      __fun: [({ vars, components }) => ({
        ...components.Text.default.text,
        width: undefined,
        padding: vars.spacing.s,
        paddingLeft: vars.spacing.m,
      })]
    },
  },
  noIcon: {
    text: {
      __fun: [({ vars }) => ({
        paddingLeft: vars.spacing.s,
      })],
    },
  },
  noText: {
    wrapper: {
      __fun: [({ vars }) => ({
        paddingVertical: vars.spacing.m,
      })],
    },
  },
  vertical: {
    wrapper: {
      flexDirection: 'column',
    },
    text: {
      __fun: [({ vars }) => ({
        paddingLeft: vars.spacing.s,
        paddingTop: vars.spacing.m,
      })],
    },
  },
}
