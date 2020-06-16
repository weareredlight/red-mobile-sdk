import React from 'react'
import { Button } from '@weareredlight/components'

import ComponentDetails from '../ComponentDetails'

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
      { title: 'disabled and transparent', disabled: true, transparent: true },
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
              __mixins: {
                setBGcolorByOS: [],
              }
            },
          },
        },
      },
    ]}
  />
)

export default ButtonStory
