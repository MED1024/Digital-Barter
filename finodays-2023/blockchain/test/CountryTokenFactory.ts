import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('CountryTokenFactory', function () {
  // TODO: прописать тайпинги
  let factory: any;
  let token: any;
  let owner: any;
  let participant1: any;
  let participant2: any;
  let other: any;

  beforeEach(async () => {
    [owner, participant1, participant2, other] = await ethers.getSigners();

    const CountryTokenFactory = await ethers.getContractFactory(
      'CountryTokenFactory'
    );
    factory = await CountryTokenFactory.deploy();
    await factory.deployed();

    const CountryToken = await ethers.getContractFactory('CountryToken');
    token = await CountryToken.deploy(
      'CountryToken',
      'CT',
      'Country',
      participant1.address
    );
    await token.deployed();
  });

  describe('setInitialParticipants', function () {
    it('Should set initial participants correctly', async function () {
      await factory.setInitialParticipants(
        [participant1.address],
        ['Country1']
      );
      expect(await factory.countryWallets(participant1.address)).to.equal(
        'Country1'
      );
    });

    it('Should revert if participants are already set', async function () {
      await factory.setInitialParticipants(
        [participant1.address],
        ['Country1']
      );
      await expect(
        factory.setInitialParticipants([participant2.address], ['Country2'])
      ).to.be.revertedWith('Participants already set');
    });
  });

  describe('allowCountry', function () {
    it('Should allow a country correctly', async function () {
      await factory.setInitialParticipants(
        [participant1.address],
        ['Country1']
      );
      await factory
        .connect(participant1)
        .allowCountry('Country2', participant2.address);
      expect(await factory.countryWallets(participant2.address)).to.equal(
        'Country2'
      );
    });
  });

  describe('removeCountry', function () {
    it('Should remove a country correctly', async function () {
      await factory.setInitialParticipants(
        [participant1.address],
        ['Country1']
      );
      await factory.connect(participant1).removeCountry('Country1');
      expect(await factory.allowedCountries('Country1')).to.equal(false);
    });

    it('Should revert if the sender is not a participant', async function () {
      await expect(
        factory.connect(other).removeCountry('Country1')
      ).to.be.revertedWith('Not a participant');
    });

    it("Should revert if the sender's wallet does not belong to the country", async function () {
      await factory.setInitialParticipants(
        [participant1.address],
        ['Country1']
      );
      await expect(
        factory.connect(participant2).removeCountry('Country1')
      ).to.be.revertedWith('Wallet does not belong to this country');
    });
  });

  describe('createToken', function () {
    it('Should create a token for a country', async function () {
      await factory.setInitialParticipants(
        [participant1.address],
        ['Country1']
      );
      await factory
        .connect(participant1)
        .createToken('Country1', 'CountryToken', 'CT');
      expect(await factory.tokenAddress('Country1')).to.not.equal(
        '0x0000000000000000000000000000000000000000'
      );
    });
  });
});
