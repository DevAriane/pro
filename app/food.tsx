import { Image, StyleSheet, Platform,Text,TouchableOpacity,View,TextInput,ScrollView,Button } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
// import RangeSlider, { Slider } from 'react-native-range-slider-expo';
function Food(){
    
    const router=useRouter();
    const {id, image, titre,menu,prix ,commentaire,price} = useLocalSearchParams();
    const [m,setM]=useState(null);
   
const [count,setCount]=useState(0);
const add=()=>{
setCount(count+1);
}
const subst=()=>{
    setCount(count-1);
}
const [fromValue, setFromValue] = useState(0);
const [toValue, setToValue] = useState(0);
const [value, setValue] = useState(0);
// const [fromValue, setFromValue] = useState(0);
// const [toValue, setToValue] = useState(0);
// const [value, setValue] = useState(0);

useEffect((()=>{
    console.log('prix',prix);
    console.log('count',count);
    console.log('m',m);
    let b=prix*count;
 setM(b);
}),[count]);


    return(
    <SafeAreaView style={styles.area}>
        <StatusBar backgroundColor='green' style='light' />
        <View style={styles.containt}>
       
         
        <View  style={{position:'fixed',width:'100%', display:'flex',flexDirection:'row',alignItems:'center' ,height:100, backgroundColor:'green',}}>
      <Link href='/(tabs)'>  <AntDesign name="left" size={24} color="white" /></Link>
        <Text style={{color:'white',fontSize:20,marginLeft:100}}>Food Details</Text>
      </View>
      
      <ScrollView>
      <View ><Image source={image} style={{width:400,height:200}} resizeMode="contain"/></View>
<View style={{display:'flex',justifyContent:'flex-start'    ,margin:10}}>
      <Text style={{fontSize:18,fontWeight:'bold'}}>{titre}</Text>
      <View style={{display:'flex',flexDirection:'row', alignItems:'center',backgroundColor:'white',width:300}}>
      <FontAwesome name="star" size={15} color="yellow" />
      <FontAwesome name="star" size={15} color="yellow" />
      <FontAwesome name="star" size={15} color="yellow" />
      <FontAwesome name="star" size={15} color="yellow" />
      <FontAwesome name="star-half-full" size={15} color="yellow" />
    
      <Text style={{color:'gray'}}>4,5(89 reviews)</Text>
      </View>
    <View>
      <Text style={{color:'green',fontWeight:'bold',fontSize:18}}>${prix} <Text style={{textDecorationLine:'line-through',color:'gray',fontSize:16}}>{price}FRCFA</Text></Text>
      </View>
      </View>
      <View style={{margin:10}}>
        <Text>
            {commentaire}
        </Text>
       
      </View>
      <View>
        <View style={{display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'space-around'}}>
        <View><Text>Spicy</Text></View>
        <View><Text>Quantity</Text></View>
        </View>
        <View style={{backgroundColor:'whitesmoke',display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'space-around',margin:8,height:50}}>
        <View style={{display:'flex',flexDirection:'row', alignItems:'center'}}>
        <View>
                    {/* <RangeSlider 
                    min={5} max={25}
                         fromValueOnChange={value => setFromValue(value)}
                         toValueOnChange={value => setToValue(value)}
                         initialFromValue={11}
                    />
                    <Text>from value:  {fromValue}</Text>
                    <Text>to value:  {toValue}</Text>
               </View>
               <View>
                    <Slider min={0} max={40} step={4}
                         valueOnChange={value => setValue(value)}
                         initialValue={12}
                         knobColor='red'
                         valueLabelsBackgroundColor='black'
                         inRangeBarColor='purple'
                         outOfRangeBarColor='orange'
                    /> */}
                    {/* <Text>value:  {value}</Text> */}
               </View>
            <View> <Text style={{color:'green'}}>Mild</Text></View>
            <View><Text style={{color:'red',marginLeft:30}}>Hot</Text></View> 
        </View>
        
        <View style={{display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
         <View> <Text style={{fontSize:20,color:'green',borderWidth:1,borderColor:'green',borderRadius:5,width:30,height:30,backgroundColor:'white',textAlign:'center'}} onPress={()=>subst()}>-</Text></View>
         <View> <Text style={{fontWeight:'black'}}>{count}</Text></View>
         <View> <Text style={{fontSize:20,color:'white',borderWidth:1,borderColor:'green',borderRadius:5,width:30,height:30,backgroundColor:'green',textAlign:'center'}} onPress={()=>add()}>+</Text></View>
          </View>
      </View>
      </View>
      <View style={{display:'flex',flexDirection:'row', alignItems:'center',backgroundColor:'white',justifyContent:'space-around',margin:8}}>
       <View> <Text style={{color:'green',borderColor:'green',borderWidth:1,borderRadius:5,backgroundColor:'white',width:80,padding:5,height:50,textAlign:'center',fontWeight:'800'}}>${m}</Text></View>
        <View> <Text style={{color:'white',borderColor:'transparent',borderWidth:1,borderRadius:5,backgroundColor:'green',width:200,padding:5,height:50,textAlign:'center',fontWeight:'800'}}>Add to court</Text></View>
      </View>
      </ScrollView>
        </View>
    </SafeAreaView>    
    );
}

export default Food;
const styles=StyleSheet.create({
    area:{
      flex:1,
    },
    containt:{
     
            flex:1,
      justifyContent:'space-between',
     
      backgroundColor:'white',
    },
    header:{
      width:'100%',
      position:'fixed',
      height:90,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      backgroundColor:'green',
      color:'white',
      alignItems:'center',
    },
   gid:{
    display:'flex',
    flexDirection:'row'
    
   }
  });