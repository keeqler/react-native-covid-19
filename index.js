import { registerRootComponent } from 'expo';

import App from './src/app';

if (__DEV__) import('./src/config/reactotron');

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
