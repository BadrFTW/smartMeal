import { View, Text, Alert,SafeAreaView,TouchableOpacity,ScrollView ,StyleSheet} from 'react-native'
import React, { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Collapsible from 'react-native-collapsible'
import Markdown from 'react-native-markdown-display'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'



const MealPlansHistory = () => {

    const [mealPlan,setMealPlan]=useState([])
    const navigation = useNavigation();
    const [activeSections, setActiveSections] = useState([]);

    const toggleSection = (index) => {
        setActiveSections((prevSections) =>
          prevSections.includes(index)
            ? prevSections.filter((i) => i !== index)
            : [...prevSections, index]
        );
      };
    const getMealPlans = async ()=>{
        try {
            const storedMealPlans = await AsyncStorage.getItem("mealPlans");
            const mealPlans =storedMealPlans? JSON.parse(storedMealPlans):[];
            setMealPlan(mealPlans);
    
            
        } catch (error) {
            console.log(error)
        }
    
    
    
    
    }
    const deletePlan=(index)=>
    {

        Alert.alert(
            "delete meal Plan ",
            "are you sur you want to delete this ?",
            [
                {
                    text:"cancel",
                    style:"cancel"
                
                },
                {
                    text :'ok',
                    style: "destructive",
                    onPress:async ()=>{
                        try {
                         const updatedMealPlan= mealPlan.filter((_,i)=>(i !== index)) ;
                         await AsyncStorage.setItem("mealPlans",JSON.stringify(updatedMealPlan))
                         setMealPlan(updatedMealPlan)
                            
                        } catch (error) {
                            console.log(error)
                            
                        }
                       



                    }


                }
            ]

        )


    }
    useFocusEffect(
        useCallback(()=>{

            getMealPlans();



        },[])
    )
  return (
    <SafeAreaView style={styles.container}>
        
    <TouchableOpacity style={{ padding: 15 }} onPress={navigation.goBack}>
      <Ionicons name="arrow-back-circle-outline" color={"white"} size={30} />
    </TouchableOpacity>
    <ScrollView style={{ padding: 20 }}>
      {mealPlan.length === 0 ? (
        <Text style={styles.noPlansText}>No meal Plans available!</Text>
      ) : (
        mealPlan.map((plan, index) => (
          <View key={index} style={styles.planContainer}>
            <View style={styles.planContainer}>
              <View style={styles.planTitleContainer}>
                <TouchableOpacity
                  onPress={() => toggleSection(index)}
                  style={styles.planTitleTextContainer}
                >
                  <Text style={styles.planTitle}>
                    {`Morphology:${plan.metabolism}, Height:${plan.height}, Age:${plan.age}, Gender:${plan.gender}`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deletePlan(index)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-bin-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
              < Collapsible collapsed={!activeSections.includes(index)}>
                <Markdown>{plan.text}</Markdown>
              </ Collapsible>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1E1E1E",
      marginTop:30
    },
    noPlansText: {
      color: "white",
      textAlign: "center",
      marginTop: 20,
      fontSize: 18,
    },
    planContainer: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 15,
      marginVertical: 10,
    },
    planTitleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 8,
    },
    planTitleTextContainer: {
      flex: 1,
    },
    planTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
    deleteButton: {
      marginLeft: 10,
    },
    planText: {
      fontSize: 14,
      marginTop: 10,
    },
  });
export default MealPlansHistory