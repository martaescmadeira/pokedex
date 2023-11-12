import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonModal from './PokemonModal';
import './PokedexList.css';
import tinycolor from 'tinycolor2'; // Import tinycolor2 for color adjustments

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;

  // Function to adjust color shade
 // Function to adjust color shade while preserving hue
 const adjustColor = (color, lightenFactor) => {
  // Lighten the color while preserving hue
  const lightenedColor = tinycolor(color).lighten(lightenFactor * 50).spin(0).toString();

  // Return the lightened color
  return lightenedColor;
};


  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${resultsPerPage}&offset=${(currentPage - 1) * resultsPerPage}`);
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);
            const color = speciesResponse.data.color.name;
            const lightenedColor = adjustColor(color, 0.8); // Adjust color shade (lighten)
            return { ...pokemon, color: lightenedColor };
          })
        );
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const handlePokemonClick = async (url) => {
    try {
      const response = await axios.get(url);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

 // ... (your existing code)

return (
  <div>
    <div className="container mt-4">
      <div className="row">
        {pokemonList.map((pokemon) => (
          <div
            className="col"
            key={pokemon.name}
            onClick={() => handlePokemonClick(pokemon.url)}
          >
            <div className="card h-100">
              <div className={`circle ${pokemon.color === 'white' ? 'with-border' : ''}`} style={{ backgroundColor: pokemon.color, margin: "9px" }}></div>
              <img
                src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                className="card-img"
                alt={pokemon.name}
              />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {selectedPokemon && (
      <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
    )}

    <div className="pagination">
      <button
        className="btn "
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      <button className="btn " onClick={handleNextPage}>
        Next Page
      </button>
    </div>
  </div>
);

}

export default PokemonList;
