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
  createStyles,
  mergeStyles,
  buildScreen,
  themeParser,
} from './utils'

// ComponentThemes
import { ButtonStyle } from '../elements/Button/style'
import { TextStyle } from '../elements/Text/style'

let renderCount = 1

const ThemeContext = createContext()

const defaultThemeName = 'default'

const themeDefaultTemplate = {
  breakPoints: {}, // filled on load
  screen: {}, // filled on load
  window: {}, // filled on load

  // default theme
  themes: {
    [defaultThemeName]: {}
  },

  // Include all components by default
  components: {
    'Button': ButtonStyle,
    'Text': TextStyle,
  },
}

const defaultThemeBuilder = (
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

export const ThemeProvider = props => {
  const {
    breakPoints = [550, 750, 1000, 1400],
    variables = {},
    themes = {},
    components = {},
    mixins = {},
  } = props

  const [selectedTheme, setSelectedTheme] = useState(defaultThemeName)
  const [theme, setTheme] = useState(
    defaultThemeBuilder(
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
      const parsedTheme = themeParser(theme)
      const simplifiedTheme = {
        ...parsedTheme,
        themes: [], // remove access to all themes
        theme: parsedTheme.themes[selectedTheme],
      }

      return {
        // theme object
        theme: simplifiedTheme,
        // functions
        createStyles,
        getStyles: compName => simplifiedTheme.components[compName],
        mergeStyles: s => mergeStyles(simplifiedTheme, s),
        setTheme: themeName => Object.keys(parsedTheme.themes).includes(themeName) && setSelectedTheme(themeName),
      }
    },
    [theme, selectedTheme]
  )

  console.info("Render count:", renderCount++)
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
