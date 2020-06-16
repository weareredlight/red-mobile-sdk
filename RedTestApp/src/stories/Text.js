import React from 'react'
import { Text } from '@weareredlight/components'

import ComponentDetails from '../ComponentDetails'

const TextStory = () => (
  <ComponentDetails
    component={Text}
    defaultProps={{
      children: 'This is text',
      style: {
        default: {
          text: {
            __mixins: {
              setBGcolorByOS: []
            }
          }
        }
      },
    }}
    iterations={[
      { children: 'Title H1', h1: true },
      { children: 'Title H2', h2: true },
      { children: 'Title H3', h3: true },
      { children: 'normal' },
      { children: 'small', small: true },
      { children: 'muted', muted: true },
      { children: 'muted and small', muted: true, small: true },
      { children: 'inline', inline: true },
      { children: 'center', center: true },
      {
        children: 'text will grow with window.width',
        style: {
          default: {
            text: {
              __fun: [({ vars }) => ({
                backgroundColor: vars.colors.black,
                color: vars.colors.white,
                __phone: {
                  fontSize: vars.text.fontSize * 0.8,
                },
                __phablet: {
                  fontSize: vars.text.fontSize * 1.2,
                },
                __tablet: {
                  fontSize: vars.text.fontSize * 2.6,
                },
                __desktop: {
                  fontSize: vars.text.fontSize * 4,
                },
                __desktopHD: {
                  fontSize: vars.text.fontSize * 8,
                },
              })]
            }
          }
        },
      },
    ]}
  />
)

export default TextStory
