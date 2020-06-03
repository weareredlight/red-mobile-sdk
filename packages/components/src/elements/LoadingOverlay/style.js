const animationDuration = 0.4
const animationTick = 0.01

export const LoadingOverlayStyle = {
  default: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '0%',
      height: '0%',
      __web: {
        position: 'fixed',
        opacity: 0,
        transition:
          `opacity ${animationDuration}s ease,
          width ${animationTick}s linear ${animationDuration - animationTick}s,
          height ${animationTick}s linear ${animationDuration - animationTick}s`,
      },
      top: 0,
      left: 0,
      zIndex: 1000000,
      __mixins: {
        backgroundColorWithOpacity: ['black', 0.85]
      },
    },
  },
  visible: {
    wrapper: {
      width: '100%',
      height: '100%',
      __web: {
        opacity: 1,
        transition:
          `opacity ${animationDuration}s ease,
          width ${animationTick}s,
          height ${animationTick}s`,
      }
    }
  }
}
