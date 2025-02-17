import { View, Text, Dimensions ,TouchableOpacity,ScrollView,SafeAreaView,StyleSheet,ActivityIndicator,} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useNavigation } from 'expo-router'
import MetabolismCarousel from '@/components/MetabolismCarousel'
import ChipGroup from '@/components/ChipGroup'
import CostumInput from '@/components/CostumInput'
import { Ionicons } from '@expo/vector-icons'
import Markdown from 'react-native-markdown-display'
import AsyncStorage from '@react-native-async-storage/async-storage'
const MealPrep = () => {
    const apiKeys = 'AIzaSyC9OH_mw4N327ZljXvz8e2nj-LDO03Wul4'
  
    const genAi = new GoogleGenerativeAI(apiKeys);
    const model =genAi.getGenerativeModel({model:"gemini-1.5-flash"});

    const {width:viewportWidth} = Dimensions.get('window');

    const [metabolism, setMetabolism] = useState("");
    const [goal, setGoal] = useState("");
    const [height,setHeight]=useState("");
    const [age,setAge]=useState("");
    const [weight,setWeight]=useState("");
    const [gender,setGender]=useState("");
    const [language,setLanguage]=useState("");
    const [text,setText]=useState("");

    const sliderWidth = viewportWidth;
    const itemWidth = sliderWidth * 0.75;
    const navigation = useNavigation();
    const carouselRef = useRef(null);

    const [loading,setLoading]=useState(false);
     const [error, setError] = useState<Error | undefined>(undefined);

    const metabolisms =[
        {type:"Endomorph",image:require("../assets/images/endo.png")},
        {type:"Mesomorph",image:require("../assets/images/meso.png")},
        {type:"Ectomorph",image:require("../assets/images/ecto.png")},
    ]
   

    const fetchGeminiText = async(prompt:string)=>{
        setLoading(true);
        try {
            const result = await model.generateContent(prompt);
            const response =  result.response;
            const text =  response.text();
           
            setText(text);
            await saveMealPlan({
              goal,
              age,
              height,
              weight,
              metabolism,
              language,
              gender,
              text,




            })

            
        } catch (error) {
          setError(error as Error)
          
            
        }finally{
            setLoading(false)


        }

    }

    

    const handleGenerateMealPlan = () => {
        const prompt = `Generate a meal plan for a ${gender} with the following details:
        Metabolism: ${metabolism}
        Goal: ${goal}
        Height: ${height}
        Age: ${age}
        Current Weight: ${weight}
        Provide meal preparation instructions with total and per meal calorie count in ${language}.`;
        fetchGeminiText(prompt);
      };



      const saveMealPlan = async (mealplan)=>
      {
        try {
          const storedMeals = await AsyncStorage.getItem('mealPlans');
          const mealPlans:[] =  storedMeals ? JSON.parse(storedMeals):[];
          mealPlans.push(mealplan);
          await AsyncStorage.setItem('mealPlans' ,JSON.stringify(mealPlans));

        } catch (error) {
          console.log(error)
        }
      }
      return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={{ padding: 15 }} onPress={navigation.goBack}>
            <Ionicons name="arrow-back-circle-outline" color={"white"} size={30} />
          </TouchableOpacity>
          <ScrollView style={{ padding: 20 }}>
            <MetabolismCarousel
              metabolisms={metabolisms}
              metabolism={metabolism}
              setMetabolism={setMetabolism}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
            <ChipGroup
              title="Goal"
              options={["Cutting", "Bulking", "Maintain weight"]}
              option={goal}
              
              setOption={setGoal}
            />
            <CostumInput
              label="Height (cm)"
              value={height}
              setValue={setHeight}
              placeHolder="Height (cm)"
              
              keyboard="numeric"
            />
            <CostumInput
              label="Age"
              value={age}
              setValue={setAge}
              placeHolder="Age"
              keyboard="numeric"
            />
            <CostumInput
              label="Current Weight (kg)"
              value={weight}
              setValue={setWeight}
              placeHolder="Current Weight (kg)"
              keyboard="numeric"
            />
            <ChipGroup
              title="Gender"
              options={["Male", "Female"]}
              option={gender}
              setOption={setGender}
            />
            <ChipGroup
              title="Language"
              options={["English", "French", "German"]}
              option={language}
              setOption={setLanguage}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleGenerateMealPlan}
            >
              <Text style={styles.buttonText}>Generate Meal Plan</Text>
            </TouchableOpacity>

            
            {loading && (
              <ActivityIndicator
                size="large"
                color="#6200ee"
                style={styles.loading}
              />
            )}
            {error && <Text style={styles.error}>{error.message}</Text>}
            {text && (
              <View style={styles.markdownContainer}>
                <Markdown>{text}</Markdown>
                
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
        marginTop:22
      },
      button: {
        backgroundColor: "#4b91e2",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 20,
      },
      buttonText: {
        color: "#fff",
        fontSize: 18,
      },
      loading: {
        marginVertical: 20,
      },
      error: {
        color: "red",
        marginVertical: 20,
      },
      markdownContainer: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 15,
        marginVertical: 20,
      },
    });
export default MealPrep