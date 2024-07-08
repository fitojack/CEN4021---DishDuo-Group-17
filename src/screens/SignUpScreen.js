import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';


export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed In
            const user = userCredential.user;
            console.log('Registered with:', user.email);
            // Navigate to Home Screen
            navigation.navigate('Profile');
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                alert(errorMessage);
            });
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View className="bg-white h-full w-full">
                    <StatusBar style="light" />
                    <Image className="h-full w-full absolute" source={require('../../assets/images/background.png')} />

                    {/* Title and form */}
                    <View className="h-full w-full flex justify-around pt-48">

                        {/* Title */}
                        <View className="flex items-center">
                            <Animated.Text
                                entering={FadeInUp.duration(1000).springify()}
                                className="text-white font-bold tracking-wider text-5xl">Sign Up
                            </Animated.Text>
                        </View>

                        {/* Form */}
                        <View className="flex items-center mx-5 space-y-4">
                            <Animated.View
                                entering={FadeInDown.duration(1000).springify()}
                                className="bg-black/5 p-5 rounded-2xl w-full">

                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor={'gray'}
                                    value={email}
                                    onChangeText={setEmail}
                                    className="text-black"
                                />
                            </Animated.View>
                            <Animated.View
                                entering={FadeInDown.delay(200).duration(1000).springify()}
                                className="bg-black/5 p-5 rounded-2xl w-full mb-3 border border-gray-400">

                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor={'gray'}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                    className="text-black"
                                />
                            </Animated.View>

                            <Animated.View
                                className="w-full"
                                entering={FadeInDown.delay(600).duration(1000).springify()}>

                                <TouchableOpacity onPress={handleSignUp} className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                                    <Text className="text-xl font-bold text-white text-center">Sign Up</Text>
                                </TouchableOpacity>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(800).duration(1000).springify()}
                                className="flex-row justify-center">

                                <Text>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.push('Login')}>
                                    <Text className="text-sky-600">Login</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});