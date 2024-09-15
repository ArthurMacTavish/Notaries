import {StyleSheet} from 'react-native';

const CSS = StyleSheet.create({
  headerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'moccasin',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
  },
  AddView: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  AddTouchable: {
    padding: 16,
    backgroundColor: 'burlywood',
    borderRadius: 100,
  },
  ContentContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  TextBottomBorder: {
    borderBottomWidth: 2,
  },
  TitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  TextFieldWithIcon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Image: {
    marginTop: 16,
    height: 150,
    width: 150,
    borderRadius: 16,
    borderColor: 'burlywood',
    borderWidth: 5,
  },
});

export default CSS;
