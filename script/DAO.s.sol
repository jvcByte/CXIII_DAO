// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Cohort_CXIII_DAO} from "../src/Dao.sol";

contract Cohort_CXIII_DAO_Script is Script {
    Cohort_CXIII_DAO public dao;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        dao = new Cohort_CXIII_DAO();

        vm.stopBroadcast();
    }
}
