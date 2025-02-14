import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

const FashionScreen = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false }); 
    }, [navigation]);

    return (
        <ImageBackground source={require('../assets/firstpage.jpg')} style={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.fashionText}>
                    <Text style={styles.fas}>FAS</Text>
                    <Text style={styles.hion}>HION</Text>
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AuthScreen')}>
                    <Text style={styles.buttonText}>Let's Get Started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 200,
        alignItems: 'center',
    },
    fashionText: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    fas: {
        color: 'white',
    },
    hion: {
        color: 'orange',
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300,
        width:250,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange',
    },
});

export default FashionScreen;
