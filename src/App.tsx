import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddPatientForm from './components/AddPatientForm';
import QueryPatientForm from './components/QueryPatientForm';
import PatientRecordDisplay from './components/PatientRecordDisplay';
import PatientList from './components/PatientList';
import { PatientRecord } from './types/types';
import { addPatientRecord, queryPatientRecord, getAllPatients, deletePatientRecord } from './services/apiService';

function App() {
  const [queriedPatient, setQueriedPatient] = useState<PatientRecord | null>(null);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const response = await getAllPatients();
    if (response.success && Array.isArray(response.data)) {
      setPatients(response.data);
    }
    setLoading(false);
  };

  const handleAddPatient = async (patient: PatientRecord) => {
    const response = await addPatientRecord(patient);
    if (response.success) {
      loadPatients();
    }
    return response;
  };

  const handleQueryPatient = async (patientId: string) => {
    const response = await queryPatientRecord(patientId);
    if (!response.success) {
      setQueriedPatient(null);
    }
    return response;
  };

  const handleDeletePatient = async (patientId: string) => {
    const response = await deletePatientRecord(patientId);
    if (response.success) {
      loadPatients();
      if (queriedPatient?.id === patientId) {
        setQueriedPatient(null);
      }
    }
    return response;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-10">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <AddPatientForm onAddPatient={handleAddPatient} />
            
            <div className="mt-6">
              <PatientList 
                patients={patients} 
                loading={loading}
                onDelete={handleDeletePatient}
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <QueryPatientForm 
              onQueryPatient={handleQueryPatient} 
              onPatientFound={setQueriedPatient} 
            />
            
            {queriedPatient && <PatientRecordDisplay patient={queriedPatient} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App