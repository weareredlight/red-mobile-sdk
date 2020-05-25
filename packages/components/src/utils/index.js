import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

export const createStyles = base => cloneDeep([base])

export const mergeStyles = styles => merge({}, ...styles)
