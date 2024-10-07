import React from 'react';
import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ImmerseImage = (props: {route: any}) => {
  const {route} = props;
  const photo = route.params.photo;
  return (
    <GestureHandlerRootView>
      <ImageZoom src={photo} isDoubleTapEnabled={true} minPanPointers={1} />
    </GestureHandlerRootView>
  );
};

export default ImmerseImage;
