import { HOST_API } from "../utils/constanst";

export async function getPokemonsApi(endpointUrl) {
    try {
        const url = `${HOST_API}/pokemon?limit=20&offset=0`;
        const res = await fetch(endpointUrl || url);
        const result = await res.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getPokemonDetailByUrlApi(url) {
    try {
        const res = await fetch(url);
        const result = await res.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getPokemonDetailsApi(id) {
    try {
        const url = `${HOST_API}/pokemon/${id}`;
        const res = await fetch(url);
        const result = await res.json();
        return result;
    } catch (error) {
        throw error;
    }
}