import React from 'react';
import { Users, Clock } from 'lucide-react';

interface StatsCardsProps {
  totalFarmOperators: number;
  pendingApprovals: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ totalFarmOperators, pendingApprovals }) => {
  return (
    <div className="flex gap-4" style={{ marginTop: '10px' }}>
      <div className="bg-white border border-gray-200 rounded-xl" style={{ 
        width: '279px', 
        height: '119px', 
        opacity: 1,
        borderRadius: '12px',
        borderWidth: '1px'
      }}>
        <div className="flex items-center gap-3 p-6">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Poppins' }}>Total Farm Operator</p>
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins' }}>{totalFarmOperators}</p>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl" style={{ 
        width: '279px', 
        height: '119px', 
        opacity: 1,
        borderRadius: '12px',
        borderWidth: '1px'
      }}>
        <div className="flex items-center gap-3 p-6">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Poppins' }}>Pending Approvals</p>
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins' }}>{pendingApprovals}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
