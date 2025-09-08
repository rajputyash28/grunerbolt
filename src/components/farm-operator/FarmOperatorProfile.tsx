import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Phone, MapPin, Calendar } from 'lucide-react';
import ProfileHeader from './components/ProfileHeader';
import StatsCardsProfile from './components/StatsCardsProfile';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import AssignedTasksTab from './components/AssignedTasksTab';
import AttendanceRecordsTab from './components/AttendanceRecordsTab';
import { mockFarmOperatorProfile } from './data/mockData';

const FarmOperatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const farmOperator = mockFarmOperatorProfile;

  const handleEdit = () => {
    navigate(`/farm-operators/edit/${id}`);
  };

  const handleBack = () => {
    navigate('/farm-operators');
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter' }}>Farm Operator Profile</h1>
          </div>
        </div>
        {activeTab === 'overview' && (
          <button 
            onClick={handleEdit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            style={{ fontFamily: 'Inter', fontSize: '13.02px', fontWeight: 600 }}
          >
            <Edit size={18} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Header */}
      <ProfileHeader farmOperator={farmOperator} />

      {/* Stats Cards */}
      <StatsCardsProfile 
        farmOperator={farmOperator}
        activeTab={activeTab}
      />

      {/* Tabs */}
      <TabNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        assignedTasksCount={farmOperator.assignedTasks.length}
      />

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab farmOperator={farmOperator} />}
      {activeTab === 'tasks' && <AssignedTasksTab farmOperator={farmOperator} />}
      {activeTab === 'attendance' && <AttendanceRecordsTab farmOperator={farmOperator} />}
    </div>
  );
};

export default FarmOperatorProfile;