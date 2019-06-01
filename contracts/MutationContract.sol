pragma solidity 0.5.0;
 
  contract MutationContract {
      
     struct Mutation {
        uint id;
        uint saleDeedId;
        uint propertyId;
        bytes32 oldOwnerFullName;
        bytes32 oldOwnerNic;
        bytes32 newOwnerFullName;
        bytes32 newOwnerNic;
        address mutatedBy;
        uint next;
        uint prev;
    }
        
        Mutation[] public mutations;
        Mutation currentMutationNode;
        event newIdEvent(uint newID);
        constructor() public {
            // sentinel
            mutations.push(Mutation(0, 0, 0,0x00,0x00, 0x00,0x00,address(0),0,0));
        }


    function insert(                                                                
        uint _saleDeedId,
        uint _propertyId,
        bytes32 _oldOwnerFullName,
        bytes32 _oldOwnerNic,
        bytes32 _newOwnerFullName,
        bytes32 _newOwnerNic,
        address _mutatedBy) public returns (uint newID) {

        newID = mutations.length;

        mutations.push(Mutation({
                    id:newID,                                                               
                    saleDeedId:_saleDeedId,
                    propertyId: _propertyId,
                    oldOwnerFullName:_oldOwnerFullName,
                    oldOwnerNic:_oldOwnerNic,
                    newOwnerFullName:_newOwnerFullName,
                    newOwnerNic:_newOwnerNic,
                    mutatedBy:_mutatedBy,
                    prev: newID-1,
                    next: 0
        }));
      mutations[newID-1].next=newID;
        emit newIdEvent(newID);
    }

    function isValidNode(uint id) internal view returns (bool) {
        // 0 is a sentinel and therefore invalid.
        // A valid node is the head or has a previous node.
        return id != 0 && (id == mutations[0].next || mutations[id].prev != 0);
    }
    
    function getMutationCount() public view returns(uint) {
      return mutations.length;
    }

    function getMutationFirst(uint index) public view returns(uint,
        uint,uint,bytes32,bytes32,uint, uint) {
        return (mutations[index].id, 
        mutations[index].saleDeedId,
        mutations[index].propertyId,
        mutations[index].oldOwnerFullName,
        mutations[index].oldOwnerNic,
        mutations[index].prev, 
        mutations[index].next);
    }
   function getMutationSecond(uint index) public view returns(uint,
        bytes32,bytes32,address,uint, uint) {
        return (mutations[index].id, 
        mutations[index].newOwnerFullName,
        mutations[index].newOwnerNic,
        mutations[index].mutatedBy,
        mutations[index].prev, 
        mutations[index].next);
    }

      
}
  


