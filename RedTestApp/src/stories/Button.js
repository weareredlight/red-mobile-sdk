import React from 'react';

import { Button } from 'red-mobile-sdk/components';
import { localStyles as ButtonStyles } from 'red-mobile-sdk/components/lib/elements/Button';

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
        { title: 'disabled', disabled: true },
        { title: 'override error', transparent: true },
        { title: 'override error', secondary: true },
        { title: 'not wide', noWide: true, style: { backgroundColor: 'red' } },
      ]}
    />
  )
}

export default ButtonStory
