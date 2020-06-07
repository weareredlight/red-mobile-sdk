import React from 'react'
import ComponentDetails from '../ComponentDetails'

import { Loading } from '@weareredlight/components'

const TextStory = () => (
  <ComponentDetails
    component={Loading}
    defaultProps={{
      style: {
        default: {
          wrapper: {
            __mixins: {
              setBGcolorByOS: [],
            }
          }
        }
      },
    }}
    iterations={[
      { text: 'Custom loading text' },
      { noIcon: true },
      { noText: true },
      { noText: true, inline: true },
      { vertical: true },
      { vertical: true, inline: true },
      { inline: true },
      {
        text: 'large loading',
        style: {
          default: {
            icon: {
              size: 'large',
            }
          }
        },
      },
      {
        text: 'custom text style',
        style: {
          default: {
            text: {
              __fun: [({ vars }) => ({
                color: vars.colors.white,
                paddingLeft: vars.spacing.xl,
              })]
            }
          }
        },
      },
    ]}
  />
)

export default TextStory
