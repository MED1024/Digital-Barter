import { ethers } from 'hardhat';

async function main() {
  const CountryTokenFactory = await ethers.deployContract(
    'CountryTokenFactory'
  );

  await CountryTokenFactory.waitForDeployment();

  console.log(`Successfully deployed to ${CountryTokenFactory.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
