pragma solidity 0.5.0;

import { ECDSALibrary } from "./ECDSALibrary.sol"; 
  
  contract SignDeedContract {
      
     struct SignDeed {
        uint id;                                                                
        uint propertyId;
        uint deedId;
        uint soldAmount;
        bytes buyerSignature;
        bytes sellerSignature;
        uint verified;
        uint next;
        uint prev;
    }
        
        SignDeed[] public signDeeds;
        SignDeed currentDeedNode;
        event newIdEvent(uint newID);
        event updateByBuyerEvent(uint updatedId);
        event updateBySellerEvent(uint updatedId);
        constructor() public {
            // sentinel
            signDeeds.push(SignDeed(0, 0, 0,0, new bytes(0),new bytes(0) ,0 ,0 , 0));
        }


    function insert(                                                                
        uint _propertyId,
        uint _deedId,
        uint _soldAmount) public returns (uint newID) {

        newID = signDeeds.length;

        signDeeds.push(SignDeed({
                 id:newID,                                                               
                 propertyId:_propertyId,
                 deedId: _deedId,
                 soldAmount: _soldAmount,
                 buyerSignature: new bytes(0),
                 sellerSignature: new bytes(0),
                 verified:0,
                 prev: newID-1,
                 next: 0
        }));
      signDeeds[newID-1].next=newID;
        emit newIdEvent(newID);
    }
    
     function signForSeller(                                                                
        uint _signDeedId,
        bytes memory _sellerSignature) public returns (uint updatedId) {

        SignDeed memory signDeed = signDeeds[_signDeedId];
        //verify buyer signature code
        signDeed.sellerSignature=  _sellerSignature;
        signDeeds[_signDeedId] = signDeed;
        if(keccak256(signDeed.sellerSignature)  != keccak256(new bytes(0))
        && keccak256(signDeed.buyerSignature)  != keccak256(new bytes(0))){
            verifySignature(address(0),signDeed.soldAmount,1,signDeed.sellerSignature);
            verifySignature(address(0),signDeed.soldAmount,1,signDeed.buyerSignature);
            signDeed.verified=1;
            signDeeds[_signDeedId] = signDeed;
        }
        updatedId = signDeed.id;
        emit updateBySellerEvent(updatedId);
    }
    
        
     function signForBuyer(                                                                
        uint _signDeedId,
        bytes memory _buyerSignature) public returns (uint updatedId) {

        SignDeed memory signDeed = signDeeds[_signDeedId];
        //verify buyer signature code
        signDeed.buyerSignature=_buyerSignature;
        signDeeds[_signDeedId] = signDeed;
        if(keccak256(signDeed.sellerSignature)  != keccak256(new bytes(0))
        && keccak256(signDeed.buyerSignature)  != keccak256(new bytes(0))){
            verifySignature(address(0),signDeed.soldAmount,1,signDeed.sellerSignature);
            verifySignature(address(0),signDeed.soldAmount,1,signDeed.buyerSignature);
            signDeed.verified=1;
            signDeeds[_signDeedId] = signDeed;
        }
        
        updatedId= signDeed.id;
        emit updateByBuyerEvent(updatedId);
    }

    function isValidNode(uint id) internal view returns (bool) {
        // 0 is a sentinel and therefore invalid.
        // A valid node is the head or has a previous node.
        return id != 0 && (id == signDeeds[0].next || signDeeds[id].prev != 0);
    }
    
    function getSignDeedCount() public view returns(uint) {
      return signDeeds.length;
    }

    function getSignDeedFirst(uint index) public view returns(uint,
        uint,uint,uint,bytes memory,uint, uint) {
        return (signDeeds[index].id, 
        signDeeds[index].propertyId,
        signDeeds[index].deedId,
        signDeeds[index].soldAmount,
        signDeeds[index].sellerSignature,
        signDeeds[index].prev, 
        signDeeds[index].next);
    }
    
     function getSignDeedSecond(uint index) public view returns(uint,
        uint,uint,bytes memory,uint,uint, uint) {
        return (signDeeds[index].id, 
        signDeeds[index].propertyId,
        signDeeds[index].deedId,
        signDeeds[index].buyerSignature,
        signDeeds[index].verified,
        signDeeds[index].prev, 
        signDeeds[index].next);
    }
    
      function verify(uint _signDeedId,  uint _nonce,address _buyerPKey,address _sellerPKey) public 
      returns (uint verified){

        SignDeed memory signDeed = signDeeds[_signDeedId];
        //verify buyer
        if(verifySignature(_buyerPKey,signDeed.soldAmount,_nonce,signDeed.buyerSignature) ==1 &&
        //verifyseller
        verifySignature(_sellerPKey,signDeed.soldAmount,_nonce,signDeed.sellerSignature) ==1){
            signDeed.verified=1;
            signDeeds[_signDeedId] = signDeed;
        }
        verified =signDeed.verified;
    
    }
    
    
    
    mapping(address => mapping(uint => bool)) seenNonces;
    using ECDSALibrary for bytes32;

    function verifySignature(address owner, uint amount, uint nonce, bytes memory signature) pure public 
    returns (uint verified){verified=1;
      // This recreates the message hash that was signed on the client.
      
      bytes32 hash = keccak256(abi.encodePacked(owner, amount, nonce));
      bytes32 messageHash = hash.toEthSignedMessageHash();
    

      // Verify that the message's signer is the owner of the order
      address signer = messageHash.recover(signature);
      if(signer == owner){
            verified=1;
      }
    
    }
 
      
}
  
