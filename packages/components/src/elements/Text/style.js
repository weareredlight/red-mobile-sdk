export const TextStyle = {
  default: {
    text: {
      flexWrap: 'wrap',
      width: '100%',
      paddingVertical: 2,
      paddingHorizontal: 8,
      color: "#000000",
      fontSize: s => s.theme.textSize,
    },
  },
  title: {
    text: {
      fontSize: 24,
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
