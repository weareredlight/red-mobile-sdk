import React from 'react';

import { Button } from 'components';
import { localStyle as ButtonStyles } from 'components/lib/elements/Button';

import ComponentDetails from '../ComponentDetails'

const ButtonStory = () => {
  return (
    <ComponentDetails
      component={Button}
      style={ButtonStyles}
      defaultProps={{
        title: 'original',
        onPress: () => {},
      }}
      iterations={[
        { title: 'override 1', primary: true },
        { title: 'override error', transparent: true },
        { title: 'disabled', disabled: true, inline: true },
        { title: 'not wide', style: { button: { backgroundColor: 'pink' } } },
        { title: 'override error', secondary: true },
      ]}
    />
  )
}

export default ButtonStory
