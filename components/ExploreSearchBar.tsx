import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

function ExploreSearchBarFunction() {
  const [query, setQuery] = useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 35,
        width: 250,
      }}
    >
      <Ionicons name="search" size={16} color="#999" style={{ marginRight: 6 }} />
      <TextInput
        placeholder="Search explore..."
        value={query}
        onChangeText={setQuery}
        style={{ flex: 1, fontSize: 14 }}
        placeholderTextColor="#999"
      />
    </View>
  );
}
