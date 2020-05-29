import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect
} from 'react'
import { Platform, Dimensions, TouchableWithoutFeedback } from 'react-native'
import merge from 'lodash/merge'

import {
  mergeStyles,
  buildScreen,
  themeParser,
  defaultThemeBuilder,
} from './utils'

// ComponentThemes
import { ButtonStyle } from '../elements/Button/style'
import { TextStyle } from '../elements/Text/style'

import { defaultTheme } from './defaultTheme'

let renderCount = 1

const ThemeContext = createContext()

const defaultThemeName = 'default'

const themeDefaultTemplate = {
  breakPoints: {}, // filled on load
  screen: {}, // filled on load
  window: {}, // filled on load

  // default theme
  themes: {
    [defaultThemeName]: {
      ...defaultTheme.variables,
    },
    ...defaultTheme.themes,
  },

  // default components
  components: merge(
    {},
    {
      'Button': ButtonStyle,
      'Text': TextStyle,
    },
    defaultTheme.components,
  ),
}

export const ThemeProvider = props => {
  const {
    breakPoints = defaultTheme.breakPoints,
    variables = {},
    themes = {},
    components = {},
    mixins = {},
  } = props

  const [selectedTheme, setSelectedTheme] = useState(defaultThemeName)
  const [theme, setTheme] = useState(
    defaultThemeBuilder(
      themeDefaultTemplate,
      defaultThemeName,
      breakPoints,
      variables,
      themes,
      components,
      mixins,
    )
  )

  const updateTheme = useCallback(update => {
    setTheme(theme => merge({}, theme, update))
  }, [setTheme])

  useEffect(() => {
    const updateDimensions = r => updateTheme(buildScreen(r, breakPoints))
    Dimensions.addEventListener('change', updateDimensions)
    return () => Dimensions.removeEventListener('change', updateDimensions)
  }, [updateTheme])

  const themeContext = useMemo(
    () => {
      const parsedTheme = themeParser(theme, selectedTheme)
      console.log('========== DEBUG: parsedTheme', parsedTheme)

      return {
        // simplified theme
        theme: parsedTheme,

        // return a component styles object
        getStyles: compName => parsedTheme.components[compName],

        // merge stylesList into one object. can skip parsing with skipParse
        mergeStyles: (stylesList, skipParse) => mergeStyles(parsedTheme, stylesList, skipParse),

        // change theme
        setTheme: themeName =>
          Object.keys(parsedTheme.themes).includes(themeName) && setSelectedTheme(themeName),

        // change var in current theme
        setVar: (varName, val) =>
          updateTheme({ themes: { [selectedTheme]: { [varName]: val } } }),

        // change var in default theme or themeName
        setVarOnTheme: (varName, val, themeName) =>
          updateTheme({ themes: { [(themeName || defaultThemeName)]: { [varName]: val } } }),
      }
    },
    [theme, selectedTheme]
  )

  console.log("Render count:", renderCount++)
  return <ThemeContext.Provider value={themeContext} {...props} />
}

export const useTheme = () => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error(
      'Clients of useTheme must be wrapped inside a <ThemeProvider />'
    )
  }
  return themeContext
}
