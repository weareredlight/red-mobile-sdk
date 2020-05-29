import React from 'react'

import { Text } from 'components'
import { TextStyle } from 'components/lib/elements/Text/style'

import ComponentDetails from '../ComponentDetails'

const TextStory = () => {
  return (
    <ComponentDetails
      component={Text}
      style={TextStyle}
      defaultProps={{
        style: { default: { text: { backgroundColor: 'pink' } } },
        children: 'This is text',
      }}
      iterations={[
        { children: 'Title', title: true },
        { children: 'small', small: true },
        { children: 'inline', inline: true },
        { children: 'center', center: true },
        {
          children: 'with style',
          style: {
            default: {
              text: {
                color: 'red',
                textAlign: 'right',
                __ltePhablet: {
                  color: 'green',
                },
                __gteDesktop: {
                  color: 'blue',
                },
                __isLandscape: {
                  color: 'white',
                },
              },
            },
          },
        },
      ]}
    />
  )
}

export default TextStory
