// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Cohort_CXIII_DAO} from "../src/Dao.sol";
import {DaoToken} from "../src/$DAO.sol";
import {ProposalState} from "../src/Dao.sol";

contract Cohort_CXIII_DAO_Tests is Test {
    Cohort_CXIII_DAO public dao;
    DaoToken public daoToken;
    address public admin;
    address public testAdmin = address(0x123);
    address public member1 = address(0x1111111111111111111111111111111111111111);
    address public member2 = address(0x2222222222222222222222222222222222222222);
    address public member3 = address(0x3333333333333333333333333333333333333333);
    address public member4 = address(0x4444444444444444444444444444444444444444);
    address public member5 = address(0x5555555555555555555555555555555555555555);

    address public nonMember = address(0x6666666666666666666666666666666666666666);

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
        dao.addMember(member1);
        assertEq(dao.isMember(member1), true);
    }

    function testFuzz_AddMember(address member) public {
        vm.expectRevert();
        dao.addMember(member);
    }

    function test_CreateProposal() public {
        vm.prank(admin);
        dao.addMember(member1);

        vm.prank(member1);
        dao.createProposal(member2, 1 ether, "Test proposal");

        (address recipient, uint amount, string memory description, uint deadline, bool executed, address[] memory voters) = dao.getProposal(1);
        assertEq(description, "Test proposal");
        assertEq(amount, 1 ether);
        assertEq(recipient, member2);
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
        dao.addMember(member1);

        vm.prank(member1);
        dao.createProposal(member2, 1 ether, "Test proposal");
        assertGt(dao.proposalCount(), 0, "Proposal count should be 1");
    }

    function test_Vote() public {
        vm.startPrank(admin);
        dao.addMember(member1);
        dao.addMember(member2);
        dao.addMember(member3);
        dao.addMember(member4);
        dao.addMember(member5);
        vm.stopPrank();

        vm.prank(member1);
        dao.createProposal(nonMember, 1 ether, "Host hackathon");

        vm.prank(member2);
        dao.vote(1, ProposalState.VOTE_FOR, "Good idea");

        vm.prank(member3);
        dao.vote(1, ProposalState.VOTE_AGAINST, "I won't benefit from this");

        vm.prank(member4);
        dao.vote(1, ProposalState.VOTE_FOR, "I want to test my skills");

        vm.prank(member5);
        dao.vote(1, ProposalState.VOTE_AGAINST, "Just a means to test your product and pay peanut");

        vm.prank(nonMember);
        vm.expectRevert();
        dao.vote(1, ProposalState.VOTE_FOR, "Want to be part of a team");
    }

    function testFuzz_Vote(uint id, uint8 state, string memory comment) public {
        vm.assume(state == 1 || state == 2);
        id = 1;
    
        vm.startPrank(admin);
        dao.addMember(member1);
        dao.addMember(member2);
        vm.stopPrank();
    
        vm.prank(member1);
        dao.createProposal(member2, 1 ether, "Test proposal");
    
        vm.prank(member2);
        dao.vote(id, ProposalState(state), comment);
    
        (ProposalState voteState, ) = dao.getUserVoteInProposal(id, member2);
        assertEq(uint256(voteState), state, "Vote state should match");
    }

}
