import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import uuid from 'react-native-uuid'

export default function AddToDo({ todos, setTodos }) {

    const [usrInput, setUsrInput] = useState('')

    // tässä tulee jonkinlainen tallennus välimuistiin? callback luo objektin uusiksi vain jos jokin riippuvuustaulukoista muuttuu
    // eli tuo usrInput on pakollinen, kun sen arvo on välimuistissa se '' mikä alustuksessa on määritelty
    const handleAddTodo = useCallback(() => {
        const newTodo = {
            id: uuid.v4(),
            name: usrInput,
            completed: false
        }
        // spread operaattori, tekee uuden taulukon johon lisätään uusi todo
        setTodos([...todos, newTodo])
        setUsrInput('')
        // riippuvuustaulukot, jos joku muuttuu niin useEffect ajetaan uudestaan
    }, [usrInput, todos, setTodos]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={usrInput}
                onChangeText={text => setUsrInput(text)}
                placeholder="Add a new todo.."
            />
            <View style={{ margin: 10 }}>
                <Button title="add" onPress={() => handleAddTodo()} />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },
    textInput: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#000',
        padding: 8,

    },
})