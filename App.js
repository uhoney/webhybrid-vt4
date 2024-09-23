import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AddToDo from './components/AddToDo';
import Row from './components/Row';
import { useLocalStorage } from './hooks/useLocalStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@myTodoList';

export default function App() {

  const [todos, setTodos] = useState([]);
  const { getData, storeData } = useLocalStorage();

  // Tämän ei tarvi kun kerran hakea ja asettaa usestatella
  useEffect(() => {
    getData(STORAGE_KEY).then(data => setTodos(data));
  }, []);

  // Tämä ajetaan aina kun todos muuttuu. Tuo 'STORAGE_KEY' voi olla mikä tahansa, mutta se on se key jolla se tallennetaan ja sillä pitää myös hakea
  // HUOM! Tässä oli mielenkiintoinen asynkronisuus, että ENSIN pitää hakea ja asettaa usestate. Toisinpäin ei toiminut!? Tietenkin todos on vain [] ja sen se hakee sitten.
  useEffect(() => {
    storeData(STORAGE_KEY, todos);
  }, [todos]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      <AddToDo
        todos={todos}
        setTodos={setTodos}
      />
      <View style={styles.todosList}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Row
              item={item}
              todos={todos}
              setTodos={setTodos}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 25,
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  todosList: {
    flex: 1,
    width: '90%',
  }
});
