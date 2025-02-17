import { View, Text ,TextInput,StyleSheet} from 'react-native'
import React from 'react'

type CostumInputProps ={
    placeHolder:string;
    label:string;
    setValue:(value:string)=>void;
    value:string;
    keyboard?: "default" | "numeric" | "email-address" | "ascii-capable" | "numbers-and-punctuation" | "url" | "number-pad" | "phone-pad" | "name-phone-pad" | "decimal-pad" | "twitter" ;


}
const CostumInput = ({placeHolder,label,setValue,value,keyboard ="default"}:CostumInputProps) => {
  return (
    <>
        
    <Text style={styles.label}>{label}</Text>
      <TextInput 
      placeholder={placeHolder}
      onChangeText={(e)=>{setValue(e)}}
      keyboardType={keyboard}
      value={value}
      placeholderTextColor="#999"
      style={styles.input}





      />
    </>
  )
}
const styles = StyleSheet.create({
    label: {
      color: '#ffffff',
      fontSize: 16,
      marginTop: 16,
      marginBottom: 8,
    },
    input: {
      backgroundColor: '#333',
      color: '#fff',
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginVertical: 8,
      borderRadius: 8,
    },
  });

export default CostumInput