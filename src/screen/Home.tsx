import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ToastAndroid,
  TextInput,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CSS from '../Styles/S.Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {database} from '../../store/database';
import Quotes from '../../data/Quotes';
import CheckBox from '@react-native-community/checkbox';

const Home = (props: {navigation: any}) => {
  const {navigation} = props;
  const [CurrentData, setCurrentData] = useState() as any;
  const [Quote, setQuote] = useState({} as any);

  useEffect(() => {
    const FetchedData = database.objects('db');
    const SortedData = FetchedData.sorted('date', true);
    setCurrentData(SortedData as any);
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      const FetchedData = database.objects('db');
      const SortedData = FetchedData.sorted('date', true);
      const CheckedData = SortedData.map(item => {
        item.CheckMark = false;
        return item;
      });
      setCurrentData(CheckedData as any);
      setKnowledge('');
      setQuote(Quotes[Math.floor(Math.random() * Quotes.length)] as any);
    });
  });

  const formatTime = (date: string | number | Date, format: any) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const noteDate = new Date(date);
    const dateOnly = noteDate.getDate();
    const monthOnly = noteDate.getMonth();
    const yearOnly = noteDate.getFullYear();
    const timeOnly = noteDate.toLocaleTimeString('en-GB', {hour12: false});

    if (format === 'date') {
      return `${dateOnly} ${months[monthOnly]} ${yearOnly}`;
    } else if (format === 'time') {
      return timeOnly;
    } else if (format === 'full') {
      return `${dateOnly} ${months[monthOnly]} ${yearOnly} - ${timeOnly}`;
    }
  };

  const [knowledge, setKnowledge] = useState('');

  const FindKnowledge = (value: string) => {
    const FetchedData = database.objects('db');
    const SortedData = FetchedData.sorted('date', true);
    const DiggingThroughKnowledges = SortedData.filter((item: any) => {
      return (
        item.note.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    });

    setCurrentData(DiggingThroughKnowledges as any);
    setKnowledge(value);
  };

  useEffect(() => {
    setQuote(Quotes[Math.floor(Math.random() * Quotes.length)] as any);
  }, []);

  const [editMode, toggleEditMode] = useState(false as Boolean);

  const Checked = (id: any, status: any) => {
    const CheckedData = CurrentData.map(
      (item: {id: any; CheckMark: boolean}) => {
        if (item.id === id) {
          item.CheckMark = !status;
        }
        return item;
      },
    );

    setCurrentData(CheckedData);
  };

  const BegoneNote = () => {
    const checkTrue = [] as any;

    CurrentData.forEach((item: any) => {
      if (item.CheckMark) {
        checkTrue.push(item.id);
      }
    });
    if (checkTrue.length !== 0) {
      database.write(() => {
        for (let i = 0; i < checkTrue.length; i++) {
          const data = database.objects('db').filtered(`id = ${checkTrue[i]}`);
          database.delete(data);
        }
      });

      const FetchedData = database.objects('db').sorted('date', true);
      const SortedData = FetchedData.map(item => {
        item.CheckMark = false;
        return item;
      });
      setCurrentData(SortedData);
      toggleEditMode(false);
    } else {
      ToastAndroid.show('Alright, nothing is removed.', ToastAndroid.SHORT);
      toggleEditMode(false);
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <View style={CSS.headerContainer}>
        <Text style={CSS.headerText}>Notaries</Text>
      </View>
      <FlatList
        style={CSS.FlatListContainer}
        data={CurrentData}
        keyExtractor={item => item.id as string}
        keyboardShouldPersistTaps={'handled'}
        ListHeaderComponent={
          <View style={CSS.SearchField}>
            <Icon name="search" size={24} />
            <TextInput
              placeholder="Search some knowledge here..."
              onChangeText={text => FindKnowledge(text)}
              value={knowledge}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{marginLeft: 6}}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={CSS.NoContainer}>
            <Image source={Quote.image as any} style={CSS.NoImage} />
            <Text>No Notes Found...</Text>
            <Text>{Quote.text}</Text>
            <Text
              style={CSS.NoCredit}
              onPress={() => Linking.openURL(Quote.source)}>
              By {Quote.credit} at Unsplash
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={CSS.ContentContainer}
            onPress={() => navigation.navigate('EditNote', {id: item.id})}
            onLongPress={() => null}>
            <Text style={CSS.ShowTime}>
              {formatTime(item.date as Date, 'full')}
            </Text>
            {item.photo === '' ? null : (
              <TouchableOpacity
                style={CSS.ImageContainer}
                onPress={() =>
                  navigation.navigate('ImmerseImage', {photo: item.photo})
                }
                onLongPress={() =>
                  ToastAndroid.show('Wrong place.', ToastAndroid.SHORT)
                }>
                <Image style={CSS.Image} source={{uri: item.photo as string}} />
              </TouchableOpacity>
            )}
            {item.title === '' ? null : (
              <Text style={[CSS.TitleText, CSS.TextBottomBorder]}>
                {item.title as string}
              </Text>
            )}
            {item.location === '' ? null : (
              <View style={[CSS.TextFieldWithIcon, CSS.TextBottomBorder]}>
                <Icon name="location-on" size={24} />
                <Text>{item.location as string}</Text>
              </View>
            )}
            <Text numberOfLines={3} ellipsizeMode="tail">
              {item.note as string}
            </Text>
            {editMode ? (
              <CheckBox
                style={CSS.CheckBox}
                value={item.CheckMark}
                onValueChange={() => Checked(item.id, item.CheckMark)}
              />
            ) : null}
          </TouchableOpacity>
        )}
      />
      <View>
        {editMode ? (
          <View>
            {/* Affirmitive */}
            <View style={CSS.AddView}>
              <TouchableOpacity
                style={CSS.AddTouchable}
                onPress={() => {
                  BegoneNote();
                }}>
                <Icon name="check" size={24} />
              </TouchableOpacity>
            </View>
            {/* Cancel */}
            <View style={CSS.DeleteView}>
              <TouchableOpacity
                style={CSS.DeleteTouchable}
                onPress={() => {
                  toggleEditMode(!editMode);
                }}>
                <Icon name="cancel" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            {/* Add */}
            <View style={CSS.AddView}>
              <TouchableOpacity
                style={CSS.AddTouchable}
                onPress={() => {
                  navigation.navigate('CreateNote');
                }}>
                <Icon name="add" size={24} />
              </TouchableOpacity>
            </View>
            {/* Delete */}
            <View style={CSS.DeleteView}>
              <TouchableOpacity
                style={CSS.DeleteTouchable}
                onPress={() => {
                  toggleEditMode(!editMode);
                }}>
                <Icon name="edit" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;
