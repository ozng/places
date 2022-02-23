import 'react-native-gesture-handler';
import React from 'react';
import MainNavigator from './src/navigation/MainNavigator'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/inter';

import placesReducer from './store/reducers/places';
import userReducer from './store/reducers/user';
import commentsReducer from './store/reducers/comments';
import categoryReducer from './store/reducers/categories';

const rootReducer = combineReducers({
  places: placesReducer,
  userData: userReducer,
  comments: commentsReducer,
  categories: categoryReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  let [fontsLoaded] = useFonts({
    'montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'barlow-medium': require('./assets/fonts/Barlow-Medium.ttf'),
    'barlow-regular': require('./assets/fonts/Barlow-Regular.ttf'),
    'bitter-light': require('./assets/fonts/Bitter-Light.ttf'),
    'bitter-regular': require('./assets/fonts/Bitter-Regular.ttf'),
  });
  return (
    fontsLoaded
      ? (
        <Provider store={store}>
          <MainNavigator />
        </Provider>
      )
      : (
        <AppLoading
        />
      )
  )
}

export default App;
