import React, { useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { BlockchainResponse, PatientRecord } from '../types/types';

interface QueryPatientFormProps {
  onQueryPatient: (id: string) => Promise<BlockchainResponse>;
  onPatientFound: (patient: PatientRecord) => void;
}

const QueryPatientForm: React.FC<QueryPatientFormProps> = ({ onQueryPatient, onPatientFound }) => {
  const [patientId, setPatientId] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId.trim()) {
      setFeedback({ type: 'error', message: 'Patient ID is required.' });
      return;
    }

    setIsQuerying(true);
    setFeedback({ type: '', message: '' });
    
    try {
      const response = await onQueryPatient(patientId);
      
      if (response.success && response.data) {
        setFeedback({ type: 'success', message: 'Patient record found.' });
        onPatientFound(response.data);
      } else {
        setFeedback({ type: 'error', message: response.message || 'Patient record not found.' });
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'An error occurred while querying the patient record.' });
      console.error('Error querying patient record:', error);
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex items-center mb-4">
        <MagnifyingGlass size={24} className="text-amber-500 mr-2" />
        <h2 className="text-2xl font-bold">Query Patient Record</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Enter a patient ID to retrieve their record from the blockchain.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="queryPatientId" className="block text-gray-700 font-medium mb-2">
            Patient ID
          </label>
          <input
            type="text"
            id="queryPatientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Enter Patient ID to query"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        
        {feedback.message && (
          <div className={`mb-4 p-3 rounded ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback.message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isQuerying}
          className={`w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition-colors duration-300 ${isQuerying ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isQuerying ? 'Querying Record...' : 'Query Record'}
        </button>
      </form>
    </div>
  );
};

export default QueryPatientForm;