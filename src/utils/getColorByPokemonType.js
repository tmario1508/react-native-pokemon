import { POKEMON_TYPE_COLORS } from './constanst'

const getColorByPokemonType = (type) => POKEMON_TYPE_COLORS[type.toLowerCase()];

export default getColorByPokemonType;