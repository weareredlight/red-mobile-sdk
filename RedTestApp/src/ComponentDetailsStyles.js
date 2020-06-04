const styles = {
  container: {
    default: {
      flex: {
        borderBottomWidth: 1,
        __fun: [({ vars }) => ({
          borderBottomColor: vars.colors.grey,
          padding: vars.spacing.m,
        })]
      }
    }
  },
  buttonsWrapper: {
    default: {
      flex: {
        __fun: [({ vars }) => ({
          paddingVertical: vars.spacing.xs,
        })]
      }
    }
  },
  section: {
    default: {
      flex: {
        maxWidth: 900,
        __fun: [({ vars }) => ({
          backgroundColor: vars.colors.lightGrey,
          borderRadius: vars.borderRadius,
          paddingVertical: vars.spacing.m,
          marginVertical: vars.spacing.s,
        })]
      }
    }
  },
  sectionSpacer: {
    default: {
      flex: {
        height: 1,
        borderBottomWidth: 1,
        __fun: [({ vars }) => ({
          marginVertical: vars.spacing.m,
          borderBottomColor: vars.colors.grey,
        })]
      }
    }
  },
  propContainer: {
    default: {
      flex: {
        __fun: [({ vars }) => ({
          paddingHorizontal: vars.spacing.m,
          paddingVertical: vars.spacing.s,
        })]
      }
    }
  },
  styleWrapper: {
    default: {
      flex: {
        borderLeftWidth: 1,
        borderTopWidth: 1,
        __fun: [({ vars }) => ({
          borderTopColor: vars.colors.grey,
          borderLeftColor: vars.colors.grey,
          paddingLeft: vars.spacing.m,
          paddingTop: vars.spacing.xs,
        })]
      }
    }
  },
  styleContainer: {
    default: {
      flex: {
        __fun: [({ vars }) => ({
          paddingRight: vars.spacing.s,
          paddingVertical: vars.spacing.xs,
        })]
      }
    }
  },
  componentWrapper: {
    default: {
      flex: {
        __fun: [({ vars }) => ({
          padding: vars.spacing.m,
        })]
      }
    }
  },
  componentContainer: {
    default: {
      flex: {
        borderWidth: 1,
        __fun: [({ vars }) => ({
          borderColor: vars.colors.black,
        })]
      }
    }
  },
  componentMissingProps: {
    default: {
      text: {
        __fun: [({ vars }) => ({
          color: vars.colors.red,
        })]
      }
    }
  },
}

export default styles
