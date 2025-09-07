import React from 'react';
import { Tractor } from 'lucide-react';
import { Farmer } from '../farmerprofile';

interface LandCropProps {
  farmer: Farmer;
  isEditMode: boolean;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleAddLand: () => void;
  handleRemoveLand: (index: number) => void;
}

const LandCrop: React.FC<LandCropProps> = ({ 
  farmer, 
  isEditMode, 
  formData, 
  handleChange, 
  handleAddLand, 
  handleRemoveLand 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Tractor size={20} /> Land Details
        </h3>
        {isEditMode && (
          <button
            onClick={handleAddLand}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            + Add Land & Crop
          </button>
        )}
      </div>

      <div className="space-y-4">
        {formData.landDetails.map((land: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Land name</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name={`landDetails.${index}.landName`}
                    value={land.landName}
                    onChange={handleChange}
                    placeholder="Enter Land Name"
                    className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                ) : (
                  <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                    <span className="text-sm text-gray-800">{land.landName}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Land Type</label>
                {isEditMode ? (
                  <select
                    name={`landDetails.${index}.landOwnership`}
                    value={land.landOwnership}
                    onChange={handleChange}
                    className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Enter Land Type</option>
                    <option value="Own">Own</option>
                    <option value="Leased">Leased</option>
                    <option value="Shared">Shared</option>
                  </select>
                ) : (
                  <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                    <span className="text-sm text-gray-800">{land.landOwnership}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Land Size</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name={`landDetails.${index}.totalLand`}
                    value={land.totalLand}
                    onChange={handleChange}
                    placeholder="Enter Land Size"
                    className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                ) : (
                  <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                    <span className="text-sm text-gray-800">{farmer.landDetails[index]?.ownLand || farmer.landDetails[index]?.leasedLand || ''}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Crop Sown</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="cropSown"
                    value={formData.cropSown}
                    onChange={handleChange}
                    placeholder="Enter Crop Sown"
                    className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                ) : (
                  <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                    <span className="text-sm text-gray-800">{farmer.cropDetails.cropSown}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Variety</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="cropVariety"
                    value={formData.cropVariety}
                    onChange={handleChange}
                    placeholder="Enter Variety"
                    className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                ) : (
                  <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                    <span className="text-sm text-gray-800">{farmer.cropDetails.variety}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Seed Variety</label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="seedVariety"
                    value={formData.seedVariety}
                    onChange={handleChange}
                    placeholder="Enter Seed Variety"
                    className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                ) : (
                  <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                    <span className="text-sm text-gray-800">{farmer.cropDetails.seedVariety}</span>
                  </div>
                )}
              </div>
            </div>

            {isEditMode && formData.landDetails.length > 1 && (
              <button
                onClick={() => handleRemoveLand(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandCrop;
