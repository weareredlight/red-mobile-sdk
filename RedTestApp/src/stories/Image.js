import React from 'react'
import ComponentDetails from '../ComponentDetails'

import { Image } from '@redlightsoftware/components'

// Example images
import SquareCat from '../assets/images/square_cat.jpg'
// import HorizontalLandscape from '../assets/images/horizontal_landscape.jpg'
// import VerticalTrees from '../assets/images/vertical_trees.jpg'

const ImageStory = () => (
  <ComponentDetails
    component={Image}
    defaultProps={{
      source: SquareCat,
      height: 200,
      style: {
        default: {
          wrapper: {
            __mixins: {
              setBGcolorByOS: [],
            }
          },
        },
      },
    }}
    iterations={[
      { width: '40%', height: 400 },
      { justify: 'flex-end' },
      { align: 'flex-start', width: '40%', height: 400 },
      { resizeMode: 'cover' },
      { resizeMode: 'stretch' },
      { resizeMode: 'repeat', height: 400 },
      { resizeMode: 'center', height: 400 },
    ]}
  />
)

export default ImageStory
