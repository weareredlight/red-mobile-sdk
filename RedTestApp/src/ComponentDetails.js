import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { View, Text, Button } from 'react-native'
import styles from './ComponentDetailsStyles'

import { useTheme } from '@redlightsoftware/components'

const getComponentPropTypes = ({ propTypes }) =>
  Object.keys(propTypes)
    .map(key => ({
      key,
      ...propTypes[key].info,
    }))
    .sort((a, b) =>
      b.isRequired && !a.isRequired
        ? 1
        : !b.isRequired && a.isRequired
          ? -1
          : b.key > a.key
            ? -1
            : 1,
    )

const ComponentDetails = ({ component, defaultProps, iterations }) => {
  const { getStyles } = useTheme()
  const [showProps, setShowProps] = useState(false)
  const [showStyles, setShowStyles] = useState(false)
  const [showIterations, setShowIterations] = useState(false)

  const onIterations = useCallback(() => {
    setShowIterations(!showIterations)
    setShowStyles(false)
    setShowProps(false)
  }, [showIterations])

  const onProps = useCallback(() => {
    setShowProps(!showProps)
    setShowIterations(false)
    setShowStyles(false)
  }, [showProps])

  const onStyles = useCallback(() => {
    setShowStyles(!showStyles)
    setShowIterations(false)
    setShowProps(false)
  }, [showStyles])

  const propTypes = useMemo(() => getComponentPropTypes(component), [
    component,
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{component.name}</Text>

      <View style={styles.section}>
        {renderComponent(component, defaultProps, propTypes, defaultProps)}
      </View>

      <View style={styles.buttonsWrapper}>
        <Button title='Props' onPress={onProps} />
        <Button title='Styles' onPress={onStyles} />
        <Button title='Iterations' onPress={onIterations} />
      </View>

      {showProps && (
        <View style={styles.section}>{renderProps(propTypes)}</View>
      )}

      {showStyles && (
        <View style={styles.section}>{renderStyles(getStyles(component.name), 0)}</View>
      )}

      {showIterations && iterations && (
        <View style={styles.section}>
          {iterations.map((iteration, index) => {
            const finalProps = merge({}, defaultProps, iteration)
            return (
              <View key={index}>
                {index !== 0 && <View style={styles.sectionSpacer} />}
                {renderComponent(component, finalProps, propTypes, iteration)}
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}

const renderComponent = (component, renderProps, propTypes, iteration) => {
  const Comp = component
  return (
    <>
      <View style={styles.componentContainer}>
        <Comp {...renderProps} />
      </View>
      {iteration && (
        <Text style={styles.componentIterations}>
          {JSON.stringify(iteration)
            .split('":')
            .join('": ')
            .split(',"')
            .join(', "')}
        </Text>
      )}
      {propTypes.map(
        ({ key, isRequired }) =>
          isRequired &&
          !renderProps[key] && (
            <Text key={key} style={styles.componentMissingProps}>
              {`Prop '${key}' is required but value is: ${renderProps[key]}`}
            </Text>
          ),
      )}
    </>
  )
}

const darker = { backgroundColor: '#DDDDDD' }
const renderProps = propTypes =>
  propTypes.map((prop, index) => (
    <View
      key={prop.key}
      style={[styles.propContainer, index % 2 === 1 ? darker : {}]}
    >
      <Text style={styles.propName}>{prop.key}</Text>
      {prop.isRequired && <Text style={styles.propRequired}>required</Text>}
      <Text style={styles.propType}>{prop.propTypeName}</Text>
    </View>
  ))

const renderStyles = (theme, level) => {
  return Object.entries(theme).map(([key, value], index) => {
    let keyToPrint = key
    let valueToPrint = value
    let labelToPrint = level === 0 ? 'state' : level === 1 ? 'element' : ''
    let chidlrenToPrint = null

    if (key.startsWith('__fun')) {
      labelToPrint = `${value.length}`
      valueToPrint = `[ ${value.map(fun => `f() `)}]`
    } else if (key.startsWith('__mixins')) {
      labelToPrint = `${Object.entries(value).length}`
      valueToPrint = `${Object.entries(value).map(([k]) => `${k}()`)}`
    } else if (key.startsWith('__') || typeof value === 'object') {
      valueToPrint = null
      chidlrenToPrint = renderStyles(value, level + 1)
    }

    return (
      <View key={key} style={styles.styleContainer}>
        <View
          key={key}
          style={[styles.styleHeader, index % 2 === 1 && level > 1 ? darker : {}]}
        >
          <Text style={styles.propName}>
            {keyToPrint}
            {labelToPrint && labelToPrint.length > 0 &&
              <Text style={styles.propRequired}>
                {'  ' + labelToPrint}
              </Text>
            }
          </Text>
          <Text style={styles.propType}>{valueToPrint}</Text>
        </View>
        {chidlrenToPrint && chidlrenToPrint}
      </View>
    )
  })
}

ComponentDetails.propTypes = {
  component: PropTypes.func.isRequired,
  style: PropTypes.shape(),
  defaultProps: PropTypes.shape(),
  iterations: PropTypes.arrayOf(PropTypes.shape()),
}

export default ComponentDetails
