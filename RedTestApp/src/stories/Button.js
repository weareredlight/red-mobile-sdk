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
        { title: 'primary', primary: true },
        { title: 'secondary', secondary: true },
        { title: 'transparent', transparent: true },
        { title: 'disabled', disabled: true },
        { title: 'inline', inline: true },
        { title: 'with style', style: { text: { color: 'red' }, button: { backgroundColor: 'pink' } } },
      ]}
    />
  )
}

export default ButtonStory
