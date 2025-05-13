// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;


contract PatientRecords {
    struct Patient {
        string id;
        string name;
        string diagnosis;
        uint256 timestamp;
    }
    
    mapping(string => Patient) private patients;
    mapping(string => bool) private patientExists;
    
    event PatientAdded(string id, uint256 timestamp);
    
    function addPatient(
        string memory _id,
        string memory _name,
        string memory _diagnosis
    ) public {
        require(!patientExists[_id], "Patient already exists");
        
        uint256 timestamp = block.timestamp;
        patients[_id] = Patient(_id, _name, _diagnosis, timestamp);
        patientExists[_id] = true;
        
        emit PatientAdded(_id, timestamp);
    }
    
    function getPatient(string memory _id) public view returns (
        string memory id,
        string memory name,
        string memory diagnosis,
        uint256 timestamp
    ) {
        require(patientExists[_id], "Patient does not exist");
        Patient memory patient = patients[_id];
        return (
            patient.id,
            patient.name,
            patient.diagnosis,
            patient.timestamp
        );
    }
    
    function patientDoesExist(string memory _id) public view returns (bool) {
        return patientExists[_id];
    }
}