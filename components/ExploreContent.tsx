// This is the main component for displaying explore content
// This component fetches and displays a list of posts from a placeholder API.
// You can replace the API URL with your own to fetch actual data as needed.
// It uses React Native's FlatList to render the list of posts.
// The component is styled using StyleSheet from React Native.
// It also imports custom Text and View components from a themed file for consistent styling across the app.
// The component can be used in the main Explore screen or wherever you want to display explore content.
// You can customize it further by adding features like pull-to-refresh, pagination, etc.
// Make sure to handle loading states and errors as needed in a production application.
// This component can be imported and used in your main Explore screen or any other screen where you want to display explore content.
// You can also pass additional props to customize the content or fetch different data based on the path or other parameters.
// This is a basic implementation. You can enhance it further by adding features like pull-to-refresh, pagination, etc.
// You can also add navigation to individual post details if needed.
// This component is a functional component that uses React hooks for state management and side effects.
// It fetches data from a placeholder API and displays it in a list format.
// The component is designed to be reusable and can be easily integrated into your application.
// This component is a functional component that uses React hooks for state management and side effects.
// It fetches data from a placeholder API and displays it in a list format.

import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
// Import necessary components and hooks from React Native
// Import FlatList for rendering lists and StyleSheet for styling
import { FlatList, StyleSheet } from 'react-native';
// Import custom components for theming and layout
import { Text, View } from './Themed';

// This component fetches and displays a list of posts from a placeholder API
export default function ExploreContentInfo({ path }: { path: string }) {
  // Define the type for a Post object
  // This type represents the structure of a post object fetched from the API
  // It includes an id, title, and body
  // You can modify this type based on the actual data structure you expect from your API
  type Post = { id: number; title: string; body: string };
  const [postList, setPostList] = useState<Post[]>([]);   // State to hold the list of posts

  // Function to fetch data from the placeholder API
  const fetchData = async (limit = 20) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    const data = await response.json()
    setPostList(data)
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);
  

  // Render the component
  // This function returns the JSX to be rendered
  // It uses FlatList to render the list of posts
  // Each post is displayed with its title and body
  // You can customize the rendering as needed
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

// Styles for the component
const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
// You can add more styles here as needed

// Note: The fetchData function is currently fetching posts from a placeholder API.
// You can replace the URL with your own API endpoint to fetch actual event data.

// The component currently displays a static message. You can modify it to display the fetched data as needed.

// If you want to display the fetched data in a list, you can use FlatList or any other component to render the items.

// Make sure to handle loading states and errors as needed in a production application.

// This component can be used in your main Explore screen or wherever you want to display the explore content.

// You can also pass additional props to customize the content or fetch different data based on the path or other parameters.

// Remember to import this component in your main Explore screen and use it accordingly.

// This is a basic implementation. You can enhance it further by adding features like pull-to-refresh, pagination, etc.
// You can also add navigation to individual event details if needed. 


//  <View style={styles.getStartedContainer}>
//       <Text
//         style={styles.getStartedText}
//         lightColor="rgba(0,0,0,0.8)"
//         darkColor="rgba(255,255,255,0.8)">
//         Show all upcomingkajufhviukhughqtjnadgn  njafngin  events here in explore
//       </Text>
//     </View>