export const defaultTheme = {
  breakPoints: [550, 750, 1000, 1400],
  variables: {
    text: {
      fontSize: 14,
      fontFamily: 'Inter-ExtraLightBETA',
      fontFamilyBold: 'Inter-Bold',
      fontFamilySmall: 'Inter-Medium',
      __fun: [
        ({ vars }) => ({
          color: vars.colors.textColor,
        }),
        ({ vars }) => ({
          color1: vars.colors.textColor,
        })
      ],
      __ios: {
        color2: 'blue'
      },
      __web: {
        color3: 'green'
      },
      '__ios|__web': {
        color4: 'red'
      },
      '__web&__phone': {
        color5: 'pink'
      },
      '__desktop&__ios|__web': {
        color6: 'cyan'
      },
      '__desktop|__web&__ios': {
        color7: 'purple'
      },
    },
    spacing: {
      basicSpacingUnit: 2,
      __fun: [({ vars }) => ({
        xs: vars.spacing.basicSpacingUnit * 1,
        s: vars.spacing.basicSpacingUnit * 2,
        m: vars.spacing.basicSpacingUnit * 4,
        l: vars.spacing.basicSpacingUnit * 8,
        xl: vars.spacing.basicSpacingUnit * 20,
      })]
    },
    colors: {
      primary: '#9153E2',
      background: '#FFFFFF',
      black: '#000000',
      white: '#FFFFFF',
      textColor: '#525262',
      muted: '#D3D5D9',
      placeholder: '#EDF0F3',
      red: '#FF8B8B',
      green: '#49DCB1',
      blue: '#6DCEDD',
      yellow: '#FFDF80',
    }
  },
  themes: {},
  components: {
    Text: {
      default: {
        text: {
          color: 'pink',
          __fun: [({ vars }) => ({
            fontSize: vars.text.fontSize,
          })]
        }
      },
      h1: {
        text: {
          color: 'red',
        },
        __fun: [({ vars }) => ({
          text: {
            fontSize: vars.text.fontSize * 2,
          }
        })]
      }
    }
  },
}
