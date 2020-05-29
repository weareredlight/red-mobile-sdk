export const TextStyle = {
  default: {
    text: {
      flexWrap: 'wrap',
      width: '100%',
      paddingVertical: 2,
      paddingHorizontal: 8,
      color: "#000000",
      fontSize: t => t.vars.textSize,
    },
  },
  title: {
    text: {
      fontSize: t => t.vars.textSize,
      fontWeight: '500'
    },
  },
  small: {
    text: {
      fontSize: 12,
      fontWeight: '100'
    },
  },
}
