# Patronage Collectibles

A decentralized Patreon using the Truffle development suite, Solidity smart contracts, and React.

## Prerequisites

To get started, install the following on your machine:

- Git, Node.js, and NPM
- [Truffle CLI](https://truffleframework.com/truffle) [`v5.1.x`](https://github.com/trufflesuite/truffle/releases/tag/v5.1.1)
- [Ganache](https://truffleframework.com/ganache)
- [Metamask](https://metamask.io/)

## Solidity Learning Materials

New to Solidity? Here are some recommended resources to start with.

- [Truffle Pet Shop tutorial](https://truffleframework.com/tutorials/pet-shop): An end-to-end walkthrough of the basics of building a dApp.
- [Solidity in Depth](http://solidity.readthedocs.io/en/v0.5.0/solidity-in-depth.html): It's important to familiarize yourself with the Solidity language.
- [ERC20 Token Standard Interface](https://theethereum.wiki/w/index.php/ERC20_Token_Standard#The_ERC20_Token_Standard_Interface): Other than the Solidity, you'll want to get familiar with the ERCX standards and EIP proposals within the ecosystem. The ERC20 standard is a widely adopted interface for tokens.
- [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity): Once you have a firm grasp of the language and standards, start going through open source Solidity projects. The OpenZeppelin project is a  useful (albeit incomplete) overview of what's possible with smart contracts.
- [Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/): Helps you understand non-functional requirements within the smart contract ecosystem: design patterns, security, upgradability, and tooling.
- [Ethernaut](https://ethernaut.zeppelin.solutions/): Advanced security topics. Optional, but important.

## Getting Started

- Make sure that **Ganache is up and running locally** at port 8545.
- Go to Settings > Accounts & Keys 
- Disable `Autogenerate HD Mnemonic` and enter a Mnemonic you wish to use.
- Then, do the following:

```
git clone https://github.com/yosriady/dapp-boilerplate
npm install

truffle migrate

cd app/
yarn
npm run start
```

- Import the mnemonic you used in Ganache to Metamask.
- On Metamask, use a 'Custom Network' pointing to `localhost:8545`.
- Open your browser at `localhost:3000`.

## Thanks

**dapp-boilerplate** © 2019+, Yos Riady. Released under the [MIT] License.<br>
Authored and maintained by Yos Riady with help from contributors ([list][contributors]).

> [yos.io](http://yos.io) &nbsp;&middot;&nbsp;
> GitHub [@yosriady](https://github.com/yosriady)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/yosriady/dapp-boilerplate/contributors
