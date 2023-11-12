
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    throw error;
  }
};
