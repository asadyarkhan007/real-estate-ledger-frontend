pragma solidity 0.5.0;
 
  contract LeasedPropertyTaxContract {
      
     struct LeasedPropertyTax {
        uint id;
        uint leasePropertyId;
        uint amountPaid;
        uint submissionDate;
        uint taxYear;
        uint next;
        uint prev;
    }
        
        LeasedPropertyTax[] public leasedPropertiesTax;
        LeasedPropertyTax currentLeasedNode;
        event newIdEvent(uint newID);
        constructor() public {
            // sentinel
            leasedPropertiesTax.push(LeasedPropertyTax(0, 0, 0,0,0,0,0));
        }


    function insert(                                                                
        uint _leasePropertyId,
        uint _amountPaid,
        uint _submissionDate,
        uint _taxYear) public returns (uint newID) {

        newID = leasedPropertiesTax.length;

        leasedPropertiesTax.push(LeasedPropertyTax({
                    id:newID,                                                               
                    leasePropertyId:_leasePropertyId ,
                    amountPaid:_amountPaid,
                    submissionDate:_submissionDate,
                    taxYear:_taxYear,
                    prev: newID-1,
                    next: 0
        }));
      leasedPropertiesTax[newID-1].next=newID;
      emit newIdEvent(newID);
    }

    function isValidNode(uint id) internal view returns (bool) {
        // 0 is a sentinel and therefore invalid.
        // A valid node is the head or has a previous node.
        return id != 0 && (id == leasedPropertiesTax[0].next || leasedPropertiesTax[id].prev != 0);
    }
    
    function getLeasedPropertyTaxCount() public view returns(uint) {
      return leasedPropertiesTax.length;
    }

    function getLeasedPropertyTax(uint index) public view returns(uint,
        uint,uint,uint,uint, uint, uint) {
        return (leasedPropertiesTax[index].id, 
        leasedPropertiesTax[index].leasePropertyId,
        leasedPropertiesTax[index].amountPaid,
        leasedPropertiesTax[index].submissionDate,
        leasedPropertiesTax[index].taxYear,
        leasedPropertiesTax[index].prev,
        leasedPropertiesTax[index].next);
    }
      
}
  


