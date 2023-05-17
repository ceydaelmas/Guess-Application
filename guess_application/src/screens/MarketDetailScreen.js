import React from 'react'
import { Text } from 'react-native-elements'
import { ScrollView, TouchableOpacity ,View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';


const MarketDetailScreen = ({navigation}) => {
  return (
    <ScrollView>
    
      <View
        style={{
          padding:20,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
              <TouchableOpacity
            onPress={() => navigation.goBack()}>
           <Ionicons
              name="ios-arrow-back-sharp"
              color="#1D267D"
              size={10 * 3}
            />
          </TouchableOpacity>
          </View>
  </View>
      
    </ScrollView>
  
  )
}

export default MarketDetailScreen