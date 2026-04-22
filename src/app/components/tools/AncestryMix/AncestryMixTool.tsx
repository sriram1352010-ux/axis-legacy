import React, { useState } from 'react';
import CustomSlider from '../../ui/CustomSlider';
import Modal from '../../ui/Modal';

const AncestryMixTool = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mixPercentage, setMixPercentage] = useState(50);

  const handleApply = () => {
    // Implementation for ancestry mixing
    console.log(`Applying ancestry mix with ${mixPercentage}% blend`);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Ancestry Mix Tool</h2>
      <p className="mb-4">Blend different ethnic features</p>
      
      <div className="mb-4">
        <CustomSlider 
          label="Mix Percentage" 
          value={mixPercentage} 
          onChange={setMixPercentage} 
          min={0} 
          max={100} 
        />
      </div>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      >
        Mix Ancestry
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Mix Ancestry"
      >
        <div className="p-4">
          <p>Are you sure you want to mix ancestry with {mixPercentage}% blend?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleApply}
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AncestryMixTool;
