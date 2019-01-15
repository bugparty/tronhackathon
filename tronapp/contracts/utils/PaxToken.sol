pragma solidity ^0.4.23;

import "./tokens/TRC20/TRC20.sol";
import "./tokens/TRC20/TRC20Detailed.sol";
import "./tokens/TRC20/TRC20Mintable.sol";


/**
* @title DaiToken is a fake dai ERC20 Token
*/
contract PaxToken is TRC20, TRC20Detailed, TRC20Mintable{
  uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** 5);

  /**
 * @dev assign totalSupply to account creating this contract */
  constructor() public TRC20Detailed("PaxToken", "PAX", 5){
    _mint(msg.sender, INITIAL_SUPPLY);
  }
 }

