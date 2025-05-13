import React from 'react';
import { Trash } from '@phosphor-icons/react';
import { PatientRecord } from '../types/types';

interface PatientListProps {
  patients: PatientRecord[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
}

const PatientList: React.FC<PatientListProps> = ({ patients, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Patient Records</h2>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Patient Records</h2>
      
      {patients.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No patient records found</p>
      ) : (
        <div className="space-y-4">
          {patients.map((patient) => (
            <div 
              key={patient.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div>
                <h3 className="font-medium">{patient.name}</h3>
                <p className="text-sm text-gray-500">ID: {patient.id}</p>
              </div>
              
              <button
                onClick={() => onDelete(patient.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                title="Delete patient record"
              >
                <Trash size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;