import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
const AccountScreen = () => {
    const navigation = useNavigation(); 

    const [darkMode, setDarkMode] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');

useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedMode = await AsyncStorage.getItem('darkMode');
            const savedPic = await AsyncStorage.getItem('profilePic');
            setDarkMode(savedMode === 'true');
            if (savedPic) setProfilePic(savedPic);
        } catch (error) {
            console.log('Error loading settings', error);
        }
    };

    const toggleDarkMode = async () => {
        setDarkMode(!darkMode);
        await AsyncStorage.setItem('darkMode', JSON.stringify(!darkMode));
    };

    const pickImage = () => {
        launchImageLibrary({}, (response) => {
            if (response.assets && response.assets.length > 0) {
                setProfilePic(response.assets[0].uri);
                AsyncStorage.setItem('profilePic', response.assets[0].uri);
            }
        });
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: darkMode ? '#222' : '#fff', padding: 20 }}>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={profilePic ? { uri: profilePic } : require('../assets/default-avatar.jpg')} 
                           style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />
                    <Icon name="camera" size={24} color="gray" style={{ position: 'absolute', bottom: 10, right: 10 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: darkMode ? '#fff' : '#000' }}>{name}</Text>
                <Text style={{ color: 'gray' }}>{email}</Text>
            </View>
            
            <View style={{ marginTop: 20 }}>
                <Text style={{ color: darkMode ? '#fff' : '#000', fontSize: 18, fontWeight: 'bold' }}>Settings</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ color: darkMode ? '#fff' : '#000' }}>Dark Mode</Text>
                    <Switch value={darkMode} onValueChange={toggleDarkMode} />
                </View>
            </View>

            <TouchableOpacity style={{ backgroundColor: '#9F3400', padding: 10, borderRadius: 5, marginTop: 20 }} onPress={() => Alert.alert('Logged Out!')}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AccountScreen;
