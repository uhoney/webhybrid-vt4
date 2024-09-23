import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function Row({ item, todos, setTodos }) {

    const valittuId = (id) => {
        // map käy läpi arrayn kaikki elementit ja palauttaa uuden arrayn
        const uusiLista = todos.map((listanElementti) => {
            // Jos todos-arrayn elementin id vastaa valittua id:tä (eli annettu argumentti)
            if (listanElementti.id === id) {
                // Palauta spread operaattoria käyttäen uusi array, jossa valitun elementin completed arvo vaihdetaan true/false
                return { ...listanElementti, completed: !listanElementti.completed };
            }
            // Jos valittu id ei vastaa todos-arrayn elementin id:tä, palauta elementti sellaisenaan
            else {
                return listanElementti;
            }
        });

        setTodos(uusiLista);
    };

    return (
        <Pressable onPress={() => valittuId(item.id)}>
            {/* style ottaa ehdollisen arrayn argumentiksi => styles.todos on palautuksessa aina, styles.done lisätään mukaan JOS item.completed === true*/}
            {/* eli stylesit annetaan peräkanaa tekstille tyyliksi, ei jompikumpi vaan molemmat */}
            <Text style={[styles.todos, item.completed && styles.done]}>{item.name}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    todos: {
        fontSize: 16,
        margin: 10
    },
    done: {
        textDecorationLine: 'line-through',
        color: 'gray'
    }
});