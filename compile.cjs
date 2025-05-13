const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'src', 'contracts', 'PatientRecords.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'PatientRecords.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contractFile = output.contracts['PatientRecords.sol']['PatientRecords'];
fs.writeFileSync(
  path.resolve(__dirname, 'src', 'contracts', 'PatientRecords.json'),
  JSON.stringify(contractFile, null, 2)
);

console.log('✅ Contract compiled successfully!');
