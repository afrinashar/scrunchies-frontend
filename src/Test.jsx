import React, { useState } from 'react';

function Modal({ onClose, onNext }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>You clicked the nested button!</p>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

function NestedButtons() {
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    setShowModal(true);
  };

  const handleModalNext = () => {
    setShowModal(false);
    // You can add logic for what happens when next is clicked
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Click me</button>
      {showModal && <Modal onClose={() => setShowModal(false)} onNext={handleModalNext} />}
    </div>
  );
}

export default NestedButtons;
