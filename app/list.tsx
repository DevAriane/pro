import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const data = [
  { key: '1', value: 'Élément 1' },
  { key: '2', value: 'Élément 2' },
  { key: '3', value: 'Élément 3' },
  { key: '4', value: 'Élément 4' },
  { key: '5', value: 'Élément 5' },
  { key: '6', value: 'Élément 6' },
];

const List = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.value}</Text>
          </View>
        )}
        keyExtractor={item => item.key}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#f9c2ff',
    alignItems: 'center',
  },
});

export default List;
