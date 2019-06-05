pragma solidity 0.5.0;
 
  contract LeasedPropertyContract {
      
     struct LeasedProperty {
        uint id;
        uint mutationId;
        uint propertyId;
        uint leaseStartDate;
        uint leaseEndDate;
        address leasedByPkey;
        bytes32 leasedByNic;
        address leasedToPkey;
        bytes32 leasedToNic;
        uint taxAmountPerYear;
        uint next;
        uint prev;
    }
        
        LeasedProperty[] public leasedProperties;
        LeasedProperty currentLeasedNode;
        event newIdEvent(uint newID);
        constructor() public {
            // sentinel
            leasedProperties.push(LeasedProperty(0, 0, 0,0,0, address(0),0x00,address(0),0x00,0,0,0));
        }


    function insert(                                                                
        uint _mutationId,
        uint _propertyId,
        uint _leaseStartDate,
        uint _leaseEndDate,
        address _leasedByPkey,
        bytes32 _leasedByNic,
        address _leasedToPkey,
        bytes32 _leasedToNic,
        uint _taxAmountPerYear) public returns (uint newID) {

        newID = leasedProperties.length;

        leasedProperties.push(LeasedProperty({
                    id:newID,                                                               
                    mutationId:_mutationId,
                    propertyId: _propertyId,
                    leaseStartDate:_leaseStartDate,
                    leaseEndDate:_leaseEndDate,
                    leasedByPkey:_leasedByPkey,
                    leasedByNic:_leasedByNic,
                    leasedToPkey:_leasedToPkey,
                    leasedToNic:_leasedToNic,
                    taxAmountPerYear:_taxAmountPerYear,
                    prev: newID-1,
                    next: 0
        }));
      leasedProperties[newID-1].next=newID;
        emit newIdEvent(newID);
    }

    function isValidNode(uint id) internal view returns (bool) {
        // 0 is a sentinel and therefore invalid.
        // A valid node is the head or has a previous node.
        return id != 0 && (id == leasedProperties[0].next || leasedProperties[id].prev != 0);
    }
    
    function getLeasedCount() public view returns(uint) {
      return leasedProperties.length;
    }

    function getLeasedFirst(uint index) public view returns(uint,
        uint,uint,uint,uint, uint, uint) {
        return (leasedProperties[index].id, 
        leasedProperties[index].mutationId,
        leasedProperties[index].propertyId,
        leasedProperties[index].leaseStartDate,
        leasedProperties[index].leaseEndDate,
        leasedProperties[index].prev,
        leasedProperties[index].next);
    }
   function getLeasedSecond(uint index) public view returns(uint,address,bytes32,uint, uint) {
        return (leasedProperties[index].id,
        leasedProperties[index].leasedByPkey,
        leasedProperties[index].leasedByNic,
        leasedProperties[index].prev, 
        leasedProperties[index].next);
    }
 function getLeasedThird(uint index) public view returns(uint,address,bytes32,uint,uint, uint) {
        return (leasedProperties[index].id,
        leasedProperties[index].leasedToPkey,
        leasedProperties[index].leasedToNic,
        leasedProperties[index].taxAmountPerYear,
        leasedProperties[index].prev, 
        leasedProperties[index].next);
    }
     
}