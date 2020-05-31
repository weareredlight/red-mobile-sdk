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
        children: 'This is text yo',
        style: {
          default: {
            text: {
              color: 'white',
              __fun: [({ vars }) => ({
                __ios: {
                  backgroundColor: vars.colors.red,
                },
                __web: {
                  backgroundColor: vars.colors.green,
                }
              })]
            }
          }
        },
      }}
      iterations={[
        { children: 'Title H1', h1: true },
        { children: 'Title H2', h2: true },
        { children: 'Title H3', h3: true },
        { children: 'small', small: true },
        { children: 'muted', muted: true },
        { children: 'inline', inline: true },
        { children: 'center', center: true },
        {
          children: 'red on ios, green on android, blue on web',
          style: {
            default: {
              text: {
                textAlign: 'right',
                __fun: [({ vars }) => ({
                  color: vars.colors.blue,
                  __ios: {
                    color: vars.colors.red,
                  },
                  __android: {
                    color: vars.colors.green,
                  },
                })]
              },
            },
          },
        },
      ]}
    />
  )
}

export default TextStory
