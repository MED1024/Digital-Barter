pragma solidity 0.8.19;


import "@openzeppelin/contracts/access/Ownable.sol";

contract GoldOracle is Ownable {

  uint256 private priceGold;

  constructor (address initialOwner) Ownable(initialOwner){
       
  }
  
  function setPriceGold(uint256 _newPrice) public onlyOwner {
    priceGold=_newPrice;
  }

  function getPriceGold() external view returns (uint256){
    return priceGold;
  }

}