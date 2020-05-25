import { Platform } from 'react-native'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

const platforms = ['android', 'ios', 'web']

export const createStyles = base => cloneDeep([base])

export const mergeStyles = styles => {
  const mergedStyles = merge({}, ...styles)
  Object.entries(mergedStyles).forEach(([key, value]) => {
    platforms.forEach(plat => {
      const property = `__${plat}`
      if (Platform.OS === plat && value.hasOwnProperty(property)) {
        mergedStyles[key] = merge({}, value, value[property])
      }
    })
  })
  return mergedStyles
}
