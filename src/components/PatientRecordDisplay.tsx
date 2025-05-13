import React from 'react';
import { ClipboardText, Calendar } from '@phosphor-icons/react';
import { PatientRecord } from '../types/types';

interface PatientRecordDisplayProps {
  patient: PatientRecord | null;
}

const PatientRecordDisplay: React.FC<PatientRecordDisplayProps> = ({ patient }) => {
  if (!patient) return null;

  const formattedDate = new Date(patient.timestamp).toLocaleString();

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ClipboardText size={24} className="text-teal-600 mr-2" />
          <h3 className="text-xl font-bold">Patient Record Found</h3>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar size={16} className="mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 text-sm">Patient ID</p>
          <p className="font-medium">{patient.id}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Patient Name</p>
          <p className="font-medium">{patient.name}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-500 text-sm">Diagnosis</p>
          <p className="font-medium">{patient.diagnosis}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientRecordDisplay;