import React, { useState, useCallback, useMemo } from 'react'
import merge from 'lodash/merge'
import { View, Text, Button } from 'react-native'
import styles from './ComponentDetailsStyles'

const getComponentPropTypes = ({ propTypes }) =>
  Object.keys(propTypes).map(key => ({
    key,
    ...propTypes[key].info
  })).sort((a, b) => b.isRequired && !a.isRequired
    ? 1 : !b.isRequired && a.isRequired
    ? -1 : b.key > a.key ? -1 : 1)

const ComponentDetails = ({
  component,
  style,
  defaultProps,
  iterations,
}) => {
  const [showProps, setShowProps] = useState(false)
  const [showStyles, setShowStyles] = useState(false)
  const [showIterations, setShowIterations] = useState(true)

  const onIterations = useCallback(() => {
    setShowIterations(!showIterations)
  }, [showIterations])

  const onProps = useCallback(() => {
    setShowProps(!showProps)
    setShowStyles(false)
  }, [showProps])

  const onStyles = useCallback(() => {
    setShowStyles(!showStyles)
    setShowProps(false)
  }, [showStyles])

  const propTypes = useMemo(
    () => getComponentPropTypes(component),
    [component]
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {component.name}
      </Text>

      <View style={styles.section}>
        {renderComponent(component, defaultProps, propTypes, defaultProps)}
      </View>

      <View style={styles.buttonsWrapper}>
        <Button title="Props" onPress={onProps} />
        <Button title="Styles" onPress={onStyles} />
        <Button title="Iterations" onPress={onIterations} />
      </View>

      {showProps &&
        <View style={styles.section}>
          {renderProps(propTypes)}
        </View>
      }

      {showStyles &&
        <View style={styles.section}>
          {renderStyles(style)}
        </View>
      }

      {showIterations && (
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
      {iteration && <Text style={styles.componentIterations}>
        {JSON.stringify(iteration)
          .split('":').join('": ')
          .split(',"').join(', "')}
      </Text>}
      {propTypes.map(
        ({ key, isRequired }) =>
          isRequired && !renderProps[key] &&
            <Text key={key} style={styles.componentMissingProps}>
              {`Prop '${key}' is required but value is: ${renderProps[key]}`}
            </Text>
      )}
    </>
  )
}

const renderProps = propTypes => propTypes.map((prop, index) => (
  <View key={prop.key} style={[
    styles.propContainer,
    index % 2 === 1 ? { backgroundColor: '#DDDDDD' } : {}
  ]}>
    <Text style={styles.propName}>
      {prop.key}
    </Text>
    {prop.isRequired && <Text style={styles.propRequired}>
      required
    </Text>}
    <Text style={styles.propType}>
      {prop.propTypeName}
    </Text>
  </View>
))

const renderStyles = theme =>
  Object.entries(theme).map(([key, value], index) => {
    if (typeof value === 'object') {
      return (
        <View key={key} style={styles.styleKey}>
          <Text style={styles.propName}>
            {key}
          </Text>
          {renderStyles(value)}
        </View>
      )
    } else {
      return (
        <View key={key} style={styles.styleContainer}>
          <Text style={styles.propName}>
            {key}
          </Text>
          <Text style={styles.propType}>
            {value}
          </Text>
        </View>
      )
    }
  })

export default ComponentDetails