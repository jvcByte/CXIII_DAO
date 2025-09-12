// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DaoToken is ERC20 {
    constructor() ERC20("Cohort 13 Dao Token", "C13") {
        _mint(msg.sender, 100_000_000_000 ether); // Mint initial supply to deployer
    }
}