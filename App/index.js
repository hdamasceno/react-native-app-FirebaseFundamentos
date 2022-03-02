/**
 * @format
 */

import {AppRegistry} from 'react-native';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
