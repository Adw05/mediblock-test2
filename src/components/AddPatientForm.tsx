import React, { useState } from 'react';
import { UserPlus } from '@phosphor-icons/react';
import { PatientRecord, BlockchainResponse } from '../types/types';

interface AddPatientFormProps {
  onAddPatient: (patient: PatientRecord) => Promise<BlockchainResponse>;
}

const AddPatientForm: React.FC<AddPatientFormProps> = ({ onAddPatient }) => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId.trim() || !patientName.trim() || !diagnosis.trim()) {
      setFeedback({ type: 'error', message: 'All fields are required.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });
    
    try {
      const patient: PatientRecord = {
        id: patientId,
        name: patientName,
        diagnosis,
        timestamp: Date.now()
      };
      
      const response = await onAddPatient(patient);
      
      if (response.success) {
        setFeedback({ type: 'success', message: 'Patient record added successfully!' });
        setPatientId('');
        setPatientName('');
        setDiagnosis('');
      } else {
        setFeedback({ type: 'error', message: response.message || 'Failed to add patient record.' });
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'An error occurred while adding the patient record.' });
      console.error('Error adding patient record:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex items-center mb-4">
        <UserPlus size={24} className="text-teal-600 mr-2" />
        <h2 className="text-2xl font-bold">Add Patient Record</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Enter patient details to add a new record to the blockchain.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="patientId" className="block text-gray-700 font-medium mb-2">
            Patient ID
          </label>
          <input
            type="text"
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="e.g., P001"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-gray-700 font-medium mb-2">
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="e.g., John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="diagnosis" className="block text-gray-700 font-medium mb-2">
            Diagnosis
          </label>
          <input
            type="text"
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="e.g., Flu"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        
        {feedback.message && (
          <div className={`mb-4 p-3 rounded ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback.message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Adding Record...' : 'Add Record'}
        </button>
      </form>
    </div>
  );
};

export default AddPatientForm;