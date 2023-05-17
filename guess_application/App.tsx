
// import React from 'react';
// import {StatusBar, Text, View} from 'react-native';
// import Navigation from './src/components/Navigation';
// import {AuthProvider} from './src/context/AuthContext';

// const App = () => {
//   return (
//     <AuthProvider>
//       <StatusBar backgroundColor="#06bcee" />
//       <Navigation />
//     </AuthProvider>
//   );
// };

// export default App;
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import Tabs from './src/navigation/tabs';
import { MarketProvider } from './src/context/MarketContext';
import { CategoryProvider } from './src/context/CategoryContext';

const App = () => {
  return (
    <AuthProvider>
      <MarketProvider>
        <CategoryProvider>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
      </CategoryProvider>
      </MarketProvider>
    </AuthProvider>
  );
};

export default App;