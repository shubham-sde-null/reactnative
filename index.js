/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {storeRedux, persistorRedux} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
const AppRedux = () => (
  <Provider store={storeRedux}>
    <PersistGate loading={null} persistor={persistorRedux}>
      <App />
    </PersistGate>
  </Provider>
);
AppRegistry.registerComponent(appName, () => AppRedux);
