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
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import Tabs from './src/navigation/tabs';
import {MarketProvider} from './src/context/MarketContext';
import {CategoryProvider} from './src/context/CategoryContext';
import {UserProvider} from './src/context/UserContext';
import {NotificationProvider} from './src/context/NotificationContext';
import {FavoritesProvider} from './src/context/FavoritesContext';
import { TransactionProvider } from './src/context/TransactionContext';

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
          <MarketProvider>
            <FavoritesProvider>
              <CategoryProvider>
                <TransactionProvider>
                <StatusBar backgroundColor="#06bcee" />
                <Navigation />
                </TransactionProvider>
              </CategoryProvider>
            </FavoritesProvider>
          </MarketProvider>
        </NotificationProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
