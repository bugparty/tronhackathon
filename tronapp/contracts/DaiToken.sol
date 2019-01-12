pragma solidity ^0.4.23;

import "./ownership/Ownable.sol";
import "./tokens/TRC20/TRC20.sol";

/**
* @title DaiToken is a fake dai ERC20 Token
*/
contract DaiToken is TRC20, Ownable{
  uint256 public totalSupply;
  string public name;
  string public symbol;
  uint32 public decimals;

  /**
 * @dev assign totalSupply to account creating this contract */  
  constructor() public {
    symbol = "Dai";
    name = "DaiToken";
    decimals = 5;
    totalSupply = 1000.00000000;
    _mint(msg.sender, totalSupply);
  }
 }

