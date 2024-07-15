// Done by German Arita
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';

export default function Categories({ categories, activeCategory, handleChangeCategory }) {
  return (
    // Animated view that does the FadeInDown animation.
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          // Goes through array to create a TouchableOpacity for each category.
          categories.map((cat, index) => {
            // Check if it is active.
            let isActive = cat.strCategory == activeCategory;
            // Set background color if button is active or not.
            let activeButtonClass = isActive ? ' bg-blue-600' : ' bg-black/10';
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeCategory(cat.strCategory)}
                className="flex items-center space-y-1"
              >
                <View className={"rounded-full p-[6px] " + activeButtonClass}>
                  <CachedImage
                    uri={cat.strCategoryThumb}
                    style={{ width: hp(6), height: hp(6) }}
                    className="rounded-full"
                  />
                </View>
                <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  )
}