import { Image, StyleSheet, Platform,SafeAreaView, View,Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
   <SafeAreaView>
    <View>
      <Text>Hello world!!!</Text>
    </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
