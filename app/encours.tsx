import { useOrders } from "@/contexts/OrderContext";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SafeAreaView,StatusBar,ScrollView ,StyleSheet,View,Text,TouchableOpacity} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, router } from 'expo-router';

function ENC ({encours}) {
   const Direction = (x) => {
     console.log("x.id", x.id);
     router.push(`/delivery/${x.id}`);
   }
    return(<SafeAreaView style={styles.area}>

        <ScrollView showsVerticalScrollIndicator={false}>

        {
          encours.map((x) => {
            return (<>
               <View style={styles.c}>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 5, justifyContent: 'space-around' }}>
                  <View><Text>#ORDR00001</Text></View>
                  <View><Text style={{ color: 'green' }}>Available</Text></View>
                </View>
                <View style={styles.vie}>
                <View>
                  <Text>{x.items.quantity}X   {x.items.name}</Text>
                  <Text></Text>
                  
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => Direction(x)}>
                      <AntDesign name="rightcircle" size={24} color="yellow" />
                    </TouchableOpacity>
                  </View>
                </View>
                </View>
            
            </>)
          })
        } 
     
         
        </ScrollView>
    
    
      </SafeAreaView>)
}

export default ENC;
const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  containt: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 50,
    // borderWidth:1,
    // borderColor:'transparent',
    backgroundColor: 'whitesmoke',
  },
  header: {
    width: '100%',
    position: 'fixed',
    height: 120,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'green',
    color: 'white',
    alignItems: 'center',
  },
  vie: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  c: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 15,
  },
  av: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'space-around',
    margin: 10,
  }

});