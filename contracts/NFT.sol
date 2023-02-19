// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

/**
 * @title Creator of immutable ERC-1155 tokens
 * @author lebedev666e (0x666e416d73609f61C60d8A844066A0d956805118)
 */

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol';

contract NFT is ERC1155URIStorage, Ownable {
    string private constant _BASE_URI = 'https://ipfs.io/ipfs/';

    uint256 public maxCountPerBatch;
    uint256 public createdIdsCount;

    constructor(uint256 maxCountPerBatch_) ERC1155(_BASE_URI) {
        _setBaseURI(_BASE_URI);
        maxCountPerBatch = maxCountPerBatch_;
    }

    function createNft(uint256 amount_, string calldata uri_) external {
        uint256 id = createdIdsCount;
        _setURI(id, uri_);
        _mint(msg.sender, id, amount_, '');
        ++createdIdsCount;
    }

    function createBatchNfts(
        uint256 idsCount_,
        uint256[] calldata amounts_,
        string[] calldata uris_
    ) external {
        require(idsCount_ <= maxCountPerBatch, 'MAX_COUNT_PER_BATCH exceeded');
        require(idsCount_ == uris_.length, 'Ids and uris length mismatch');

        uint256[] memory ids = new uint256[](idsCount_);
        uint256 startId = createdIdsCount;
        for (uint256 i; i < idsCount_; ) {
            ids[i] = startId + i;
            _setURI(startId + i, uris_[i]);
            unchecked {
                ++i;
            }
        }
        _mintBatch(msg.sender, ids, amounts_, '');
        createdIdsCount += idsCount_;
    }

    function updateMaxCountPerBatch(uint256 count_) external onlyOwner {
        require(count_ > 1, 'Invalid count');
        maxCountPerBatch = count_;
    }
}
