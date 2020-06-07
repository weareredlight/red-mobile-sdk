import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import set from 'lodash/set'
import merge from 'lodash/merge'
import { default as objFlatten } from 'obj-flatten'
import styles from './ComponentDetailsStyles'

import {
  useTheme,
  Flex,
  Button,
  Text,
} from '@weareredlight/components'

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
  const { theme: t, getStyles } = useTheme()
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

  const actionButtons = (
    <>
      <Button inline transparent={!showProps} title='Props' onPress={onProps} />
      <Button inline transparent={!showStyles} title='Styles' onPress={onStyles} />
      <Button inline transparent={!showIterations} title='Iterations' onPress={onIterations} />
    </>
  )

  return (
    <Flex style={styles.container}>
      <Flex
        row
        justify={t.breakPoints.gteTablet ? 'space-between' : 'flex-start'}
      >
        <Text h3 inline>{component.name}</Text>
        {t.breakPoints.gteTablet && (
          <Flex row flex={1} justify='flex-end' style={styles.buttonsWrapper}>
            {actionButtons}
          </Flex>
        )}
      </Flex>

      <Flex row style={styles.section}>
        {renderComponent(component, defaultProps, propTypes, defaultProps)}
      </Flex>

      {t.breakPoints.ltePhablet && (
        <Flex row justify='space-between' style={styles.buttonsWrapper}>
          {actionButtons}
        </Flex>
      )}

      {showProps && (
        <Flex style={styles.section}>{renderProps(propTypes)}</Flex>
      )}

      {showStyles && (
        <Flex style={styles.section}>
          <Flex style={{ default: { flex: t.vars.helpers.pH.s } }}>
            {renderStyles(getStyles(component.name), 0)}
          </Flex>
        </Flex>
      )}

      {showIterations && iterations && (
        <Flex style={styles.section}>
          {iterations.map((iteration, index) => {
            const finalProps = merge({}, defaultProps, iteration)
            return (
              <Flex key={index}>
                {index !== 0 && <Flex style={styles.sectionSpacer} />}
                {renderComponent(component, finalProps, propTypes, iteration)}
              </Flex>
            )
          })}
        </Flex>
      )}
    </Flex>
  )
}

const renderComponent = (component, renderProps, propTypes, iteration) => {
  const Comp = component
  const iterationsParsed = merge({}, iteration)
  Object.entries(objFlatten(iterationsParsed)).forEach(([k, v]) => {
    if (v && typeof v === 'string' && v.length > 28) {
      set(iterationsParsed, k, v.slice(0, 28) + '...')
    }
  })
  return (
    <Flex style={styles.componentWrapper}>
      <Flex align='flex-start' style={styles.componentContainer}>
        <Comp {...renderProps} />
      </Flex>
      {iterationsParsed && (
        <Text small>
          {JSON.stringify(iterationsParsed)
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
            <Text small key={key} style={styles.componentMissingProps}>
              {`Prop '${key}' is required but value is: ${renderProps[key]}`}
            </Text>
          ),
      )}
    </Flex>
  )
}

const renderPropsStyles = i => ({
  ...styles.propContainer,
  default: {
    ...styles.propContainer.default,
    flex: {
      ...styles.propContainer.default.flex,
      ...(i % 2 === 1 ? { backgroundColor: '#DDDDDD' } : {})
    }
  }
})
const renderProps = propTypes =>
  propTypes.map((prop, index) => (
    <Flex
      key={prop.key}
      row
      justify='space-between'
      style={renderPropsStyles(index)}
    >
      <Text inline>{prop.key}</Text>
      {prop.isRequired && <Text inline muted>required</Text>}
      <Text inline>{prop.propTypeName}</Text>
    </Flex>
  ))

const renderStyles = (theme, level) => {
  return Object.entries(theme).map(([key, value], index) => {
    let valueToPrint = value
    let labelToPrint = level === 0 ? 'state' : level === 1 ? 'element' : ''
    let chidlrenToPrint = null

    if (key.startsWith('__fun')) {
      labelToPrint = `${value.length}`
      valueToPrint = `[ ${value.map(fun => 'f() ')}]`
    } else if (key.startsWith('__mixins')) {
      labelToPrint = `${Object.entries(value).length}`
      valueToPrint = `${Object.entries(value).map(([k]) => `${k}()`)}`
    } else if (key.startsWith('__') || typeof value === 'object') {
      valueToPrint = ''
      chidlrenToPrint = renderStyles(value, level + 1)
    }

    return (
      <Flex key={key} style={styles.styleWrapper}>
        <Flex
          key={key}
          row
          justify='space-between'
          style={styles.styleContainer}
        >
          <Text inline>
            {key}
            {labelToPrint && labelToPrint.length > 0 &&
              <Text inline muted>
                {'  ' + labelToPrint}
              </Text>}
          </Text>
          <Text inline>
            {valueToPrint || ''}
          </Text>
        </Flex>
        {chidlrenToPrint && chidlrenToPrint}
      </Flex>
    )
  })
}

ComponentDetails.propTypes = {
  component: PropTypes.func.isRequired,
  defaultProps: PropTypes.shape(),
  iterations: PropTypes.arrayOf(PropTypes.shape()),
}

export default ComponentDetails
