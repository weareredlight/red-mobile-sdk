export const defaultTheme = {
  breakPoints: [550, 750, 1000, 1400],
  variables: {
    textSize: 24,
    userColor: 'tomato',
    userSpecialColor: 'pink',
    userSpecialColor1: 'red',
    redishFontWeight: 900,
    buttonHeight: 200,
    anotherColor: t => t.themes.default.userSpecialColor,
  },
  themes: {
    redish: {
      primaryColor: 'red',
      fontWeight: t => t.themes.default.redishFontWeight,
      textColor: 'white',
      __android: {
        textColor: 'green',
      },
    },
    redishCopy: s => ({
      ...s.themes.redish,
      textColor: 'black',
    }),
  },
  components: {},
}
