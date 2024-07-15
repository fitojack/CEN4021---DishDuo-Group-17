// Done by German Arita
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';
import { UserProvider } from '../screens/UserContext';

// Screens
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import SearchScreen from '../screens/SearchScreen';

// Screen Names
const homeName = 'Home';
const profileName = 'Profile';
const bookmarkName = 'Bookmark';
const searchName = 'Search';

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab component to manage it.
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          // Assigns icon based on the route name.
          if (route.name === homeName) {
            iconName = require('../../assets/bottom-nav/home.png');
          } else if (route.name === profileName) {
            iconName = require('../../assets/bottom-nav/profile.png');
          } else if (route.name === bookmarkName) {
            iconName = require('../../assets/bottom-nav/bookmark.png');
          } else if (route.name === searchName) {
            iconName = require('../../assets/bottom-nav/search.png');
          }

          return <Image source={iconName} style={[styles.icon, { opacity: focused ? 1 : 0.5 }]} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={profileName} component={ProfileScreen} />
      <Tab.Screen name={bookmarkName} component={BookmarkScreen} />
      <Tab.Screen name={searchName} component={SearchScreen} />
    </Tab.Navigator>
  );
}

// Main app
export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={BottomTabNavigator} />
          <Stack.Screen name="RecipeDetail" options={{ presentation: 'fullScreenModal' }} component={RecipeDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});