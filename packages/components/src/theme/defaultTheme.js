export const defaultTheme = {
  breakPoints: [550, 750, 1000, 1400],
  variables: {
    borderRadius: 4,
    text: {
      fontSize: 16,
      fontFamily: 'Inter-LightBETA',
      fontFamilyBold: 'Inter-Bold',
      fontFamilySmall: 'Inter-Medium',
      __fun: [({ themes }) => ({ color: themes.default.colors.textColor })],
    },
    spacing: {
      basicSpacingUnit: 2,
      __fun: [({ themes }) => ({
        xs: themes.default.spacing.basicSpacingUnit * 1,
        s: themes.default.spacing.basicSpacingUnit * 2,
        m: themes.default.spacing.basicSpacingUnit * 4,
        l: themes.default.spacing.basicSpacingUnit * 8,
        xl: themes.default.spacing.basicSpacingUnit * 20,
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
    },
    helpers: {
      __fun: [({ themes }) => {
        const unit = themes.default.spacing.basicSpacingUnit
        const data = {
          p: 'padding',
          pT: 'paddingTop',
          pR: 'paddingRight',
          pB: 'paddingBottom',
          pL: 'paddingLeft',
          pV: 'paddingVertical',
          pH: 'paddingHorizontal',
          m: 'margin',
          mT: 'marginTop',
          mR: 'marginRight',
          mB: 'marginBottom',
          mL: 'marginLeft',
          mV: 'marginVertical',
          mH: 'marginHorizontal',
        }
        const obj = {}
        Object.entries(data).map(([key, val]) => {
          const r = {
            xs: { [val]: unit * 2 },
            s: { [val]: unit * 4 },
            m: { [val]: unit * 8 },
            l: { [val]: unit * 16 },
            xl: { [val]: unit * 24 },
          }
          obj[key] = r
        })
        return obj
      }]
    }
  },
  themes: {
    dark: {
      __fun: [({ themes }) => ({
        ...themes.default,
        colors: {
          ...themes.default.colors,
          primary: themes.default.colors.red,
        }
      })]
    }
  }
}
