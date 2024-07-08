import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useUser } from '../screens/UserContext';

export default function ProfileScreen() {
    // State to hold selected image URI
    const { user, setUser } = useUser();
    const [name, setName] = useState(user.name);
    const [image, setImage] = useState(null);
    const navigation = useNavigation();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            setUser({ ...user, profilePicture: result.uri });
        }
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigation.replace('Login');
        }).catch((error) => {
            console.error(error);
            alert(error.message);
        });
    };

    const handleSaveProfile = () => {
        setUser({ name, profilePicture: image });
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <View style={styles.profileContainer}>

                {/* Profile Image */}
                <Image source={image ? { uri: image } : require('../../assets/images/profile-placeholder.png')} style={styles.profileImage} />

                {/* Change Photo Button */}
                <TouchableOpacity onPress={pickImage} style={styles.changePhotoButton}>
                    <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>

                {/* User Name */}
                <Text style={styles.userName}>{name}</Text>

                {/* Save Profile Button */}
                <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                    <Text style={styles.buttonText}>Save Profile</Text>
                </TouchableOpacity>

                {/* Discover Recipes Button */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Discover Recipes</Text>
                </TouchableOpacity>

                {/* My Recipe Button */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyRecipes')}>
                    <Text style={styles.buttonText}>My Recipes</Text>
                </TouchableOpacity>

                {/* Dietary Filter Button */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DietaryFilterSettings')}>
                    <Text style={styles.buttonText}>Dietary Filter Settings</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    changePhotoButton: {
        marginBottom: 20,
    },
    changePhotoText: {
        color: '#1E90FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#1E90FF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
