import React, { useState } from 'react';
import { View, TextInput, FlatList, Button} from 'react-native';
import styles from '../stylesheets/SearchScreenStyles';
import NavigationBar from '../app/NavigationBar';

const SearchScreen = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter the name of the recipe"
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <Button
                title="Search"
                onPress={handleSearch}
            />
      <NavigationBar showSearchIcon={false} /> 
    </View>
  );
  
};

export default SearchScreen;
