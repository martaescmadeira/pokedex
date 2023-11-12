import React from 'react';
import { Modal } from 'react-bootstrap';

function PokemonModal({ pokemon, onClose }) {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        
      </Modal.Body>
    </Modal>
  );
}

export default PokemonModal;
