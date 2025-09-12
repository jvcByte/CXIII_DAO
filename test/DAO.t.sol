// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Cohort_CXIII_DAO} from "../src/Dao.sol";

contract Cohort_CXIII_DAO_Tests is Test {
    Cohort_CXIII_DAO public dao;

    function setUp() public {
        dao = new Cohort_CXIII_DAO();
    }

    function test_AddMember() public {
        dao.addMember(msg.sender);
        assertEq(dao.isMember(msg.sender), true);
    }

    function testFuzz_AddMember(address member) public {
        dao.addMember(member);
        assertEq(dao.isMember(member), true);
    }
}
