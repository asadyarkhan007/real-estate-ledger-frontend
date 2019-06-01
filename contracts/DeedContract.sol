pragma solidity 0.5.0;
 
  contract DeedContract {
      
     struct Deed {
        uint id;                                                                
        uint propertyId;
        uint stampPaperAmount;
        uint soldAmount;
        bytes32 deedType;
        bytes32 sellerFullName;
        bytes32 sellerNic;
        bytes32 sellerPKey;
        bytes32 buyerFullName;
        bytes32 buyerNic;
        bytes32 buyerPKey;
        uint next;
        uint prev;
    }
        
        Deed[] public deeds;
        Deed currentDeedNode;
        event newIdEvent(uint newID);
        constructor() public {
            // sentinel
            deeds.push(Deed(0, 0, 0, 0,0x00,0x00, 0x00,0x00,0x00,0x00,0x00,0,0));
        }


    function insert(                                                                
        uint _propertyId,
        uint _stampPaperAmount,
        uint _soldAmount,
        bytes32 _deedType,
        bytes32 _sellerFullName,
        bytes32 _sellerNic,
        bytes32 _sellerPKey,
        bytes32 _buyerFullName,
        bytes32 _buyerNic,
        bytes32 _buyerPKey) public returns (uint newID) {

        newID = deeds.length;

        deeds.push(Deed({
                 id:newID,                                                               
                 propertyId:_propertyId,
                 stampPaperAmount:_stampPaperAmount,
                 soldAmount:_soldAmount,
                 deedType:_deedType,
                 sellerFullName:_sellerFullName,
                 sellerNic:_sellerNic,
                 sellerPKey:_sellerPKey,
                 buyerFullName:_buyerFullName,
                 buyerNic:_buyerNic,
                 buyerPKey:_buyerPKey,
                 prev: newID-1,
                 next: 0
        }));
      deeds[newID-1].next=newID;
        emit newIdEvent(newID);
    }

    function isValidNode(uint id) internal view returns (bool) {
        // 0 is a sentinel and therefore invalid.
        // A valid node is the head or has a previous node.
        return id != 0 && (id == deeds[0].next || deeds[id].prev != 0);
    }
    
    function getDeedCount() public view returns(uint) {
      return deeds.length;
    }

    function getDeedFirst(uint index) public view returns(uint,
        uint,uint,uint,bytes32,uint, uint) {
        return (deeds[index].id, 
        deeds[index].propertyId,
        deeds[index].stampPaperAmount,
        deeds[index].soldAmount,
        deeds[index].deedType,
        deeds[index].prev, 
        deeds[index].next);
    }
    function getDeedSecond(uint index) public view returns(uint,
        bytes32,bytes32,bytes32,uint, uint) {
        return (deeds[index].id,
        deeds[index].sellerFullName,
        deeds[index].sellerNic,
        deeds[index].sellerPKey,
        deeds[index].prev, 
        deeds[index].next);
    }
    
     function getDeedThird(uint index) public view returns(uint,
        bytes32,bytes32,bytes32,uint, uint) {
        return (deeds[index].id,
        deeds[index].buyerFullName,
        deeds[index].buyerNic,
        deeds[index].buyerPKey,
        deeds[index].prev, 
        deeds[index].next);
    }

      
}
  


