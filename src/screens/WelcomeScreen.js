import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    // Initizialize ring padding values.
    ring1padding.value = 0;
    ring2padding.value = 0;

    // Animate rings with delay.
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100);
    setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 300);

    // Navigate to LoginScreen after 2.5 seconds.
    setTimeout(() => navigation.navigate('Login'), 2500);
  }, [navigation, ring1padding, ring2padding]);
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-blue-300">
      <StatusBar style="light" />

      {/* Logo image with rings */}
      <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring2padding }}>
        <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring1padding }}>
          <Image source={require('../../assets/images/welcome.png')}
            style={{ width: hp(20), height: hp(20) }} />
        </Animated.View>
      </Animated.View>

      {/* Title and punchline */}
      <View className="flex items-center space-y-2">
        <Text style={{ fontSize: hp(7) }} className="font-bold text-white tracking-widest">
          Dish<Text className="text-blue-500">Duo</Text>
        </Text>
      </View>
    </View>
  )
}