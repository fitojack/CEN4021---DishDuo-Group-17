// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/ProfileScreen';
import SocialMediaScreen from './screens/SocialMediaScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import SearchScreen from './screens/SearchScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'SocialMedia') {
                            iconName = 'ios-people';
                        } else if (route.name === 'ShoppingCart') {
                            iconName = 'ios-cart';
                        } else if (route.name === 'Search') {
                            iconName = 'ios-search';
                        } else if (route.name === 'Bookmark') {
                            iconName = 'ios-bookmark';
                        } else if (route.name === 'Profile') {
                            iconName = 'ios-person';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'white',
                    inactiveTintColor: 'gray',
                    style: {
                        backgroundColor: '#1E90FF',
                    },
                }}
            >
                <Tab.Screen name="SocialMedia" component={SocialMediaScreen} />
                <Tab.Screen name="ShoppingCart" component={ShoppingCartScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Bookmark" component={BookmarkScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
