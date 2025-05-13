import Web3 from 'web3';
import { PatientRecord, BlockchainResponse } from '../types/types';
import PatientRecordsABI from '../contracts/PatientRecords.json';

const web3 = new Web3('http://localhost:7545'); // Ganache default URL
const contractAddress = '0xEc2087B907b418292C6726f0760c45e1428FCB02' // You'll need contractAddressDatato deploy the contract and put its address here
const contract = new web3.eth.Contract(PatientRecordsABI.abi, contractAddress);

let defaultAccount = '';

// Initialize Web3
const initWeb3 = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    defaultAccount = accounts[0];
    return true;
  } catch (error) {
    console.error('Failed to initialize Web3:', error);
    return false;
  }
};

export const addPatientRecord = async (patient: PatientRecord): Promise<BlockchainResponse> => {
  try {
    if (!defaultAccount) {
      await initWeb3();
    }

    await contract.methods.addPatient(
      patient.id,
      patient.name,
      patient.diagnosis
    ).send({ from: defaultAccount, gas: '5000000' });

    return {
      success: true,
      message: 'Patient record successfully added to the blockchain.'
    };
  } catch (error) {
    console.error('Error adding patient record:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add patient record.'
    };
  }
};

export const queryPatientRecord = async (patientId: string): Promise<BlockchainResponse> => {
  try {
    if (!defaultAccount) {
      await initWeb3();
    }

    // Check if the patient exists
    const exists = await contract.methods.patientDoesExist(patientId).call();
    
    if (!exists) {
      return {
        success: false,
        message: `No patient found with ID ${patientId}.`
      };
    }

    // Fetch patient details
    const patient = await contract.methods.getPatient(patientId).call();
    
    // Debugging the returned patient data
    console.log('Returned patient data:', patient);  // Debug log to check the data structure

    // Check if the returned data is not empty
    if (!patient || patient.length === 0) {
      return {
        success: false,
        message: 'No patient data returned or incorrect format.'
      };
    }

    // Assuming the patient data is returned as an array:
    return {
      success: true,
      message: 'Patient record found.',
      data: {
        id: patient[0],  // The id should be at index 0
        name: patient[1],  // The name should be at index 1
        diagnosis: patient[2],  // The diagnosis should be at index 2
        timestamp: parseInt(patient[3])  // The timestamp should be at index 3 (converted to integer)
      }
    };
  } catch (error) {
    console.error('Error querying patient record:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to query patient record.'
    };
  }
};

