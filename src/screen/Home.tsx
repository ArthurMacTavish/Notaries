import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CSS from '../Styles/S.Home';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = (props: {navigation: any}) => {
  const {navigation} = props;
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <View style={CSS.headerContainer}>
        <Text style={CSS.headerText}>Notaries</Text>
      </View>
      <View style={CSS.AddView}>
        <TouchableOpacity
          style={CSS.AddTouchable}
          onPress={() => {
            navigation.navigate('CreateNote');
          }}>
          <Icon name="add" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
