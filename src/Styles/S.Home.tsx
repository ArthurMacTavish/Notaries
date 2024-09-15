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
});

export default CSS;
