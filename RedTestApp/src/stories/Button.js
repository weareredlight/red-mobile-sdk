import React from 'react';

import { Button } from 'components';
import { ButtonStyle } from 'components/lib/elements/Button/style';

import ComponentDetails from '../ComponentDetails'

const ButtonStory = () => {
  return (
    <ComponentDetails
      component={Button}
      style={ButtonStyle}
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
        {
          title: 'with style',
          style: {
            text: {
              color: 'red',
              __ltePhablet: {
                color: 'green',
              },
              __gteDesktop: {
                color: 'blue'
              },
            },
            button: {
              backgroundColor: s => s.theme.anotherColor,
              borderWidth: 2,
            }
          }
        },
      ]}
    />
  )
}

export default ButtonStory
