import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Chip } from 'react-native-paper';
type ChipGroupProps = {
  setOption: (goal: string) => void;
    option: string;
    options: string[];
    title:string;



}
const ChipGroup = ({option,setOption,options,title}:ChipGroupProps) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chipContainer}>

      {options.map((op)=>(
        <Chip
        key={op}
        onPress={()=>setOption(op)}
        selected={op===option}
        style={[styles.chip, op === option && styles.chipSelected]}
        textStyle={styles.chipText}


        >
            {op}

        </Chip>
        
        

))}
</View>
</View>
);
};

const styles = StyleSheet.create({
    title: {
      color: '#ffffff',
      fontSize: 18,
      marginVertical: 8,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 8,
    },
    chip: {
      margin: 4,
      backgroundColor: '#333',
    },
    chipSelected: {
      backgroundColor: '#4b91e2',
    },
    chipText: {
      color: '#fff',
    },
  });

export default ChipGroup