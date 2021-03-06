import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react'
import PropTypes from 'prop-types'
import { Dimensions } from 'react-native'
import merge from 'lodash/merge'
import throttle from 'lodash/throttle'

import {
  mergeStyles,
  mergeWithComponentStyles,
  buildScreen,
  themeParser,
  themeBuilder,
} from './utils'

import {
  defaultThemeTemplate,
  defaultThemeName,
  defaultBreakPoints,
} from './defaultTheme'

const ThemeContext = createContext()

const defaultThrottleInterval = 100

export const ThemeProvider = props => {
  const {
    breakPoints = defaultBreakPoints,
    variables = null,
    themes = {},
    components = {},
    mixins = {},
  } = props

  // theme and selected theme
  const [selectedTheme, setSelectedTheme] = useState(defaultThemeName)
  const [theme, setTheme] = useState(
    themeBuilder(
      defaultThemeTemplate,
      defaultThemeName,
      selectedTheme,
      breakPoints,
      variables,
      themes,
      components,
      mixins,
    ),
  )

  // update theme
  const updateTheme = useCallback(update => {
    setTheme(theme => merge({}, theme, update))
  }, [setTheme])
  // update theme throttled
  const updateThemeThrottled = useRef(throttle(
    update => updateTheme(update),
    defaultThrottleInterval)
  ).current

  // on resize
  useEffect(() => {
    const updateDimensions = r => updateThemeThrottled(buildScreen(r, breakPoints))
    Dimensions.addEventListener('change', updateDimensions)
    return () => Dimensions.removeEventListener('change', updateDimensions)
  }, [updateThemeThrottled, breakPoints])

  // context creator a.k.a. theme parser
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
    [theme, selectedTheme, updateTheme],
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
