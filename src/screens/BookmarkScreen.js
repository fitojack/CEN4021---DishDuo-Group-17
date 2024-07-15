import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useUser } from '../screens/UserContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { CachedImage } from '../helpers/image';

export default function BookmarkScreen() {
    const { user } = useUser();
    const [bookmarkedMeals, setBookmarkedMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchBookmarkedMeals();
    }, [user.bookmarks]);

    const fetchBookmarkedMeals = async () => {
        setLoading(true);
        try {
            const mealRequests = user.bookmarks.map(id =>
                axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            );
            const mealResponses = await Promise.all(mealRequests);
            const meals = mealResponses.map(response => response.data.meals[0]);
            setBookmarkedMeals(meals);
        } catch (err) {
            console.log('Error fetching bookmarked meals: ', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading size="large" />;
    }

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={bookmarkedMeals}
                keyExtractor={item => item.idMeal}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RecipeDetail', item)}
                        className="flex-row items-center p-4 border-b border-gray-200">
                        <CachedImage
                            uri={item.strMealThumb}
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                        />
                        <Text className="ml-4 text-lg font-semibold">{item.strMeal}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
