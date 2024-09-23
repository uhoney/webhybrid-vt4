import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLocalStorage() {

    const getData = async (key) => {
        try {
            // Tämä on nyt tallennettu sillä yhdellä STORAGE_KEY:llä,
            // voishan sinne tallennella muitakin vaikka dynaamisilla käyttäjän antamilla arvoilla tms.
            const jsonValue = await AsyncStorage.getItem(key);
            // tallennetut arvot pitää serialisoida takaisin json muotoon
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e)
        }
    };

    const storeData = async (key, value) => {
        if (key && value !== null && value !== undefined) {
            try {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem(key, jsonValue);
            } catch (e) {
                console.log(e)
            }
        }
        else {
            console.log('key and value are required')
        }
    };

    return ({ storeData, getData })
}