import React from 'react'
import {View,Text,Image,TouchableOpacity} from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import Colors from '../constants/Colors'

const StocksCard = ({stock,num}) => {
  return (
    <View
                style={{
                    flexDirection:"row",
                    padding:20,
                    marginHorizontal:20,
                    marginVertical:10,
                    borderRadius:20,
                    alignItems:"center",
                    backgroundColor:"#fff"
                }}
           >
               <View style={{
                   backgroundColor:"#fde6ed",
                   paddingVertical:5,
                   paddingHorizontal:10,
                   borderRadius:6
               }}>
                   <Text style={{
                       fontSize:20,
                   }}>{num+1}</Text>
               </View>
               <View>
                   <Text style={{
                       color:"#345c74",
                       fontFamily:"Poppins-Regular",
                       fontSize:18,
                       paddingLeft:20,
                       width:160
                   }}>
                       {stock.stockName}
                   </Text>
               </View>
               <ProgressCircle
                    percent={stock.stockRatio}
                    radius={20}
                    borderWidth={3}
                    color="#f58084"
                    shadowColor="#FFF"
                    bgColor="#fff2f2"
               >
                   <Text style={{
                   color:"#345c74",
                   fontFamily:"Poppins-Regular",
                   fontSize:15,
               }}>
                   {stock.stockRatio}
               </Text>
               </ProgressCircle>
               <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff2f2',
          marginHorizontal: 17,
          paddingVertical: 14,
          borderRadius: 10,
          
        }}>
       
        <Text
          style={{
            color: '#f58084',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
            paddingHorizontal:10,
            
          }}>
          İşlem yap
        </Text>
        
        
      </TouchableOpacity>
           </View>
  )
}

export default StocksCard