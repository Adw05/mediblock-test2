import { PatientRecord, BlockchainResponse } from '../types/types';

const API_BASE_URL = 'http://localhost:3000';

export const addPatientRecord = async (patient: PatientRecord): Promise<BlockchainResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: patient.id, // Changed from assetId to id
        value: {
          name: patient.name,
          diagnosis: patient.diagnosis,
          timestamp: Date.now()
        }
      }),
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message || 'Patient record added successfully',
      data: patient
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add patient record'
    };
  }
};

export const queryPatientRecord = async (patientId: string): Promise<BlockchainResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets`);
    const data = await response.json();

    const patient = data.find((item: any) => item.id === patientId);
    
    if (!patient) {
      return {
        success: false,
        message: `No patient found with ID ${patientId}`
      };
    }

    return {
      success: true,
      message: 'Patient record found',
      data: {
        id: patientId,
        name: patient.value.name,
        diagnosis: patient.value.diagnosis,
        timestamp: patient.value.timestamp
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to query patient record'
    };
  }
};

export const getAllPatients = async (): Promise<BlockchainResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets`);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to fetch patient records'
      };
    }

    const patients = data.data.map((item: any) => ({
      id: item.Key,
      ...item.Record.value
    }));

    return {
      success: true,
      message: 'Patient records fetched successfully',
      data: patients
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch patient records'
    };
  }
};

export const updatePatientRecord = async (patientId: string, newData: Partial<PatientRecord>): Promise<BlockchainResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newValue: {
          name: newData.name,
          diagnosis: newData.diagnosis,
          timestamp: Date.now()
        }
      }),
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update patient record'
    };
  }
};

export const deletePatientRecord = async (patientId: string): Promise<BlockchainResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets/${patientId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete patient record'
    };
  }
};