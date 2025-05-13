import React, { useState } from 'react';
import Header from './components/Header';
import AddPatientForm from './components/AddPatientForm';
import QueryPatientForm from './components/QueryPatientForm';
import PatientRecordDisplay from './components/PatientRecordDisplay';
import { PatientRecord } from './types/types';
import { addPatientRecord, queryPatientRecord } from './services/blockchainService';

function App() {
  const [queriedPatient, setQueriedPatient] = useState<PatientRecord | null>(null);

  const handleAddPatient = async (patient: PatientRecord) => {
    return await addPatientRecord(patient);
  };

  const handleQueryPatient = async (patientId: string) => {
    const response = await queryPatientRecord(patientId);
    if (!response.success) {
      setQueriedPatient(null);
    }
    return response;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-10">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Patient Form */}
          <div className="md:col-span-1">
            <AddPatientForm onAddPatient={handleAddPatient} />
          </div>
          
          {/* Query Patient Form */}
          <div className="md:col-span-1">
            <QueryPatientForm 
              onQueryPatient={handleQueryPatient} 
              onPatientFound={setQueriedPatient} 
            />
            
            {/* Display Patient Record if found */}
            {queriedPatient && <PatientRecordDisplay patient={queriedPatient} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;