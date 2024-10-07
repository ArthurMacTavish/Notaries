/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import CSS from '../Styles/S.CreateNote'; //Same Codebase (with slight modifications) hence the same Styling.
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {database} from '../../store/database';

const EditNote = (props: {route: any; navigation: any}) => {
  const {route, navigation} = props;
  const id = route.params.id;
  const CurrentData = database.objects('db').filtered(`id = ${id}`)[0] as any;

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

  useEffect(() => {
    setNoteData({
      title: CurrentData.title,
      location: CurrentData.location,
      photo: CurrentData.photo,
      note: CurrentData.note,
    });
  }, [
    CurrentData.title,
    CurrentData.location,
    CurrentData.photo,
    CurrentData.note,
  ]);

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
      database.write(() => {
        CurrentData.date = new Date().toISOString();
        CurrentData.title = noteData.title;
        CurrentData.photo = noteData.photo;
        CurrentData.location = noteData.location;
        CurrentData.note = noteData.note;
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
        <Text style={CSS.headerText}>Edit Note</Text>
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
          defaultValue={noteData.title}
        />
        <View style={[CSS.TextFieldWithIcon, CSS.TextBottomBorder]}>
          <Icon name="location-on" size={24} />
          <TextInput
            placeholder="Location: Unknown. So put it here."
            multiline={true}
            onChangeText={Text => DataUpdater('location', Text)}
            defaultValue={noteData.location}
          />
        </View>
        <TextInput
          placeholder="Everything might be optional, but not this one. Start your journey here!"
          multiline={true}
          onChangeText={Text => DataUpdater('note', Text)}
          defaultValue={noteData.note}
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

export default EditNote;
