import { Dimensions, Platform } from 'react-native'
import set from 'lodash/set'
import get from 'lodash/get'
import merge from 'lodash/merge'
import flatten from 'lodash/flatten'
import cloneDeep from 'lodash/cloneDeep'
import { default as objFlatten } from 'obj-flatten'

const defaultANDseparator = '&'
const defaultORseparator = '|'

const defaultFunctions = '__fun'
const defaultMixins = '__mixins'
const defaultLandscape = {
  __isLandscape: ({ window: { width, height } }) => width > height
}
const defaultPlatforms = {
  __android: () => Platform.OS === 'android',
  __ios: () => Platform.OS === 'ios',
  __web: () => Platform.OS === 'web',
  __window: () => Platform.OS === 'window',
  __macos: () => Platform.OS === 'macos',
}
const defaultBreakPoints = {
  __phone: ({ breakPoints: bp }) => bp.phone,
  __phablet: ({ breakPoints: bp }) => bp.phablet,
  __tablet: ({ breakPoints: bp }) => bp.tablet,
  __desktop: ({ breakPoints: bp }) => bp.desktop,
  __desktopHD: ({ breakPoints: bp }) => bp.desktopHD,
  __ltePhablet: ({ breakPoints: bp }) => bp.ltePhablet,
  __gtePhablet: ({ breakPoints: bp }) => bp.gtePhablet,
  __lteTablet: ({ breakPoints: bp }) => bp.lteTablet,
  __gteTablet: ({ breakPoints: bp }) => bp.gteTablet,
  __lteDesktop: ({ breakPoints: bp }) => bp.lteDesktop,
  __gteDesktop: ({ breakPoints: bp }) => bp.gteDesktop,
}

const allTargets = {
  ...defaultLandscape,
  ...defaultPlatforms,
  ...defaultBreakPoints,
}

export const mergeStyles = stylesList => merge({}, ...stylesList)

export const mergeWithComponentStyles = (theme, compName, compStyles = {}, styles = {}) => {
  // STEP 1 - check if the user injected styles has functions in it
  // we know compStyles doesn't have any because we solved them in themeParser()
  const flattenUserStyles = objFlatten(styles)
  const hasFunctions =
    Object.entries(flattenUserStyles).some(
      ([key, value]) => key.endsWith(defaultFunctions)
    )
  const solvedStyles = hasFunctions
    ? solveThemeFunctions(theme, { [compName]: styles })[compName]
    : styles

  // STEP 2 - merge component styles and user styles
  const mergedStyles = merge({}, compStyles, solvedStyles)

  // STEP 3 - parse final object to remove __targets
  return parseThemeDeep(theme, { [compName]: mergedStyles })[compName]
}

export const themeParser = (theme, selectedTheme) => {
  const themeCopy = merge(
    {},
    {
      // Things to keep from default theme
      breakPoints: theme.breakPoints,
      mixins: theme.mixins,
      screen: theme.screen,
      window: theme.window,

      // Placeholder stuff
      themes: theme.defaultThemes,
      components: theme.defaultComponents,
    }
  )

  // STEP 1
  // 1 - solve default themes functions
  // 2 - solve user themes functions
  // 3 - merge both styles
  // 4 - parse styles
  const solvedDefaultThemes = solveThemeFunctions(themeCopy, theme.defaultThemes)
  themeCopy.themes = solvedDefaultThemes
  const solvedUserThemes = solveThemeFunctions(themeCopy, theme.userThemes)
  const mergedThemes = merge({}, solvedDefaultThemes, solvedUserThemes)
  const parsedThemes = parseThemeDeep(themeCopy, mergedThemes)
  themeCopy.themes = parsedThemes
  themeCopy.vars = parsedThemes[selectedTheme]

  // STEP 2
  // 1 - solve default components functions
  // 2 - solve user components functions
  // 3 - merge both components
  // 4 - parse components
  const solvedDefaultComponents = solveThemeFunctions(themeCopy, theme.defaultComponents)
  themeCopy.components = solvedDefaultComponents
  const solvedUserComponents = solveThemeFunctions(themeCopy, theme.userComponents)
  const mergedComponents = merge({}, solvedDefaultComponents, solvedUserComponents)
  const parsedComponents = parseThemeDeep(themeCopy, mergedComponents)
  themeCopy.components = parsedComponents

  return themeCopy
}

const parseThemeDeep = (theme, list) => {
  const listCopy = {}
  Object.entries(list).forEach(([name, props]) => {
    const parse = data => Object.entries(data).map(([propName, value]) => {
      if (propName.startsWith('__')) {
        if (propName === defaultFunctions) {
          // __fun
          if (value !== null) {
            throw new Error(
              `parseThemeDeep: ${name} ${propName} has a value (${value}),\
but it should be 'null'. Please check your theme.`,
            )
          }
          return null
        } else if (propName === defaultMixins && value !== null) {
          // __mixins
          if (typeof value !== 'object') {
            throw new Error(
              `parseThemeDeep: ${name} ${propName} value is not an 'object' as expected.\
We got a ${typeof value} instead. Please check your theme.`,
            )
          }
          const mixinResults = Object.entries(value).map(([mixinName, mixinParams]) => {
            const mixinFunc = theme.mixins[mixinName]
            if (!mixinFunc || typeof mixinFunc !== 'function') {
              throw new Error(
                `parseThemeDeep: Mixin '${mixinName}' invalid. Please check your <ThemeProvider mixins>`,
              )
            }
            return merge({}, ...parse(mixinFunc(theme, ...mixinParams)))
          })
          return merge({}, ...mixinResults)
        }

        // Logic key validation
        // __android|__ios&__phone|__phablet
        const shouldAddObject = propName.split(defaultANDseparator).reduce(
          // [ '__android|__ios',  '__phone|__phablet' ]
          (acc, curr) => acc && curr.split(defaultORseparator).reduce(
            // [ [ '__android',  '__ios' ],  [ '__phone',  '__phablet' ] ]
            (a, c) => {
              const validator = allTargets[c]
              if (!validator) {
                return a || true
              }
              return a || validator(theme)
            },
            false,
          ),
          true,
        )
        // result = ( __android || __ios ) && ( __phone || __phablet )
        if (shouldAddObject) {
          // Dig deep! Recursive point
          // This is why '__web&__desktop {}' is better than '__web { __desktop {} }'
          return merge({}, ...parse(value))
        }
        return null
      } else if (typeof value === 'object') {
        // Dig deep! Recursive point
        return { [propName]: merge({}, ...parse(value)) }
      } else {
        return { [propName]: value }
      }
    })

    const result = merge({}, ...parse(props))
    listCopy[name] = result
  })
  return listCopy
}

export const themeBuilder = (
  themeDefaultTemplate,
  defaultThemeName,
  selectedTheme,
  breakPoints,
  variables,
  themes,
  components,
  mixins,
) => {
  return {
    ...buildScreen(
      {
        window: Dimensions.get('window'),
        screen: Dimensions.get('screen'),
      },
      breakPoints,
    ),
    // vars: mergedThemes[selectedTheme],
    defaultThemes: themeDefaultTemplate.themes,
    userThemes: {
      ...(variables ? { [defaultThemeName]: variables } : {}),
      ...themes,
    },
    defaultComponents: themeDefaultTemplate.originalComponents,
    userComponents: components,
    mixins: merge({}, themeDefaultTemplate.defaultMixins, mixins),
  }
}

export const buildScreen = ({ window: w, screen: s }, breakPoints) => {
  // This function is responsible for returning
  // an object with the following keys fully calculated:
  // { window, screen, breakPoints }
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
      isLandscape: w.width > w.height,
    },
    screen: {
      ...s,
      isLandscape: s.width > s.height,
    },
  }
}

const NOT_FOUND = '__NOT_FOUND__'
const isValidObj = o => typeof o === 'object' && Object.keys(o).length > 0

// eslint-disable-next-line no-unused-vars
const mergeObjectsAndFunctions = (...objects) => {
  // Remove empty objects
  const validObjects = objects.filter(isValidObj)
  if (validObjects.length === 0) {
    throw new Error(
      'mergeObjectsAndFunctions: We found 0 (zero) valid objects for merging. Please check your theme.',
    )
  } else if (validObjects.length === 1) {
    // If only 1 obj, return that, no need to merge
    return validObjects[0]
  }

  // Lets merge!
  const finalObject = merge({}, ...validObjects)
  const flatObject = objFlatten(finalObject)
  // only the last object __fun:[functions] are kept after merge
  // we need to include functions from all objects
  Object.keys(flatObject).forEach(key => {
    if (key.endsWith(defaultFunctions)) {
      // key = 'Button.default.text.__fun'
      // value will be an empty [{ }]... lost in flatten
      const functionsFromIgnoredObjects = flatten(objects.map(obj => {
        const ignoredFuncArray = get(obj, key, NOT_FOUND)
        // objects[x] has some functions to add?
        if (ignoredFuncArray === NOT_FOUND) {
          return null
        }
        if (!Array.isArray(ignoredFuncArray)) {
          throw new Error(
            `mergeObjectsAndFunctions: ${key} is not an 'array'. Please check your theme.`,
          )
        }
        const notAFunction = ignoredFuncArray.find(f => typeof f !== 'function') || null
        if (notAFunction) {
          const invalidIndex = ignoredFuncArray.indexOf(notAFunction)
          throw new Error(
            `mergeObjectsAndFunctions: ${key}[${invalidIndex}] is not a 'function'. Please check your theme.`,
          )
        }
        return ignoredFuncArray
      }))
      // functionsFromIgnoredObjects = [f1, null, f2, null, f3]
      const filteredFunctions = functionsFromIgnoredObjects.filter(f => typeof f === 'function')
      // filteredFunctions = [f1, f2, f3]
      if (filteredFunctions.length > 0) {
        set(finalObject, key, filteredFunctions)
        // 'Button.default.text.__fun' = [f1, f2, f3] !
      }
    }
  })
  return finalObject
}

const solveThemeFunctions = (theme, data) => {
  const dataCopy = cloneDeep(data)
  const flatObject = objFlatten(data)

  Object.entries(flatObject).forEach(([key, value]) => {
    if (key.endsWith(defaultFunctions)) {
      // key = 'Button.default.text.__fun'
      // value will be an empty [{ }]... lost in flatten

      const themeFunctions = get(data, key, NOT_FOUND)
      // themeFunctions is a valid array of functions?
      if (themeFunctions === NOT_FOUND) {
        throw new Error(
          `solveThemeFunctions: ${key} is 'null'. Please check your theme.`,
        )
      }
      if (!Array.isArray(themeFunctions)) {
        throw new Error(
          `solveThemeFunctions: ${key} is not an 'array'. Please check your theme.`,
        )
      }

      const functionsResults = themeFunctions.map((fun, index) => {
        if (typeof fun !== 'function') {
          throw new Error(
            `solveThemeFunctions: ${key}[${index}] is not a 'function'. Please check your theme.`,
          )
        }
        return solveThemeFunctions(theme, fun(theme))
      })
      // functionsResults = [{...}, null, {...}, null, {...}]
      const filteredResults =
        functionsResults.filter(isValidObj)
      // filteredResults = [{...}, {...}, {...}]
      if (filteredResults.length > 0) {
        const mergedResults = merge({}, ...filteredResults)
        // mergedResults = { ... ... ... }
        const targetKeyToApplyResults =
          key.split('.').splice(0, key.split('.').length - 1).join('.')
        // targetKeyToApplyResults = 'Button.default.text'
        if (targetKeyToApplyResults) {
          const targetKeyValue = get(data, targetKeyToApplyResults, {})
          // targetKeyValue = { old stuff }
          const mergedFunctionResult = merge({}, targetKeyValue, mergedResults)
          mergedFunctionResult.__fun = null
          set(dataCopy, targetKeyToApplyResults, mergedFunctionResult)
          // 'Button.default.text' = { old stuff, results }
          // 'Button.default.text.__fun' = null
        } else {
          // no key. we are solving for root object
          merge(dataCopy, mergedResults)
          dataCopy.__fun = null
          // dataCopy = { old stuff, results }
          // dataCopy.__fun = null
        }
      }
    }
  })
  return dataCopy
}
