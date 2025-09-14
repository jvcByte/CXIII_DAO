// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {DaoToken} from "./$DAO.sol";

enum ProposalState {
    NONE,
    VOTE_FOR,
    VOTE_AGAINST
}

struct Proposal {
    uint id;
    string description;
    address recipient;
    uint amount;
    uint deadline;
    address[] voters;
    mapping(address => ProposalState) votes;
    mapping(address => string) comments;
    bool executed;
}

contract Cohort_CXIII_DAO {
    uint constant PROPOSAL_DURATION = 21600; // 6 hours

    mapping(uint => Proposal) public proposals;
    mapping(address => bool) public isMember;

    mapping(uint => bool) public proposalExists; // jvcByte added this line
    uint public proposalCount;

    DaoToken public daoToken;
    address public admin;

    event ProposalCreated(uint id, string description, uint deadline);
    event Voted(uint id, address indexed voter, ProposalState state, string comment);
    event ProposalFulfilled(uint id, string description, address recipient, uint amount);

    constructor(address _admin, address _token) {
        daoToken = DaoToken(_token);
        admin = _admin;
    }

    function addMember(address _member) public {
        require(msg.sender == admin, "Only admin can add members");
        isMember[_member] = true;
    }

    function createProposal(address _recipient, uint amount, string memory _description) public {
        require(isMember[msg.sender], "Only members can create proposals");

        proposalCount++;
        Proposal storage _newProposal = proposals[proposalCount];

        _newProposal.id = proposalCount;
        _newProposal.description = _description;
        _newProposal.amount = amount;
        _newProposal.recipient = _recipient;
        _newProposal.deadline = block.timestamp + PROPOSAL_DURATION;
        proposalExists[proposalCount] = true; // jvcByte added this line

        emit ProposalCreated(proposalCount, _description, _newProposal.deadline);
    }

    function getProposal(uint id) public view returns (address, uint, string memory, uint, bool, address[] memory) {
        Proposal storage _proposal = proposals[id];
        return (
            _proposal.recipient,
            _proposal.amount,
            _proposal.description,
            _proposal.deadline,
            _proposal.executed,
            _proposal.voters
        );
    }

    function getUserVoteInProposal(uint id, address voter) public view returns (ProposalState state, string memory comment) {
        Proposal storage _proposal = proposals[id];
        return (_proposal.votes[voter], _proposal.comments[voter]);
    }

    function vote(uint id, ProposalState state, string memory comment) public {
        require(isMember[msg.sender], "Non-members are not allowed to vote");
        require(proposalExists[id], "Proposal does not exist"); // jvcByte added this line
        require(block.timestamp < proposals[id].deadline, "Proposal deadline has passed");
        require(proposals[id].votes[msg.sender] == ProposalState.NONE, "You have already voted on this proposal");
        require(
            state == ProposalState.VOTE_FOR || state == ProposalState.VOTE_AGAINST,
            "Invalid proposal state"
        );

        proposals[id].votes[msg.sender] = state;
        proposals[id].comments[msg.sender] = comment;
        proposals[id].voters.push(msg.sender);

        emit Voted(id, msg.sender, state, comment);
    }

    function fulfillProposal(uint id) public {
        require(proposalExists[id], "Proposal does not exist"); // jvcByte added this line 
        Proposal storage pr = proposals[id];
        require(block.timestamp > pr.deadline, "Proposal deadline has not passed yet");
        require(!pr.executed, "Proposal has already been executed");
        require(daoToken.balanceOf(address(this)) >= pr.amount, "Insufficient DAO funds");

        uint forVotes;
        uint againstVotes;
        for (uint i = 0; i < pr.voters.length; i++) {
            if (pr.votes[pr.voters[i]] == ProposalState.VOTE_FOR) {
                forVotes++;
            } else if (pr.votes[pr.voters[i]] == ProposalState.VOTE_AGAINST) {
                againstVotes++;
            }
        }
        require(forVotes > againstVotes, "Proposal rejected");

        pr.executed = true;

        daoToken.transfer(pr.recipient, pr.amount);

        emit ProposalFulfilled(id, pr.description, pr.recipient, pr.amount);
    }
}
