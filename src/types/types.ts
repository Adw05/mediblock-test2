export interface PatientRecord {
  id: string;
  name: string;
  diagnosis: string;
  timestamp: number;
}

export interface BlockchainResponse {
  success: boolean;
  message: string;
  data?: PatientRecord;
}