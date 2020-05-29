export const ButtonStyle = {
  default: {
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      minWidth: 100,
      width: '96%',
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginVertical: 8,
      marginHorizontal: '2%',
      backgroundColor: 'blue',
    },
    text: {
      color: 'white',
      fontSize: 16,
    },
  },

  primary: {
    button: {
      backgroundColor: t => t.vars.userColor,
    },
    text: {
      color: 'white',
    },
  },

  secondary: {
    button: {
      backgroundColor: 'tomato',
    },
    text: {
      color: 'white',
    },
  },

  transparent: {
    button: {
      backgroundColor: 'transparent',
    },
    text: {
      color: 'black',
    },
  },

  disabled: {
    button: {
      backgroundColor: 'grey',
      __web: {
        backgroundColor: 'purple'
      },
      __ios: {
        backgroundColor: 'yellow'
      },
      __android: {
        backgroundColor: 'green'
      },
    },
    text: {
      color: 'black',
    },
  },
}
