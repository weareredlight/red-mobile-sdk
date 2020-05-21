const styles = {
  container: {
    borderBottomColor: "#F3F3F3",
    borderBottomWidth: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: "#000000",
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 140,
  },
  section: {
    flexDirection: 'column',
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    marginBottom: 12,
    paddingTop: 4,
    paddingBottom: 10,
  },
  propContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  propName: {
    flex: 1,
    margin: 4,
    fontSize: 16,
    fontWeight: '400',
    color: "#333333",
  },
  propRequired: {
    flex: 1,
    margin: 4,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'grey',
    textAlign: 'center'
  },
  propType: {
    flex: 1,
    margin: 4,
    fontSize: 16,
    fontWeight: '300',
    color: "#333333",
    textAlign: 'right'
  },
  styleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    paddingRight: 10,
    paddingLeft: 5,
    marginLeft: 15,
    borderLeftColor: "#DDDDDD",
    borderLeftWidth: 1,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
  },
  styleKey: {
    paddingVertical: 4,
    paddingLeft: 10,
  },
  componentTitle: {
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: "#333333",
  },
  componentContainer: {
    marginTop: 4,
    marginBottom: 12,
    marginHorizontal: 10,
    alignItems: 'flex-start',
    borderColor: "#BBBBBB",
    borderWidth: 1,
  },
  componentIterations: {
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: '300',
    color: 'grey',
  },
  componentMissingProps: {
    marginTop: 4,
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: '300',
    color: 'red',
  }
}

export default styles