import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function MessagesContentInfo({ path }: { path: string }) {
  type Post = { id: number; title: string; body: string };
  const [postList, setPostList] = useState<Post[]>([]);

  const fetchData = async (limit = 40) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    const data = await response.json();
    setPostList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <View>
        <FlatList
          data={postList}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.title}</Text>
                  <Text style={{ fontSize: 16 }}>{item.body}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
