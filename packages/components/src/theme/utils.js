import { Platform } from 'react-native'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

const defaultPlatforms = ['android', 'ios', 'web']
const defaultOrientation = 'isLandscape'
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

export const mergeStyles = (theme, styles) => {
  const mergedStyles = merge({}, ...styles)

  // For each component state
  parseThemeFunctions(theme, mergedStyles)

  // Remove unused styles for each theme
  parseThemeTargets(theme, mergedStyles, theme.breakPoints)

  return mergedStyles
}

export const themeParser = theme => {
  const themeCopy = createStyles(theme)[0]
  const { themes, breakPoints } = themeCopy

  // Run theme functions
  parseThemeFunctions(themeCopy, themes)

  // Remove unused styles for each theme
  parseThemeTargets(themeCopy, themes, breakPoints)

  return themeCopy
}

export const parseThemeFunctions = (theme, list) => {
  // Run theme functions
  Object.entries(list).forEach(([name, t]) => {
    if (typeof t === 'function')
      list[name] = t(theme)
    else {
      Object.entries(t).forEach(([prop, val]) => {
        if (typeof val === 'function')
          t[prop] = val(theme)
      })
    }
  })
}

export const parseThemeTargets = (theme, list, breakPoints) => {
  // Remove unused styles for each theme
  Object.entries(list).forEach(([name, t]) => {
    const flatTheme = thm => {
      const flatten = Object.entries(thm).map(([prop, value]) => {
        if (prop.startsWith('__')) {
          const cleanKey = prop.slice(2)

          // OS dependent
          if (defaultPlatforms.includes(cleanKey))
            if (Platform.OS === cleanKey) return value
            else return {}

          // Screen dependent
          if (defaultBreakPoints.includes(cleanKey))
            if (breakPoints[cleanKey]) return value
            else return {}
          if (cleanKey === defaultOrientation)
            if (theme.window.isLandscape) return value
            else return {}
        }
        return { [prop]: value }
      })
      const result = merge({}, ...flatten)

      if (Object.keys(result).some(k => k.startsWith('__')))
        return flatTheme(result)

      return result
    }

    list[name] = flatTheme(list[name])
  })
}

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