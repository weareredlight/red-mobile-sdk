import { Dimensions, Platform } from 'react-native'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

const defaultPlatforms = ['android', 'ios', 'web']
const defaultLandscape = 'isLandscape'
const defaultMixin = 'mixins'
const defaultBreakPoints = [
  'phone',
  'phablet',
  'tablet',
  'desktop',
  'desktopHD',
  'ltePhablet',
  'gtePhablet',
  'lteTablet',
  'gteTablet',
  'lteDesktop',
  'gteDesktop',
]

export const createStyles = base => cloneDeep([base])

export const mergeStyles = (theme, styles, skipParse) => {
  const mergedStyles = merge({}, ...styles)
  if (skipParse)
    return mergedStyles
  else
    return parseThemeDeep(theme, mergedStyles, theme.breakPoints)
}

export const themeParser = (theme, selectedTheme) => {
  const { themes, components, breakPoints } = theme
  const newTheme = { ...theme }

  // Parse themes and variables
  newTheme.themes = parseThemeDeep(theme, themes, breakPoints)
  newTheme.vars = newTheme.themes[selectedTheme]

  // Parse components
  newTheme.components = parseThemeDeep(newTheme, components, breakPoints)

  return newTheme
}

export const needsMoreParsing = data => {
  if (
    Object.keys(data).some(k => k.startsWith('__')) ||
    Object.values(data).some(v => typeof v === 'function')
  )
    return true
  return false
}

export const parseThemeDeep = (theme, list, breakPoints) => {

  const flatTheme = (thm) => {
    const flatten = Object.entries(thm).map(([prop, val]) => {
      const cleanKey = prop.slice(2)
      let parseResutl
  
      const getValue = typeof val === 'function' ? val(theme) : val
  
      if (defaultPlatforms.includes(cleanKey)) {
        // OS dependent
        parseResutl = Platform.OS === cleanKey ? getValue : {}

      } else if (defaultBreakPoints.includes(cleanKey)) {
        // Break Points
        parseResutl = breakPoints[cleanKey] ? getValue : {}

      } else if (cleanKey === defaultLandscape) {
        // Landscape
        parseResutl = theme.window.isLandscape ? getValue : {}

      } else if (cleanKey === defaultMixin) {
        // Mixins
        const mixinResults = Object.entries(val).map(([mixinName, mixinParams]) => {
          const mixinFunc = theme.mixins[mixinName]
          if (mixinFunc) {
            return mixinFunc(theme, ...mixinParams)
          } else {
            throw new Error(
              `Mixin '${mixinName}' not found. Please check your <ThemeProvider mixins={obj}>`
            )
            return {}
          }
        })
        parseResutl = merge({}, ...mixinResults)

      } else if (typeof val === 'function') {
        // 'val' is a function
        parseResutl = flatTheme({ [prop]: getValue })

      } else if (typeof val === 'object') {
        // 'val' is an object
        // Solve all this "inside" (recursive)
        parseResutl = { [prop]: flatTheme(val) }

      } else parseResutl = { [prop]: val }

      return parseResutl
    })
    const result = merge({}, ...flatten)

    if (needsMoreParsing(result))
      return flatTheme(result)
    return result
  }
  return flatTheme(list)
}

export const defaultThemeBuilder = (
  themeDefaultTemplate,
  defaultThemeName,
  breakPoints,
  variables,
  themes,
  components,
  mixins,
) => ({
  ...createStyles(themeDefaultTemplate)[0],
  ...buildScreen(
    {
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen'),
    },
    breakPoints
  ),
  themes: {
    ...themeDefaultTemplate.themes,
    [defaultThemeName]: {
      ...themeDefaultTemplate.themes[defaultThemeName],
      ...variables,
    },
    ...themes,
  },
  components: merge({}, themeDefaultTemplate.components, components),
  mixins,
})

export const buildScreen = ({ window: w, screen: s }, breakPoints) => {
  const [minPhablet, minTablet, minDesktop, minDesktopHD] = breakPoints

  return {
    breakPoints: {
      phone: w.width >= 0 && w.width < minPhablet,

      ltePhablet: w.width < minTablet,
      phablet: w.width >= minPhablet && w.width < minTablet,
      gtePhablet: w.width >= minPhablet,

      lteTablet: w.width < minDesktop,
      tablet: w.width >= minTablet && w.width < minDesktop,
      gteTablet: w.width >= minTablet,

      lteDesktop: w.width < minDesktopHD,
      desktop: w.width >= minDesktop && w.width < minDesktopHD,
      gteDesktop: w.width >= minDesktop,

      desktopHD: w.width >= minDesktopHD,
    },
    window: {
      ...w,
      isLandscape: w.width > w.height
    },
    screen: {
      ...s,
      isLandscape: s.width > s.height
    },
  }
}