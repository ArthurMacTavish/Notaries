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
  DeleteView: {
    position: 'absolute',
    bottom: 12,
    right: 78,
  },
  DeleteTouchable: {
    padding: 16,
    backgroundColor: 'burlywood',
    borderRadius: 100,
  },
  FlatListContainer: {
    paddingTop: 8,
  },
  ContentContainer: {
    flex: 1,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    borderColor: 'burlywood',
    backgroundColor: 'beige',
    borderWidth: 6,
  },
  TextBottomBorder: {
    borderBottomWidth: 2,
    paddingBottom: 6,
    marginBottom: 6,
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
    height: 150,
    width: 150,
    borderRadius: 8,
    borderColor: 'burlywood',
    borderWidth: 5,
    marginBottom: 16,
  },
  ShowTime: {
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 4,
  },
  ImageContainer: {
    height: 150,
    width: 150,
    marginTop: 8,
    marginBottom: 8,
  },
  SearchField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderColor: 'burlywood',
    borderWidth: 5,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  NoContainer: {
    paddingTop: 16,
    alignItems: 'center',
  },
  NoImage: {
    maxHeight: 150,
    maxWidth: 150,
  },
  NoCredit: {
    fontWeight: '600',
  },
  CheckBox: {
    top: 16,
    right: 16,
    position: 'absolute',
  },
});

export default CSS;
