import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet, Platform } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';;
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed In
            const user = userCredential.user;
            console.log('Logged in with:', user.email);
            // Navigate to Home Screen
            navigation.navigate('Home');
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
                    <View className="h-full w-full flex justify-around pt-40 pb-10">

                        {/* Title */}
                        <View className="flex items-center">
                            <Animated.Text
                                entering={FadeInUp.duration(1000).springify()}
                                className="text-white font-bold tracking-wider text-5xl">
                                Login
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
                                    style={styles.input}
                                />
                            </Animated.View>
                            <Animated.View
                                entering={FadeInDown.delay(200).duration(1000).springify()}
                                className="bg-black/5 p-5 rounded-2xl w-full mb-3">

                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor={'gray'}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                    className="text-black"
                                    style={styles.input}
                                />
                            </Animated.View>

                            <Animated.View
                                className="w-full"
                                entering={FadeInDown.delay(400).duration(1000).springify()}>

                                <TouchableOpacity onPress={handleLogin} className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                                    <Text className="text-xl font-bold text-white text-center">Login</Text>
                                </TouchableOpacity>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(600).duration(1000).springify()}
                                className="flex-row justify-center">

                                <Text>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text className="text-sky-600">Sign Up</Text>
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