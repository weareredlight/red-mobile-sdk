import React from 'react';

import { Text } from 'components';
import { localStyles as TextStyles } from 'components/lib/elements/Text';

import ComponentDetails from '../ComponentDetails'

const TextStory = () => {
  return (
    <ComponentDetails
      component={Text}
      style={TextStyles}
      defaultProps={{
        style: { text: { backgroundColor: 'pink' } },
        children: 'This is text'
      }}
      iterations={[
        { children: 'Title', title: true },
        { children: 'small', small: true },
        { children: 'inline', inline: true },
        { children: 'center', center: true },
        {
          children: 'with style',
          style: {
            text: {
              color: 'green',
              fontSize: 40,
              textAlign: 'right'
            }
          }
        },
      ]}
    />
  )
}

export default TextStory
