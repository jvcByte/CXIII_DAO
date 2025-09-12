// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Cohort_CXIII_DAO} from "../src/Dao.sol";
import {DaoToken} from "../src/$DAO.sol";

contract Cohort_CXIII_DAO_Tests is Test {
    Cohort_CXIII_DAO public dao;
    DaoToken public daoToken;
    address public admin;
    address public testAdmin = address(0x123);
    address public user1 = address(0x1111111111111111111111111111111111111111);
    address public user2 = address(0x2222222222222222222222222222222222222222);
    address public user3 = address(0x3333333333333333333333333333333333333333);
    address public user4 = address(0x4444444444444444444444444444444444444444);
    address public user5 = address(0x5555555555555555555555555555555555555555);

    function setUp() public {
        vm.prank(testAdmin);
        dao = new Cohort_CXIII_DAO();
        daoToken = dao.daoToken();
        admin = dao.admin();
    }

    function test_Constructor_SetsAdminToDeployer() public view {
        assertEq(admin, testAdmin, "Deployer is not admin");
    }

    function test_Constructor_DeploysNewToken() public view {
        assertTrue(address(daoToken) != address(0), "$DAO Token is zero address");
        assertEq(daoToken.name(), "Cohort 13 Dao Token", "Token name should be set");
        assertEq(daoToken.symbol(), "C13", "Token symbol should be set");
        assertEq(daoToken.totalSupply(), 100_000_000_000 ether, "Initial supply should be 100M");
    }

    function test_Constructor_MintsInitialSupplyToDAO() public view {
        uint256 balance = daoToken.balanceOf(address(dao));
        assertGt(balance, 0, "DAO should have initial token balance");
    }

    function test_AddMember() public {
        vm.prank(admin);
        dao.addMember(user1);
        assertEq(dao.isMember(user1), true);
    }

    function testFuzz_AddMember(address member) public {
        vm.expectRevert();
        dao.addMember(member);
    }

    function test_CreateProposal() public {
        vm.prank(admin);
        dao.addMember(user1);

        vm.prank(user1);
        dao.createProposal(user2, 1 ether, "Test proposal");

        (address recipient, uint amount, string memory description, uint deadline, bool executed, address[] memory voters) = dao.getProposal(1);
        assertEq(description, "Test proposal");
        assertEq(amount, 1 ether);
        assertEq(recipient, user2);
        assertEq(deadline, block.timestamp + 21600);
        assertEq(executed, false);
        assertEq(voters.length, 0);
    }

    function testFuzz_CreateProposal(address recipient, uint amount, string memory description) public {
        vm.expectRevert();
        dao.createProposal(recipient, amount, description);
    }

    function test_getProposal() public {
        dao.getProposal(0);
        assertEq(dao.proposalCount(), 0);

        vm.prank(admin);
        dao.addMember(user1);
        
        vm.prank(user1);
        dao.createProposal(user2, 1 ether, "Test proposal");
        assertGt(dao.proposalCount(), 0, "Proposal count should be 1");
    }
}
