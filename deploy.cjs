const hre = require("hardhat");

async function main() {
  // Deploy contract
  const PatientRecords = await hre.ethers.getContractFactory("PatientRecords");
  const patientRecords = await PatientRecords.deploy();
  await patientRecords.deployed();

  console.log("PatientRecords deployed to:", patientRecords.address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
