pragma solidity 0.5.0;
 
  contract PropertyContract {
      
     struct Property {
        uint id;
        uint plotOffChainId;
        uint propertyOffChainId;
        uint areaSqYards;
        bytes32  style;
        bytes32  propertyType;
        bytes32  kind;
        bytes32  managingOrg;
        bytes32  street;
        bytes32  city;
        bytes32  country;
        uint next;
        uint prev;
    }
        
        Property[] public properties;
        Property currentPropertyNode;
        event newIdEvent(uint newID);
        constructor() public {
            // sentinel
            properties.push(Property(0, 0, 0, 0, 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0,0));
        }


    function insert(uint _plotOffChainId,uint _propertyOffChainId,uint _areaSqYards,bytes32 _style,
        bytes32 _propertyType,bytes32 _kind,bytes32 _managingOrg,bytes32 _street,
        bytes32 _city,bytes32 _country) public returns (uint newID) {

        newID = properties.length;

        properties.push(Property({
                id:newID,
                plotOffChainId:_plotOffChainId,
                propertyOffChainId:_propertyOffChainId,
                areaSqYards:_areaSqYards,
                style:_style,
                propertyType:_propertyType,
                kind:_kind,
                managingOrg:_managingOrg,
                street:_street,
                city:_city,
                country:_country,
                prev: newID-1,
                next: 0
        }));
      properties[newID-1].next=newID;
        emit newIdEvent(newID);
    }

    function isValidNode(uint id) internal view returns (bool) {
        // 0 is a sentinel and therefore invalid.
        // A valid node is the head or has a previous node.
        return id != 0 && (id == properties[0].next || properties[id].prev != 0);
    }
    
    function getPropertyCount() public view returns(uint) {
      return properties.length;
    }

    function getPropertyFirst(uint index) public view returns(uint,
        uint,uint,uint,bytes32,uint, uint) {
        return (properties[index].id, 
        properties[index].plotOffChainId,
        properties[index].propertyOffChainId,
        properties[index].areaSqYards,
        properties[index].style,
        properties[index].prev, 
        properties[index].next);
    }
    function getPropertySecond(uint index) public view returns(uint,
        bytes32,bytes32,bytes32,uint, uint) {
        return (properties[index].id, 
        properties[index].propertyType,
        properties[index].kind,
        properties[index].managingOrg,
        properties[index].prev, 
        properties[index].next);
    }
    
     function getPropertyThird(uint index) public view returns(uint,
        bytes32,bytes32,bytes32,uint, uint) {
        return (properties[index].id, 
        properties[index].street,
        properties[index].city,
        properties[index].country,
        properties[index].prev, 
        properties[index].next);
    }

      
}
  


