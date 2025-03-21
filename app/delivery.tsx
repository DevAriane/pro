import { useOrders } from "@/contexts/OrderContext";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SafeAreaView,StatusBar,ScrollView ,StyleSheet,View,Text,TouchableOpacity,Image} from "react-native";

function ENC ({delivered}) {
 

    return(<SafeAreaView style={styles.area}>

        <ScrollView showsVerticalScrollIndicator={false}>
      {delivered.map((x) => {
          return (<View style={styles.all}>
            {x.items.map((i) => {
              return (<View style={styles.items}>
                <View style={{width:40,height:40,borderRadius:5,overflow:'hidden'}}><Image source={{ uri: i.imageUrl }} style={{width:"100%",height:"100%",borderRadius:5}}/></View>
                <View style={{flex:1,margin:3}}>
                  <Text style={{fontWeight:"bold"}}>{i.name}</Text>
                  <Text numberOfLines={3} style={{fontSize:12,fontWeight:"bold",color:'gray'}}>{i.description}</Text>
                </View>
                <View>
                  <Text style={{fontWeight:"bold",display:"flex",justifyContent:"flex-end"}}>x{i.nbre}</Text>
                  <Text style={{fontWeight:"bold"}}>${i.montant.toFixed(0)}</Text>
                </View>
              </View>)
            })}
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
              <View style={{borderWidth:1,borderColor:"transparent",backgroundColor:"white",width:40,height:40,borderRadius:5,margin:5,display:"flex",alignItems:"center",justifyContent:"center"}}><Text style={{fontWeight:"bold"}}>${x.pricing.net.toFixed(0)}</Text></View>
             
            </View>
          </View>)
        })}
     
         
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

},);