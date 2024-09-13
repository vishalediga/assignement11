import React, { useState } from "react";
import "./SegmentModal.css"; 

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const SegmentModal = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [currentSchema, setCurrentSchema] = useState("");

  const handleAddSchema = () => {
    if (currentSchema && !selectedSchemas.includes(currentSchema)) {
      setSelectedSchemas([...selectedSchemas, currentSchema]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== currentSchema)
      );
      setCurrentSchema("");
    }
  };

  const handleRemoveSchema = (schemaValue) => {
    setSelectedSchemas(
      selectedSchemas.filter((value) => value !== schemaValue)
    );
    setAvailableSchemas([
      ...availableSchemas,
      schemaOptions.find((schema) => schema.value === schemaValue),
    ]);
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schemaValue) => {
        const schema = schemaOptions.find(
          (option) => option.value === schemaValue
        );
        return { [schema.value]: schema.label };
      }),
    };

    console.log("Sending data to server:", data);

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);
      alert("Segment saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving segment:", error);
      alert(`Failed to save segment. ${error.message}`);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Create New Segment</h2>
        <label>
          Segment Name:
          <input
            type="text"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Enter segment name"
          />
        </label>

        <div className="schema-selection">
          <div className="selected-schemas">
            {selectedSchemas.map((schemaValue, index) => (
              <div key={index} className="schema-item">
                <span>
                  {
                    schemaOptions.find((option) => option.value === schemaValue)
                      ?.label
                  }
                </span>
                <button
                  onClick={() => handleRemoveSchema(schemaValue)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="schema-actions">
            <select
              value={currentSchema}
              onChange={(e) => setCurrentSchema(e.target.value)}
            >
              <option value="">Select schema to add</option>
              {availableSchemas.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button onClick={handleAddSchema} className="add-btn">
              Add Schema
            </button>
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={handleSaveSegment} className="save-btn">
            Save
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentModal;
