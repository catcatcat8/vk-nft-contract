# VK ERC-1155 contract

# Deployment
Deployed on Polygon Mainnet (https://polygonscan.com/address/0xfe87e2B70CdA611301c6D063DBffD0192ADbE9df)

# Usage

## createNft
User can create single id of ERC-1155 NFT with use of `createNft()` function:
```solidity
function createNft(uint256 amount_, string calldata uri_) external
```
| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | uint256 | Amount of ids |
| uri_ | string | IPFS uri (CID) |

The id of the created NFT will be equal to the `createdIdsCount` variable in the contract at the time the function is called.

An example of creating one NFT with id equal to 5 (`createdIdsCount` is equal to 5 before call):
```
createNft(1, "QmeUgAhdTepBawrCHLyjLdyZjHBfsm5ohSCoctB1FVHa99")
```

## createBatchNfts
User can create batch ids (up to `maxCountPerBatch` specified in the contract) of ERC-1155 NFTs with use of `createBatchNfts()` function:
```solidity
function createBatchNfts(uint256 idsCount_, uint256[] calldata amounts_, string[] calldata uris_) external
```
| Name | Type | Description |
| ---- | ---- | ----------- |
| idsCount_ | uint256 | Amount of ids |
| amounts_ | uint256[] | Amounts of each id |
| uris_ | string[] | IPFS uris (CIDs) |

`idsCount_` should be equal to `amounts_` and `uris_` length.
Ids of the created NFTs will start from the `createdIdsCount` variable in the contract at the time the function is called.

An example of creating three NFTs (one of the first id, two of the second id and three of the third id) with id starts from 5 (`createdIdsCount` is equal to 5 before call):
```
createBatchNfts(3, [1, 2, 3], ["QmeUgAhdTepBawrCHLyjLdyZjHBfsm5ohSCoctB1FVHa99", "QmsomeIpfsCID", "QmsomeIpfsCID2"])
```

# Notes
Specify `https` instead of `http` in the `image` field of the JSON file uploaded to IPFS.
