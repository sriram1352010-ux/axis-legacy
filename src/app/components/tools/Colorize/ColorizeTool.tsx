import React, { useState } from 'react';
import CustomSlider from '../../ui/CustomSlider';
import Modal from '../../ui/Modal';

const ColorizeTool = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intensity, setIntensity] = useState(50);

  const handleApply = () => {
    // Implementation for colorizing image
    console.log(`Applying colorization with intensity: ${intensity}%`);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Colorize Tool</h2>
      <p className="mb-4">Transform black and white images to color</p>
      
      <div className="mb-4">
        <CustomSlider 
          label="Intensity" 
          value={intensity} 
          onChange={setIntensity} 
          min={0} 
          max={100} 
        />
      </div>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Apply Colorization
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Colorize Image"
      >
        <div className="p-4">
          <p>Are you sure you want to apply colorization with {intensity}% intensity?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleApply}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ColorizeTool;
