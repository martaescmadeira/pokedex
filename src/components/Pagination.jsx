// src/components/PokemonList.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Col, Row } from 'react-bootstrap';
import { fetchPokemonList } from '../api/api';
import Pagination from './Pagination';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(9); // 3 Pokemon cards per row

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPokemonList();
        setPokemonList(data);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchData();
  }, []);

  const getPokemonImageUrl = (pokemon) => {
    return `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`;
  };

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  // Pagination logic
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {currentPokemon.map((pokemon) => (
          <Col key={pokemon.name} className="mb-4">
            <Card>
              <Card.Img
                src={getPokemonImageUrl(pokemon)}
                className="card-img-top img-fluid"
                alt={pokemon.name}
              />
              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                <Button variant="primary" onClick={() => openModal(pokemon)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <Pagination
            itemsPerPage={pokemonPerPage}
            totalItems={pokemonList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Col>
      </Row>

      {selectedPokemon && (
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedPokemon.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            {/* Add other details as needed */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PokemonList;
