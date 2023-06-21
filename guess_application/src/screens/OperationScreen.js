import React, { useState } from 'react';
import { TouchableOpacity, View, Modal, Dimensions, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import { useTransaction } from '../context/TransactionContext';
import { useMarket } from '../context/MarketContext';

const deviceHeight = Dimensions.get('window').height;

const OperationScreen = ({ stock, market, setMarket ,show, onHide }) => {
  const [value, setValue] = useState(1);
  const [totalCoin, setTotalCoin] = useState(parseFloat(stock.stockPrice).toFixed(0));
  const [loading, setLoading] = useState(false);
  const {fetchMarketById} = useMarket();

  const { makeTransaction } = useTransaction();

  const makeTransactionHandler = async () => {
    try {
      setLoading(true);
      const response = await makeTransaction(market.marketId, stock.id, value);
      Alert.alert('Transaction Successful', response.message);
      
      const updatedMarket = await fetchMarketById(market.marketId);
      setMarket(updatedMarket); // market state'ini güncelle

      onHide();
    } catch (error) {
      Alert.alert('Transaction Failed', error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={show}
      onRequestClose={onHide}
    >
      <View style={{ flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end' }}>
        <TouchableWithoutFeedback onPress={onHide}>
          <View style={{ flex: 1, width: '100%' }} />
        </TouchableWithoutFeedback>
        <View style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          paddingHorizontal: 10,
          maxHeight: deviceHeight * 0.4
        }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff2f2',
                marginTop: 15,
                marginBottom: 20,
                marginHorizontal: 20,
                borderRadius: 20,
                paddingVertical: 8,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  color: '#345c74',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                }}
              >
                İşlem Yapılacak Senet: <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#345c74' }}>{stock.stockName}</Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 0,
                marginBottom: 20,
                marginHorizontal: 20,
                borderRadius: 20,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  color: '#345c74',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                  margin: 10,
                  marginRight: 55,
                }}
              >
                Senet Sayısı:
              </Text>
              <NumericInput
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  setTotalCoin((newValue * parseFloat(stock.stockPrice)).toFixed(0));
                }}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                minValue={1}
                totalWidth={150}
                totalHeight={40}
                iconSize={80}
                step={1}
                valueType='real'
                rounded
                textColor='#345c74'
                
                iconStyle={{ color: '#345c74', fontWeight: 'bold'}}
                rightButtonBackgroundColor='#fff2f2'
                leftButtonBackgroundColor='#fff2f2'
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 0,
                marginBottom: 20,
                marginHorizontal: 20,
                borderRadius: 20,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  color: '#345c74',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                  margin: 10,
                  marginRight: 55,
                }}
              >
                Toplam Tutar:
              </Text>
              <Text
                style={{
                  color: '#345c74',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                  margin: 10,
                  marginRight: 55,
                }}
              >
                {totalCoin} coin
              </Text>
            </View>

            <TouchableOpacity
              onPress={makeTransactionHandler}
              style={{
                backgroundColor: '#fff2f2',
                width: 130,
                marginTop: 0,
                marginBottom: 20,
                marginHorizontal: 130,
                paddingVertical: 14,
                borderRadius: 10,
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#345c74" />
              ) : (
                <Text
                  style={{
                    color: '#345c74',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 16,
                    paddingHorizontal: 10,
                    alignSelf: 'center',
                  }}
                >
                  İşlem Yap
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OperationScreen;
