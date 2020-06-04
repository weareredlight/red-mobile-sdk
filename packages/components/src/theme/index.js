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
import debounce from 'lodash/debounce'

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
const defaultDebounceInterval = 250

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
  // default mixins
  defaultMixins: defaultTheme.mixins,
}

export const ThemeProvider = props => {
  const {
    breakPoints = defaultTheme.breakPoints,
    variables = null,
    themes = {},
    components = {},
    mixins = {},
  } = props

  // theme and selected theme
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

  // update theme
  const updateTheme = useCallback(update => {
    setTheme(theme => merge({}, theme, update))
  }, [setTheme])
  // update theme debounced
  const updateThemeDebounced = useRef(debounce(
    update => updateTheme(update),
    defaultDebounceInterval)
  ).current

  // on resize
  useEffect(() => {
    const updateDimensions = r => updateThemeDebounced(buildScreen(r, breakPoints))
    Dimensions.addEventListener('change', updateDimensions)
    return () => Dimensions.removeEventListener('change', updateDimensions)
  }, [updateThemeDebounced])

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
