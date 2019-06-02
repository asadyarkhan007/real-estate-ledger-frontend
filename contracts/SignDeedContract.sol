pragma solidity 0.5.0;
 
 import { ECDSALibrary } from "./ECDSALibrary.sol";
  contract SignDeedContract {
      
     struct SignDeed {
        uint id;                                                                
        uint propertyId;
        uint deedId;
        uint soldAmount;
        bytes32 buyerSignature;
        bytes32 sellerSignature;
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
            signDeeds.push(SignDeed(0, 0, 0,0, 0x00,0x00,0,0,0));
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
                 buyerSignature: 0x00,
                 sellerSignature: 0x00,
                 verified:0,
                 prev: newID-1,
                 next: 0
        }));
      signDeeds[newID-1].next=newID;
        emit newIdEvent(newID);
    }
    
     function signForSeller(                                                                
        uint _signDeedId,
        bytes32 _sellerSignature) public returns (uint updatedId) {

        SignDeed memory signDeed = signDeeds[_signDeedId];
        //verify buyer signature code
        signDeed.sellerSignature=_sellerSignature;
        signDeeds[_signDeedId] = signDeed;
        if(signDeed.sellerSignature  != 0
        && signDeed.buyerSignature  != 0){
            signDeed.verified=1;
            signDeeds[_signDeedId] = signDeed;
        }
        emit updateBySellerEvent(updatedId);
    }
    
     function signForBuyer(                                                                
        uint _signDeedId,
        bytes32 _buyerSignature) public returns (uint updatedId) {

        SignDeed memory signDeed = signDeeds[_signDeedId];
        //verify buyer signature code
        signDeed.buyerSignature=_buyerSignature;
        signDeeds[_signDeedId] = signDeed;
        if(signDeed.sellerSignature  != 0
        && signDeed.buyerSignature  != 0){
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
        uint,uint,uint,bytes32,uint, uint) {
        return (signDeeds[index].id, 
        signDeeds[index].propertyId,
        signDeeds[index].deedId,
        signDeeds[index].soldAmount,
        signDeeds[index].sellerSignature,
        signDeeds[index].prev, 
        signDeeds[index].next);
    }
    
     function getSignDeedSecond(uint index) public view returns(uint,
        uint,uint,bytes32,uint,uint, uint) {
        return (signDeeds[index].id, 
        signDeeds[index].propertyId,
        signDeeds[index].deedId,
        signDeeds[index].buyerSignature,
        signDeeds[index].verified,
        signDeeds[index].prev, 
        signDeeds[index].next);
    }
 

      
}
  


