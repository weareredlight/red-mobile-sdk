const animationDuration = 0.4
const animationTick = 0.001

export const ModalStyle = {
  default: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      __web: {
        position: 'fixed',
        opacity: 0,
        visibility: 'hidden',
        transitionProperty: 'opacity, visibility',
        transitionDuration: `${animationDuration}s, ${animationTick}s`,
        transitionTimingFunction: 'ease, linear',
        transitionDelay: `0s, ${animationDuration - animationTick}s`,
      },
      top: 0,
      left: 0,
      zIndex: 1000000,
    },
  },
  visible: {
    wrapper: {
      __web: {
        opacity: 1,
        visibility: 'visible',
        transitionProperty: 'opacity, visibility',
        transitionDuration: `${animationDuration}s, ${animationTick}s`,
        transitionTimingFunction: 'ease, linear',
        transitionDelay: '',
      }
    }
  },
  dark: {
    wrapper: {
      __mixins: {
        backgroundColorWithOpacity: ['black', 0.85]
      },
    }
  }
}
