import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'

export default function Home(props: any) {
    const { user } = props.route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
         <Text>Welcome, {user.name}</Text>
      <Text>Your ID: {user.id}</Text>
      <Text>Your Email: {user.email}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
  });
  