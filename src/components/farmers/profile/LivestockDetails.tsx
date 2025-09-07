import React from 'react';
import { Users } from 'lucide-react';
import { Farmer } from '../farmerprofile';

interface LivestockDetailsProps {
  farmer: Farmer;
  isEditMode: boolean;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const LivestockDetails: React.FC<LivestockDetailsProps> = ({ farmer, isEditMode, formData, handleChange }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Users size={20} /> Livestock Details
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Total Livestock</label>
            {isEditMode ? (
              <input
                type="number"
                name="livestockCount"
                value={formData.livestockCount}
                onChange={handleChange}
                className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.livestockDetails.totalLivestock}</span>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Cattle</label>
            {isEditMode ? (
              <input
                type="number"
                name="cattle"
                value={formData.cattle}
                onChange={handleChange}
                className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.livestockDetails.cattle}</span>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Poultry</label>
            {isEditMode ? (
              <input
                type="number"
                name="poultry"
                value={formData.poultry}
                onChange={handleChange}
                className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.livestockDetails.poultry}</span>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Small Animals</label>
            {isEditMode ? (
              <input
                type="number"
                name="smallAnimals"
                value={formData.smallAnimals}
                onChange={handleChange}
                className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="w-full h-[40px] border border-gray-200 rounded flex items-center px-3">
                <span className="text-sm text-gray-800">{farmer.livestockDetails.smallAnimals}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">Detailed Breakdown</h4>
          <div className="grid grid-cols-2 gap-6">
            {formData.livestockBreakdown.map((category: any, categoryIndex: number) => {
              const isLastAndOdd =
                categoryIndex === formData.livestockBreakdown.length - 1 &&
                formData.livestockBreakdown.length % 2 !== 0;
              return (
                <div
                  key={category.category}
                  className={`border border-gray-200 rounded-lg p-4 ${isLastAndOdd ? 'col-span-2' : ''}`}
                >
                  <h5 className="text-sm font-medium text-gray-700 mb-3">{category.category}</h5>
                  <div className="space-y-3">
                    {category.items.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{item.name}:</span>
                        {isEditMode ? (
                          <input
                            type="number"
                            name={`livestockBreakdown.${categoryIndex}.${itemIndex}.count`}
                            value={item.count}
                            onChange={handleChange}
                            className="w-16 h-[30px] px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="w-16 h-[30px] border border-gray-200 rounded flex items-center justify-center">
                            <span className="text-sm text-gray-800">{item.count}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestockDetails;
