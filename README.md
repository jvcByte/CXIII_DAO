# Cohort XIII DAO

A simple DAO for managing proposals and voting.

## What's Inside

- Create funding proposals
- Vote on proposals (FOR/AGAINST)
- 6-hour voting period
- Only members can vote
- Uses C13 token

## Quick Start

1. Install Foundry:
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   ```

2. Clone and install:
   ```bash
   git clone https://github.com/jvcByte/Cohort_CXIII_DAO_Foundry.git
   cd Cohort_CXIII_DAO_Foundry
   forge install
   ```

3. Run tests:
   ```bash
   forge test
   ```

## How It Works

1. Admin adds members
2. Members create proposals
3. Members vote on proposals
4. After 6 hours, anyone can execute successful proposals

## Contracts

- `Cohort_CXIII_DAO`: Main contract with voting logic
- `DaoToken`: C13 ERC20 token

## Commands

```bash
# Run all tests
forge test

# Deploy to testnet
forge script script/DAO.s.sol --rpc-url $RPC_URL --broadcast
```

## License

MIT