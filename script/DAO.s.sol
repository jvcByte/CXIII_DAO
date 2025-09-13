
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Cohort_CXIII_DAO} from "../src/Dao.sol";
import {DaoToken} from "../src/$DAO.sol";

contract Deploy_Cohort_CXIII_DAO is Script {
    Cohort_CXIII_DAO public dao;
    DaoToken public daoToken;
    address admin = 0xa193A1077DF9D386cff52eE50200F598EDD3d1C1;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        daoToken = new DaoToken();
        console.log("DaoToken deployed at:", address(daoToken));

        dao = new Cohort_CXIII_DAO(admin, address(daoToken));
        console.log("DAO deployed at:", address(dao));

        daoToken.transfer(address(dao), daoToken.totalSupply());
        console.log("Tokens transferred to DAO");



        vm.stopBroadcast();
    }
}


// forge script --chain sepolia script/DAO.s.sol:Deploy_Cohort_CXIII_DAO --rpc-url $SEPOLIA_RPC_URL --account <keystore_file_name> --broadcast --verify -vvvvv