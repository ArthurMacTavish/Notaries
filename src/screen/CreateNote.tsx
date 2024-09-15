/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import CSS from '../Styles/S.CreateNote';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {database} from '../../store/database';

const CreateNote = (props: {navigation: any}) => {
  const {navigation} = props;
  const CurrentData = database.objects('db');

  const DataUpdater = (variable: string, content: string) => {
    setNoteData({
      ...noteData,
      [variable]: content,
    });
  };

  const [noteData, setNoteData] = useState({
    title: '',
    location: '',
    photo: '',
    note: '',
  });

  const [ToastCounter, PBnJ] = useState(0);

  const addImage = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then(image => {
        DataUpdater('photo', image.path);
        ToastAndroid.show(
          'Did you know? Press and hold the frame to remove the image.',
          ToastAndroid.LONG,
        );
        PBnJ(0);
      })
      .catch(() =>
        ToastAndroid.show(
          'Uh oh... Choose a picture or just ignore it. Picture is optional anyway.',
          ToastAndroid.LONG,
        ),
      );
  };

  const Toasted = () => {
    if (noteData.photo !== '') {
      DataUpdater('photo', '');
      ToastAndroid.show("Poof, it's gone!", ToastAndroid.SHORT);
    } else if (ToastCounter === 0) {
      ToastAndroid.show(
        'Nothing is here, add a picture :)',
        ToastAndroid.SHORT,
      );
      PBnJ(ToastCounter + 1);
    } else if (ToastCounter === 1) {
      ToastAndroid.show('Please Stop. Nothing inside.', ToastAndroid.SHORT);
      PBnJ(ToastCounter + 1);
    } else if (ToastCounter === 2) {
      ToastAndroid.show('Just Stop. Can you read me?', ToastAndroid.SHORT);
      PBnJ(ToastCounter + 1);
    } else if (ToastCounter === 3) {
      ToastAndroid.show("Don't make me mad.", ToastAndroid.SHORT);
      PBnJ(ToastCounter + 1);
    } else if (ToastCounter === 4) {
      ToastAndroid.show('You know what, you win.', ToastAndroid.SHORT);
      PBnJ(ToastCounter + 1);
    } else if (ToastCounter === 5) {
      ToastAndroid.show("You win, what's the point!?", ToastAndroid.SHORT);
    }
  };

  const SaveNote = () => {
    if (noteData.note === '') {
      Alert.alert('No Note?', 'Please add note. Everything else is optional.');
    } else {
      const lastID =
        CurrentData.length === 0 ? -1 : CurrentData[CurrentData.length - 1].id;
      database.write(() => {
        database.create('db', {
          id: lastID + 1,
          ...noteData,
          date: new Date().toISOString(),
        });
      });
      ToastAndroid.show('Entry Created!', ToastAndroid.SHORT);
      navigation.navigate('Home');
      console.log(CurrentData);
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <View style={CSS.headerContainer}>
        <Text style={CSS.headerText}>Create Note</Text>
      </View>
      <View style={CSS.ContentContainer}>
        <TouchableOpacity
          onPress={() => addImage()}
          onLongPress={() => Toasted()}>
          <Image
            style={CSS.Image}
            source={
              noteData.photo === ''
                ? require('../../assets/images/addImagePlaceholder.png')
                : {uri: noteData.photo}
            }
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Title here, make things precious."
          multiline={true}
          style={[CSS.TitleText, CSS.TextBottomBorder]}
          onChangeText={Text => DataUpdater('title', Text)}
        />
        <View style={[CSS.TextFieldWithIcon, CSS.TextBottomBorder]}>
          <Icon name="location-on" size={24} />
          <TextInput
            placeholder="Location: Unknown. So put it here."
            multiline={true}
            onChangeText={Text => DataUpdater('location', Text)}
          />
        </View>
        <TextInput
          placeholder="Everything might be optional, but not this one. Start your journey here!"
          multiline={true}
          onChangeText={Text => DataUpdater('note', Text)}
        />
      </View>
      <View style={CSS.AddView}>
        <TouchableOpacity style={CSS.AddTouchable} onPress={() => SaveNote()}>
          <Icon name="check" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateNote;
