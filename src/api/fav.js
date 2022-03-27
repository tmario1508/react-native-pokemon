import AsyncStorage from '@react-native-async-storage/async-storage';
import { includes, pull } from 'lodash';
import { FAVORITE_STORAGE } from '../utils/constanst';

export async function addPokemonFavoriteApi(id) {
    try {
        const favorites = [];
        favorites.push(id);
        console.log(favorites, FAVORITE_STORAGE);
        await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites))
    } catch (error) {
        throw error;
    }
}

export async function getPokemonFavoriteApi(){
    try {
        const response = await AsyncStorage.getItem(FAVORITE_STORAGE)
        return response;
    } catch (error) {
        throw error;
    }
}