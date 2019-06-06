pragma solidity 0.5.0;
 
  contract MutationContract {
      
     struct Mutation {
        uint id;
        uint signDeedId;
        uint propertyId;
        uint mutatedOn;
        uint latest;
        address mutatedByPkey;
        bytes32 mutatedByNic;
        bytes32 mutatedByFullName;
        address newOwnerPkey;
        bytes32 newOwnerNic;
        bytes32 newOwnerFullName;
        uint next;
        uint prev;
    }
        
        Mutation[] public mutations;
        Mutation currentMutationNode;
        event newIdEvent(uint newID);
        event updateMutationUpdateIdEvent(uint updatedId);
        constructor() public {
            // sentinel
            mutations.push(Mutation(0,0,0,0,0,address(0),0x00,0x00,address(0),0x00,0x00,0,0));
        }


    function insert(                                                                
        uint _signDeedId,
        uint _propertyId,
        uint _mutatedOn,
        address _mutatedByPkey,
        bytes32 _mutatedByNic,
        bytes32 _mutatedByFullName,
        address _newOwnerPkey,
        bytes32 _newOwnerNic,
        bytes32 _newOwnerFullName) public returns (uint newID) {

        newID = mutations.length;

        mutations.push(Mutation({
                    id:newID,                                                               
                    signDeedId:_signDeedId,
                    propertyId: _propertyId,
                    mutatedOn:_mutatedOn,
                    latest:1,
                    mutatedByPkey: _mutatedByPkey,
                    mutatedByNic: _mutatedByNic,
                    mutatedByFullName: _mutatedByFullName,
                    newOwnerPkey: _newOwnerPkey,
                    newOwnerNic: _newOwnerNic,
                    newOwnerFullName: _newOwnerFullName,
                    prev: newID-1,
                    next: 0
        }));
      mutations[newID-1].next=newID;
        emit newIdEvent(newID);
    }

 
    function markMutationOld(uint _id)  public returns (uint updatedId) {
      Mutation memory mutation = mutations[_id];
      mutation.latest = 0;
      mutations[_id] = mutation;
      updatedId = mutation.id;
      emit updateMutationUpdateIdEvent(updatedId);
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
        uint,uint,uint,uint,uint, uint) {
        return (mutations[index].id, 
        mutations[index].signDeedId,
        mutations[index].propertyId,
        mutations[index].mutatedOn,
        mutations[index].latest,
        mutations[index].prev, 
        mutations[index].next);
    }
   function getMutationSecond(uint index) public view returns(uint,
        address,bytes32,bytes32,uint, uint) {
        return (mutations[index].id, 
        mutations[index].mutatedByPkey,
        mutations[index].mutatedByNic,
        mutations[index].mutatedByFullName,
        mutations[index].prev, 
        mutations[index].next);
    }
    
    function getMutationThird(uint index) public view returns(uint,
        address,bytes32,bytes32,uint, uint) {
        return (mutations[index].id, 
        mutations[index].newOwnerPkey,
        mutations[index].newOwnerNic,
        mutations[index].newOwnerFullName,
        mutations[index].prev, 
        mutations[index].next);
    }

      
}
  


