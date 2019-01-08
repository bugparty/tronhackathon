pragma solidity ^0.4.24;  
import "openzeppelin-solidity/contracts/math/SafeMath.sol";  

/**
 * @dev Simple implementation of Open-Zeppelin SafeMath functions
 */
contract WalletContract {
    using SafeMath for uint256;
    address owner;
    struct Op {
        uint256 amount;
        uint time;
        address addr;
    }
    struct User {
        address addr;
        uint256 total;
        Op[] desposits;
        Op[] withdraws;
    }
    uint userCount;
    uint256 userBalance;//users' balance in total
    uint256 ownerBalance;// extra balance value the contract owner added
    uint256 totalBalance;// total Balance for accounting
    mapping(address => User) accounts;

    modifier onlyOwner() { // Modifier
        require(
            msg.sender == owner,
            "Require owner."
        );
        _;
    }
    constructor() public {
        // State variables are accessed via their name
        // and not via e.g. `this.owner`. Functions can
        // be accessed directly or through `this.f`,
        // but the latter provides an external view
        // to the function. Especially in the constructor,
        // you should not access functions externally,
        // because the function does not exist yet.
        // See the next section for details.
        owner = msg.sender;
    }
    function getBalanceInContract() public view returns (uint) {
        return address(this).balance;
    }
    function getBalanceInner() public view returns (uint) {
        return totalBalance;
    }
    function getUserBalance() public view returns (uint) {
        return userBalance;
    }
    function getOwnerBalance() public view returns (uint) {
        return ownerBalance;
    }
    function getUserCount() public view returns (uint) {
        return userCount;
    }
    function getOwner() public view returns (address) {
        return owner;
    }

    //存入一些ether用于后面的测试
    function deposit() public payable{
    }


    
}