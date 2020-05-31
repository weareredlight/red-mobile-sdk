export const defaultTheme = {
  breakPoints: [550, 750, 1000, 1400],
  variables: {
    borderRadius: 4,
    text: {
      fontSize: 16,
      fontFamily: 'Inter-LightBETA',
      fontFamilyBold: 'Inter-Bold',
      fontFamilySmall: 'Inter-Medium',
      __fun: [({ vars }) => ({ color: vars.colors.textColor })],
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
}
