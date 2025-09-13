# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added a new mapping `proposalExists` to track valid proposal IDs
- Updated `createProposal` to set `proposalExists[proposalCount] = true`
- Modified `vote` and `fulfillProposal` to check `proposalExists[id]` before proceeding

### Modified
modified constructor of `Cohort_CXIII_DAO` contract to accept `admin` and `token` arguments because deployment of `DaoToken` contract could not be detected for verification.

> Submitting verification for [src/$DAO.sol:DaoToken] \
> 0x740480C56B43E867432138395572D007D9A848d3. \
> Error: Failed to verify contract: Could not detect the deployment.

Changed from this:
```solidity
constructor() {
        daoToken = new DaoToken();
        admin = msg.sender;
    }
```
to this:
```solidity
constructor(address _admin, address _token) {
        daoToken = DaoToken(_token);
        admin = _admin;
    }
```

### Deployment
- Contract: `0x7577BE91b840946796af7689c22cBC0Eb7a858B7` (Sepolia)
- Token: `0x740480C56B43E867432138395572D007D9A848d3` (Sepolia)
- Block: 9191393
