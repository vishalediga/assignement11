import React, { useState } from "react";
import SegmentModal from "./SegmentModal";
import "./App.css"; // Updated styles for the app

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app-container">
      <button onClick={openModal} className="open-modal-btn">
        Create Segment
      </button>
      {isModalOpen && <SegmentModal onClose={closeModal} />}
    </div>
  );
};

export default App;
