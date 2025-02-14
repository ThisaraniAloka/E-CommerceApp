import React, { useState, useRef, useEffect } from "react";
import { 
    View, Text, TouchableOpacity, TextInput, 
    ImageBackground, Image, StyleSheet, Animated, Easing 
} from "react-native";

const AuthScreen = ({ navigation }) => {
    const [formType, setFormType] = useState(null); 
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(200)).current;

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const handleShowForm = (type) => {
        setFormType(type);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
            })
        ]).start();
    };

    return (
        <TouchableOpacity 
            style={styles.background} 
            onPress={() => setFormType(null)}
            activeOpacity={1}
        >
            <ImageBackground source={require('../assets/authScreen.jpg')} style={styles.background}>
                <View style={styles.container}>
                    {/* Title */}
                    <Text style={styles.title}>Welcome to Fashion Hub</Text>
                    <Text style={styles.subtitle}>Discover the best styles</Text>

                    {/* Buttons before clicking */}
                    {formType === null && (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.authButton} 
                                onPress={() => handleShowForm('login')}
                            >
                                <Text style={styles.authButtonText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.authButtonOutline} 
                                onPress={() => handleShowForm('signup')}
                            >
                                <Text style={styles.authButtonOutlineText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Animated Form */}
                    {formType && (
                        <Animated.View 
                            style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
                        >
                            <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
                            <TextInput placeholder="Password" style={styles.input} secureTextEntry />
                            {formType === 'signup' && <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry />}

                            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Home')}>
                                <Text style={styles.authButtonText}>{formType === 'login' ? 'Login' : 'Sign Up'}</Text>
                            </TouchableOpacity>

                            <Text style={styles.orText}>OR</Text>

                            {/* Social Buttons */}
                            <TouchableOpacity style={styles.socialButton}>
                                <Image source={require('../assets/apple.png')} style={styles.socialIcon} />
                                <Text style={styles.buttonText}> Continue With Apple</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialButton}>
                                <Image source={require('../assets/Google.png')} style={styles.socialIcon} />
                                <Text style={styles.buttonText}> Continue With Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialButton}>
                                <Image source={require('../assets/fb.png')} style={styles.socialIcon} />
                                <Text style={styles.buttonText}> Continue With Facebook</Text>
                            </TouchableOpacity>

                            <Text style={styles.guestText}>Or Continue as a guest</Text>
                        </Animated.View>
                    )}
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'rgba(80, 55, 55, 0.7)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#FF935F',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    authButton: {
        backgroundColor: 'orange',
        padding: 15,
        width: '80%',
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: "#DE4800",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    authButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    authButtonOutline: {
        borderWidth: 2,
        borderColor: 'orange',
        padding: 15,
        width: '80%',
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    authButtonOutlineText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
    },
    input: {
        width: '90%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    orText: {
        marginVertical: 10,
        color: 'gray',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 30,
        marginVertical: 5,
        width: '90%',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    socialIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    guestText: {
        marginTop: 10,
        color: 'white',
    },
});

export default AuthScreen;
