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
        assetId: patient.id,
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
      message: data.message,
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
    const response = await fetch(`${API_BASE_URL}/assets/${patientId}`);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `No patient found with ID ${patientId}`
      };
    }

    const patientData = data.data;
    return {
      success: true,
      message: 'Patient record found',
      data: {
        id: patientId,
        name: patientData.value.name,
        diagnosis: patientData.value.diagnosis,
        timestamp: patientData.value.timestamp
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