const styles = {
  container: {
    borderBottomColor: "#F3F3F3",
    borderBottomWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: "#000000",
    padding: 10,
    paddingBottom: 4,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 4,
  },
  section: {
    flexDirection: 'column',
    backgroundColor: "#F3F3F3",
    borderRadius: 4,
    margin: 4,
    paddingVertical: 8,
  },
  sectionSpacer: {
    width: '100%',
    height: 1,
    marginVertical: 10,
    borderBottomColor: "#DFDFDF",
    borderBottomWidth: 1,
  },
  propContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  propName: {
    flex: 1,
    padding: 4,
    fontSize: 16,
    fontWeight: '400',
    color: "#333333",
  },
  propRequired: {
    flex: 1,
    padding: 4,
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'grey',
    textAlign: 'center'
  },
  propType: {
    flex: 1,
    padding: 4,
    fontSize: 16,
    fontWeight: '300',
    color: "#333333",
    textAlign: 'right'
  },
  styleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftColor: "#DFDFDF",
    borderLeftWidth: 1,
    borderBottomColor: "#DFDFDF",
    borderBottomWidth: 1,
    marginLeft: 14,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  styleKey: {
    paddingVertical: 4,
    paddingLeft: 10,
  },
  componentContainer: {
    alignItems: 'flex-start',
    borderColor: "#DFDFDF",
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  componentIterations: {
    fontSize: 12,
    fontWeight: '400',
    marginHorizontal: 12,
    marginVertical: 2,
    color: 'grey',
  },
  componentMissingProps: {
    fontSize: 12,
    fontWeight: '300',
    marginHorizontal: 12,
    marginVertical: 2,
    color: 'red',
  }
}

export default styles