import React from 'react'
import ComponentDetails from '../ComponentDetails'

import { Button } from '@redlightsoftware/components'

const ButtonStory = () => (
  <ComponentDetails
    component={Button}
    defaultProps={{
      title: 'original',
      onPress: () => {},
    }}
    iterations={[
      { title: 'primary', success: true },
      { title: 'error', error: true },
      { title: 'warning', warning: true },
      { title: 'info', info: true },
      { title: 'transparent', transparent: true },
      { title: 'disabled', disabled: true },
      { title: 'inline', inline: true },
      {
        title: 'with style',
        style: {
          default: {
            text: {
              __fun: [({ vars }) => ({
                color: vars.text.color,
              })]
            },
            button: {
              borderRadius: 40,
              __fun: [({ vars }) => ({
                __ios: {
                  backgroundColor: vars.colors.yellow,
                },
                __web: {
                  backgroundColor: vars.colors.blue,
                },
                __android: {
                  backgroundColor: vars.colors.green,
                }
              })],
            },
          },
        },
      },
    ]}
  />
)

export default ButtonStory
