import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, TextInput, ScrollView, Button, SafeAreaView, Animated, Easing } from 'react-native';
import { Link } from 'expo-router';
import { firebase } from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

function SplashScreen() {
    const router = useRouter();

    const logoScale = new Animated.Value(0);

    useEffect((() => {

        const loadApp = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 8000))
                router.replace('/onboarding');
            } catch (error) {

            }
        };

        Animated.timing(logoScale, {
            toValue: 1,
            duration: 7000,
            easing: Easing.ease,
            useNativeDriver: true
        }).start()

        loadApp();
    }), []);

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.containt}>
                <Animated.View style={[styles.vie, {transform:[{scale:logoScale}]}]}>
                    <Image source={require('../assets/images/image.png')} resizeMode='contain' style={{ width: 200, height: 200 }} />
                </Animated.View>
             
            </View>
        </SafeAreaView>
    );
}
export default SplashScreen;
const styles = StyleSheet.create({
    area: {
        flex: 1,
    },
    containt: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: 'whitesmoke',
        margin: 5,
    },
    vie: {
        marginVertical: 'auto',
        marginHorizontal: 'auto',

    },
});