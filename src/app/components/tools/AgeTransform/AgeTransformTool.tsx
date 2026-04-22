"use client";

import React, { useState } from 'react';
import CustomSlider from '../../ui/CustomSlider';
import Modal from '../../ui/Modal';

const AgeTransformTool = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ageChange, setAgeChange] = useState(0);

  const handleApply = () => {
    // Implementation for age transformation
    console.log(`Transforming age by ${ageChange} years`);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Age Transform Tool</h2>
      <p className="mb-4">Modify facial age characteristics</p>
      
      <div className="mb-4">
        <CustomSlider 
          label="Age Change" 
          value={ageChange} 
          onChange={setAgeChange} 
          min={-50} 
          max={50} 
          unit="years"
        />
      </div>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Transform Age
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Transform Age"
      >
        <div className="p-4">
          <p>Are you sure you want to transform age by {ageChange} years?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleApply}
              className="px-4 py-2 bg-purple-500 text-white rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgeTransformTool;
