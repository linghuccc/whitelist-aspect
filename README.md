# White-List Aspect

## Use Case Summary

**White-List Aspect** enables contract owner to add in white list functionality after contract has been deployed on chain.

## Team Members and Roles

Team Member 1: Ric Li C - Core Dev

## Problem Addressed

Due to deadline or other distractions, sometimes developer may forget to add in Whitelist function for ERC-721 (NFT) contract. And once the contract is deployed on chain, nothing can be done to help.

## Project Design

With Aspect, this issue can be tackled easily.

Firstly we set up a white list array containing all the white list addresses.

Then we obtain caller address and called function information, and check them against pre-defined data.

If the caller address is not in the white list, then his call will be reverted.

## Value to the Artela Ecosystem

The White-List Aspect brings several valuable features to the Artela Ecosystem:

**Enhanced Security:** Developers have better control of who are allowed to access certain function even after contract has been deployed on chain.

**Flexibility:** Developers have full control of when to apply/withdraw access control. This provides extra flexibility for contract owners.

**Integration:** The White-List Aspect can be integrated into various dApps. By changing function signature, it can be used for any function besides 'mint' as illustrated in the sample project.

For more detailed information, please refer to the project repository.

## Sample Usage

-   Contract Address : https://betanet-scan.artela.network/address/0xe3Da3B2d3a32Cb42a40E128AA5Ad0704C2d09d1f

-   Aspect ID : 0x59e8125c594627F8A5A34cB750D2BFaC9E7F240d

-   Test Hash 1 : 0x184ca063a6f18b334b834ca5f81957e039c2c82219155582d36968dc70ce3e8a

-   Test Hash 2 : 0x63b472655d4014357c2475c79dffa4011deb59ad236284b47d75f58ed8b47f5a

-   Test Hash 3 : 0x0c7a175dd652aa50f0d97cf19206278f2f6e2e2498d5ca05fa4f2febc15690f2
