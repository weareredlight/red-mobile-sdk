export const ScreenStyle = {
  default: {
    safeArea: {
      width: '100%',
      minHeight: '100%',
      __web: {
        minHeight: '100vh',
      },
      __fun: [({ vars }) => ({
        backgroundColor: vars.colors.background
      })],
    },
    wrapper: {
      width: '100%',
      height: '100%',
    },
  },
}
