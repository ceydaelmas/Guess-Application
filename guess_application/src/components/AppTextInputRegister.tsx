import {
    TextInput,
    TextInputProps,
  } from "react-native";
  import React, { useState } from "react";
  import Colors from "../constants/Colors";
  import FontSize from "../constants/FontSize";
  import Spacing from "../constants/Spacing";
  
  const AppTextInputRegister: React.FC<TextInputProps> = ({ ...otherProps }) => {
    const [focused, setFocused] = useState<boolean>(false);
    return (
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        style={[
          {
            fontFamily: 'Poppins-Regular',
            fontSize: FontSize.small,
            padding: Spacing*1.5 ,
            backgroundColor: Colors.lightPrimary,
            borderRadius: Spacing,
            marginTop:10,
          },
          focused && {
            borderWidth: 2,
            borderColor: Colors.primary,
            shadowOffset: { width: 4, height: Spacing },
            shadowColor: Colors.primary,
            shadowOpacity: 0.2,
            elevation:12,
            shadowRadius: Spacing,
          },
        ]}
        {...otherProps}
      />
    );
  };
  
  export default AppTextInputRegister;
  
