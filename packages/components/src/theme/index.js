import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { Dimensions } from 'react-native'
import merge from 'lodash/merge'

import {
  mergeStyles,
  mergeWithComponentStyles,
  buildScreen,
  themeParser,
  defaultThemeBuilder,
} from './utils'

// ComponentThemes
import { LoadingOverlayStyle } from '../elements/LoadingOverlay/style'
import { LoadingStyle } from '../elements/Loading/style'
import { ScreenStyle } from '../elements/Screen/style'
import { ButtonStyle } from '../elements/Button/style'
import { TextStyle } from '../elements/Text/style'
import { FlexStyle } from '../elements/Flex/style'

import { defaultTheme } from './defaultTheme'

const ThemeContext = createContext()

const defaultThemeName = 'default'

const themeDefaultTemplate = {
  // default theme
  themes: {
    [defaultThemeName]: {
      ...defaultTheme.variables,
    },
    ...defaultTheme.themes,
  },
  // default components
  defaultThemeComponents: defaultTheme.components,
  originalComponents: {
    LoadingOverlay: LoadingOverlayStyle,
    Loading: LoadingStyle,
    Screen: ScreenStyle,
    Button: ButtonStyle,
    Text: TextStyle,
    Flex: FlexStyle,
  },
}

export const ThemeProvider = props => {
  const {
    breakPoints = defaultTheme.breakPoints,
    variables = null,
    themes = {},
    components = {},
    mixins = {},
  } = props

  const [selectedTheme, setSelectedTheme] = useState(defaultThemeName)
  const [theme, setTheme] = useState(
    defaultThemeBuilder(
      themeDefaultTemplate,
      defaultThemeName,
      selectedTheme,
      breakPoints,
      variables,
      themes,
      components,
      mixins,
    ),
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

      return {
        theme: parsedTheme,
        selectedTheme,

        // return a component styles object
        getStyles: compName => parsedTheme.components[compName],

        // merges an array of style objects into a final object
        // we can change this function later and keep compatibility
        mergeStyles: stylesList => mergeStyles(stylesList),

        // merge component specific styles with the already calculated component styles
        mergeWithComponentStyles: (compName, style) =>
          mergeWithComponentStyles(
            parsedTheme,
            compName,
            parsedTheme.components[compName],
            style,
          ),

        // change theme
        setTheme: themeName =>
          Object.keys(parsedTheme.themes).includes(themeName) && setSelectedTheme(themeName),

        // change var in current theme
        setVar: (varName, val) =>
          updateTheme({ themes: { [selectedTheme]: { [varName]: val } } }),

        // change var in default theme or themeName
        setVarOnTheme: (themeName, varName, val) =>
          updateTheme({ themes: { [(themeName || defaultThemeName)]: { [varName]: val } } }),
      }
    },
    [theme, selectedTheme],
  )

  return <ThemeContext.Provider value={themeContext} {...props} />
}

ThemeProvider.propTypes = {
  breakPoints: PropTypes.arrayOf([PropTypes.number]),
  variables: PropTypes.shape(),
  themes: PropTypes.shape(),
  components: PropTypes.shape(),
  mixins: PropTypes.shape(),
}

export const useTheme = () => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error(
      'Clients of useTheme must be wrapped inside a <ThemeProvider />',
    )
  }
  return themeContext
}

export default ThemeProvider
