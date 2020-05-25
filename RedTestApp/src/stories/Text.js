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
        style: { backgroundColor: 'pink' },
        children: 'This is text'
      }}
      iterations={[
        { title: true, children: 'Title' },
        { small: true, children: 'small text, shhh' },
        { center: true, children: 'centered text' },
        { noWide: true },
      ]}
    />
  )
}

export default TextStory
