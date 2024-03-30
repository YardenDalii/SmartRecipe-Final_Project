import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import styles from '../stylesheets/HomePageStyles';
import { Entypo, Feather } from '@expo/vector-icons';

const HomePage = () => {
  // Define your data for the FlatList
  const data = [
    {
      type: 'header',
      title: 'Welcome User!',
    },
    {
      type: 'subHeader',
      text: 'Saved Recipes',
    },
    {
      type: 'savedRecipes',
      data: [
        { title: 'Lorem ipsum', image: 'https://via.placeholder.com/150' },
        { title: 'Lorem ipsum', image: 'https://via.placeholder.com/150' },
        { title: 'Lorem ipsum', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      type: 'category',
      data: [
        { name: 'Breakfast', icon: 'coffee' },
        { name: 'Lunch', icon: 'archive' },
        { name: 'Dinner', icon: 'moon' },
        { name: 'Healthy', icon: 'heart' },
      ],
    },
  ];

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome User!</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return renderHeader();
      case 'subHeader':
        return <Text style={styles.subHeader}>{item.text}</Text>;
      case 'savedRecipes':
        return (
          <FlatList
            horizontal
            data={item.data}
            renderItem={renderRecipeItem}
            keyExtractor={(item, index) => `saved-${index}`}
            showsHorizontalScrollIndicator={false}
          />
        );
      case 'category':
        return (
          <FlatList
            data={item.data}
            renderItem={renderCategoryItem}
            keyExtractor={(item, index) => `category-${index}`}
            numColumns={2}
            scrollEnabled={false}
          />
        );
      default:
        return null;
    }
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </View>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryButton}>
      <Entypo name={item.icon} size={48} color="#000" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `main-${index}`}
        ListFooterComponent={() => (
          <View style={styles.bottomNav}>
            <Entypo name="home" size={24} color="green" style={styles.navIcon} />
            <Feather name="search" size={24} color="black" style={styles.navIcon} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomePage;
