App = {
  web3Provider: null,
  contracts: {},
  deployedContracts: {},
  adminAccount: "0x0",
  stdGasAmount:3000000,
  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== "undefined") {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:8545"
      );
      web3 = new Web3(App.web3Provider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:8545"
      );
      web3 = new Web3(App.web3Provider);
    }
    web3.eth.defaultAccount = web3.eth.accounts[0];
    adminAccount = web3.eth.accounts[0];
    return App.initContract();
  },
  setDefaultAccount(account){
       web3.eth.defaultAccount = account;
  },
  initContract: function() {
    $.getJSON(window.location.origin + "/json/PropertyContract.json", function(
      PropertyContract
    ) {
      App.contracts.propertyContract = TruffleContract(PropertyContract);
      App.contracts.propertyContract.setProvider(App.web3Provider);
      App.contracts.propertyContract.deployed().then(function(instance) {
        App.deployedContracts.propertyContract = instance;
        instance
          .newIdEvent(
            {},
            {
              fromBlock: 0,
              toBlock: "latest"
            }
          )
          .watch(function(error, event) {
            //console.log("event triggered", event)
            // Reload screen
          });
      });
    });
    $.getJSON(window.location.origin + "/json/DeedContract.json", function(
      DeedContract
    ) {
      App.contracts.deedContract = TruffleContract(DeedContract);
      App.contracts.deedContract.setProvider(App.web3Provider);
      App.contracts.deedContract.deployed().then(function(instance) {
        App.deployedContracts.deedContract = instance;
        instance
          .newIdEvent(
            {},
            {
              fromBlock: 0,
              toBlock: "latest"
            }
          )
          .watch(function(error, event) {
            //console.log("event triggered", event)
            // Reload screen
          });
      });
    });
    $.getJSON(window.location.origin + "/json/MutationContract.json", function(
      MutationContract
    ) {
      App.contracts.mutationContract = TruffleContract(MutationContract);
      App.contracts.mutationContract.setProvider(App.web3Provider);
      App.contracts.mutationContract.deployed().then(function(instance) {
        App.deployedContracts.mutationContract = instance;
        instance
          .newIdEvent(
            {},
            {
              fromBlock: 0,
              toBlock: "latest"
            }
          )
          .watch(function(error, event) {
            // console.log("event triggered", event)
            // Reload screen
          });
      });
    });
    $.getJSON(
      window.location.origin + "/json/LeasedPropertyContract.json",
      function(LeasedPropertyContract) {
        App.contracts.leasedPropertyContract = TruffleContract(
          LeasedPropertyContract
        );
        App.contracts.leasedPropertyContract.setProvider(App.web3Provider);
        App.contracts.leasedPropertyContract
          .deployed()
          .then(function(instance) {
            App.deployedContracts.leasedPropertyContract = instance;
            instance
              .newIdEvent(
                {},
                {
                  fromBlock: 0,
                  toBlock: "latest"
                }
              )
              .watch(function(error, event) {
                //console.log("event triggered", event)
                // Reload screen
              });
          });
      }
    );
    $.getJSON(
      window.location.origin + "/json/LeasedPropertyTaxContract.json",
      function(LeasedPropertyTaxContract) {
        App.contracts.leasedPropertyTaxContract = TruffleContract(
          LeasedPropertyTaxContract
        );
        App.contracts.leasedPropertyTaxContract.setProvider(App.web3Provider);
        App.contracts.leasedPropertyTaxContract
          .deployed()
          .then(function(instance) {
            App.deployedContracts.leasedPropertyTaxContract = instance;
            instance
              .newIdEvent(
                {},
                {
                  fromBlock: 0,
                  toBlock: "latest"
                }
              )
              .watch(function(error, event) {
                //console.log("event triggered", event)
                // Reload screen
              });
          });
      }
    );

      $.getJSON(
      window.location.origin + "/json/SignDeedContract.json",
      function(SignDeedContract) {
        App.contracts.signDeedContract = TruffleContract(
          SignDeedContract
        );
        App.contracts.signDeedContract.setProvider(App.web3Provider);
        App.contracts.signDeedContract
          .deployed()
          .then(function(instance) {
            App.deployedContracts.signDeedContract = instance;
            instance
              .newIdEvent(
                {},
                {
                  fromBlock: 0,
                  toBlock: "latest"
                }
              )
              .watch(function(error, event) {
                //console.log("event triggered", event)
                // Reload screen
              });
          });
      }
    );
  },
  // Property Crud Start
  insertPropertyData: function(
    _propertyOffChainId,
    _propertyNo,
    _areaSqYards,
    _propertyType,
    _kind,
    _managingOrg,
    _street,
    _city,
    _province,
    _country,
    _fromAddress,
    _gas
  ) {
    return App.deployedContracts.propertyContract
      .insert(
        _propertyOffChainId,
        App.convertToBytes(_propertyNo),
        _areaSqYards,
        App.convertToBytes(_propertyType),
        App.convertToBytes(_kind),
        App.convertToBytes(_managingOrg),
        App.convertToBytes(_street),
        App.convertToBytes(_city),
        App.convertToBytes(_province),
        App.convertToBytes(_country),
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },
  getPropertyCount: function() {
    return App.deployedContracts.propertyContract
      .getPropertyCount()
      .then(function(size) {
        return JSON.parse(size) - 1;
      });
  },
  getPropertyDetail: function(id) {
    return App.deployedContracts.propertyContract
      .getPropertyFirst(id)
      .then(function(_firstData) {
        let firstData = _firstData;
        return App.deployedContracts.propertyContract
          .getPropertySecond(id)
          .then(function(_secondData) {
            let secondData = _secondData;
            return App.deployedContracts.propertyContract
              .getPropertyThird(id)
              .then(function(_thirdData) {
                let thirdData = _thirdData;
                return {
                  id: App.transformValue(firstData[0]),
                  propertyOffChainId: App.transformValue(firstData[1]),
                  propertyNo: App.transformValue(firstData[2]),
                  areaSqYards: App.transformValue(firstData[3]),
                  propertyType : App.transformValue(firstData[4]),
                  kind: App.transformValue(secondData[1]),
                  managingOrg: App.transformValue(secondData[2]),
                  street: App.transformValue(secondData[3]),
                  city: App.transformValue(thirdData[1]),
                  province: App.transformValue(thirdData[2]),
                  country: App.transformValue(thirdData[3]),
                  prevId: App.transformValue(thirdData[4]),
                  nextId: App.transformValue(thirdData[5])
                };
              });
          });
      });
  },
  getPropertyList: async function() {
    let list = [];
    let length = await App.getPropertyCount();
    if (length > 0) {
      let obj = await App.getPropertyDetail(0);
      while (App.transformValue(obj.nextId) != 0) {
        obj = await App.getPropertyDetail(App.transformValue(obj.nextId));
        list.push(obj);
      }
    }
    return list;
  },
   getPropertyIdByOffChainPropertyId: async function(_offChainPropertyId) {

    let length = await App.getPropertyCount();
    if (length > 0) {
      let obj = await App.deployedContracts.propertyContract
      .getPropertyFirst(0);  
      while (App.transformValue(obj[5]) != 0) {
        obj = await App.deployedContracts.propertyContract
      .getPropertyFirst(obj[5]);
        if(App.transformValue(obj[1]) ===_offChainPropertyId){
          return App.transformValue(obj[0]);
        }
      }
    }
    return null;
  },
  getPropertyByOffChainPropertyId: function(_OffChainPropertyId) {

    return App.getPropertyList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyOffChainId === _OffChainPropertyId) {
          return list[i];
        }
      }
      return null;
    });
  },
  getOwnershipOfPropertyByOffChainPropertyId: async function(_OffChainPropertyId) {

    return App.getPropertyList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyOffChainId === _OffChainPropertyId) {
          let obj = list[i];
         return App.getMutationAndSaleAndSignDeedByPropertyId(obj.id).then(function(_mutationList){
          obj.mutationList = _mutationList;
          return obj;
         });      
        }
      }
      return null;
    });
  },
   insertPropertyDataIfNotExist: async function(
    _propertyOffChainId,
    _propertyNo,
    _areaSqYards,
    _propertyType,
    _kind,
    _managingOrg,
    _street,
    _city,
    _province,
    _country,
    _fromAddress,
    _gas
  ) {
    let obj = await App.getPropertyByOffChainPropertyId(_propertyOffChainId);
    if(obj != null){
      console.log("property already exist");
      return;
    }
    return App.deployedContracts.propertyContract
      .insert(
        _propertyOffChainId,
        App.convertToBytes(_propertyNo),
        _areaSqYards,
        App.convertToBytes(_propertyType),
        App.convertToBytes(_kind),
        App.convertToBytes(_managingOrg.toLowerCase()),
        App.convertToBytes(_street),
        App.convertToBytes(_city),
        App.convertToBytes(_province),
        App.convertToBytes(_country),
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },

  syncOffChainPropertiesToBlockChain: function(list) {
    for (let i = 0; i < list.length; i++) {
      let obj = App.getPropertyByOffChainPropertyId(list[i].propertyOffChainId);
      if (obj != null) {
        App.insertPropertyData(      
          obj.propertyOffChainId,
          obj.propertyNo,
          obj.areaSqYards,        
          obj.propertyType,
          obj.kind,
          obj.managingOrg,
          obj.street,
          obj.city,
          obj.province,
          obj.country,
          obj.fromAddress,
          obj.gas
        );
      }
    }
  },

  // Property Crud End

  // Deed Crud Start
  insertDeedData: function(
    _propertyId,
    _stampPaperAmount,
    _soldAmount,
    _deedType,
    _sellerFullName,
    _sellerNic,
    _sellerPKey,
    _buyerFullName,
    _buyerNic,
    _buyerPKey,
    _fromAddress,
    _gas
  ) {
    return App.deployedContracts.deedContract
      .insert(
        _propertyId,
        _stampPaperAmount,
        _soldAmount,
        App.convertToBytes(_deedType),
        App.convertToBytes(_sellerFullName),
        App.convertToBytes(_sellerNic),
        _sellerPKey,
        App.convertToBytes(_buyerFullName),
        App.convertToBytes(_buyerNic),
        _buyerPKey,
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },
  getDeedCount: function() {
    return App.deployedContracts.deedContract
      .getDeedCount()
      .then(function(size) {
        return JSON.parse(size) - 1;
      });
  },
  getDeedDetail: async function(id) {
    return App.deployedContracts.deedContract
      .getDeedFirst(id)
      .then(function(_firstData) {
        let firstData = _firstData;
        return App.deployedContracts.deedContract
          .getDeedSecond(id)
          .then(function(_secondData) {
            let secondData = _secondData;
            return App.deployedContracts.deedContract
              .getDeedThird(id)
              .then(function(_thirdData) {
                let thirdData = _thirdData;
                return {
                  id: App.transformValue(firstData[0]),
                  propertyId: App.transformValue(firstData[1]),
                  stampPaperAmount: App.transformValue(firstData[2]),
                  soldAmount: App.transformValue(firstData[3]),
                  deedType: App.transformValue(firstData[4]),
                  sellerFullName: App.transformValue(secondData[1]),
                  sellerNic: App.transformValue(secondData[2]),
                  sellerPKey: secondData[3].substring(0, 42),
                  buyerFullName: App.transformValue(thirdData[1]),
                  buyerNic: App.transformValue(thirdData[2]),
                  buyerPKey: thirdData[3].substring(0, 42),
                  prevId: App.transformValue(thirdData[4]),
                  nextId: App.transformValue(thirdData[5])
                };
              });
          });
      });
  },
  getDeedList: async function() {
    let list = [];
    let length = await App.getDeedCount();
    if (length > 0) {
      let obj = await App.getDeedDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getDeedDetail(obj.nextId);
        list.push(obj);
      }
    }
    return list;
  },
  getDeedByPropertyId: function(_propertyId) {
   return  App.getDeedList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyId === _propertyId) {
          return list[i];
        }
      }
      return null;
    });
  },

   getDeedByPropertyIdAndSellerAndBuyerNIC: function(_propertyId,_sellerNic,_buyerNic) {
   return  App.getDeedList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyId === _propertyId &&
          list[i].buyerNic === _buyerNic && list[i].sellerNic === _sellerNic) {
          return list[i];
        }
      }
      return null;
    });
  },

  insertDeedDataIfNotExist: async function(
    _propertyId,
    _stampPaperAmount,
    _soldAmount,
    _deedType,
    _sellerFullName,
    _sellerNic,
    _sellerPKey,
    _buyerFullName,
    _buyerNic,
    _buyerPKey,
    _fromAddress,
    _gas
  ) {
    let obj = await App.getDeedByPropertyIdAndSellerAndBuyerNIC(_propertyId,_sellerNic,_buyerNic);
    if(obj != null){
      console.log("deed already exist");
      return;
    }

    return App.deployedContracts.deedContract
      .insert(
        _propertyId,
        _stampPaperAmount,
        _soldAmount,
        App.convertToBytes(_deedType),
        App.convertToBytes(_sellerFullName),
        App.convertToBytes(_sellerNic),
        _sellerPKey,
        App.convertToBytes(_buyerFullName),
        App.convertToBytes(_buyerNic),
        _buyerPKey,
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },

  // Deed Crud End

   // SignDeed Start
  insertSignDeedData: function(
        _propertyId,
        _deedId,
        _soldAmount,
        _fromAddress,
        _gas
  ) {
    return App.deployedContracts.signDeedContract
      .insert(
        _propertyId,
        _deedId,
        _soldAmount,
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },
   insertSignDeedDataIfNotExist: async function(
        _propertyId,
        _deedId,
        _soldAmount,
        _fromAddress,
        _gas
  ) {
    let obj = await App.getSignDeedByDeedId(_deedId);
    if(obj != null){
      console.log("sign deed already exist");
      return;
    }
    return App.deployedContracts.signDeedContract
      .insert(
        _propertyId,
        _deedId,
        _soldAmount,
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },
   signDeedForSellerIfNotSign: async function(
        _signDeedId,
        _soldAmount,
        _fromAddress,
        _gas
  ) {
    let obj = await App.getSignDeedDetail(_signDeedId);
    if(obj == null){
      throw "sign deed not exist";
    }
    if(obj.sellerSignature != "0x"){
      throw "already signed";
    }
    const messageHash = web3.sha3( _soldAmount +"");
    const signature = await web3.eth.sign(web3.eth.defaultAccount,messageHash);
        
    return App.deployedContracts.signDeedContract
      .signForSeller(
        _signDeedId,
        signature,
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },

   signDeedForBuyerIfNotSign: async function(
        _signDeedId,
        _soldAmount,
        _fromAddress,
        _gas
  ) {
    let obj = await App.getSignDeedDetail(_signDeedId);
    if(obj == null){
      throw "sign deed not exist";
    }
    if(obj.buyerSignature != "0x"){
      throw "already signed";
    }
    const messageHash = web3.sha3( _soldAmount +"");
    const signature = await web3.eth.sign(web3.eth.defaultAccount,messageHash);
        
    return App.deployedContracts.signDeedContract
      .signForBuyer(
        _signDeedId,
        signature,
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },
  getSignDeedCount: function() {
    return App.deployedContracts.signDeedContract
      .getSignDeedCount()
      .then(function(size) {
        return JSON.parse(size) - 1;
      });
  },
  getSignDeedDetail: async function(id) {
    return App.deployedContracts.signDeedContract
      .getSignDeedFirst(id)
      .then(function(_firstData) {
        let firstData = _firstData;
        return App.deployedContracts.signDeedContract
          .getSignDeedSecond(id)
          .then(function(_secondData) {
            let secondData = _secondData;
                return {
                  id: App.transformValue(firstData[0]),
                  propertyId: App.transformValue(firstData[1]),
                  deedId: App.transformValue(firstData[2]),
                  soldAmount: App.transformValue(firstData[3]),
                  sellerSignature: firstData[4],
                  buyerSignature: secondData[3],
                  verified: App.transformValue(secondData[4]),
                  prevId: App.transformValue(secondData[5]),
                  nextId: App.transformValue(secondData[6])
                };
              });
          });
  },
  getSignDeedWithDeedAndPropertyBySignDeedId: async function(_signDeed){
    let obj = await App.getSignDeedDetail(_signDeed);
    if(obj!= null){
      obj.deed = await App.getDeedDetail(obj.deedId);
      obj.property =  await App.getPropertyDetail(obj.propertyId);
      return obj;
    }
    return obj;
  },
  getSignDeedList: async function() {
    let list = [];
    let length = await App.getSignDeedCount();
    if (length > 0) {
      let obj = await App.getSignDeedDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getSignDeedDetail(obj.nextId);
        list.push(obj);
      }
    }
    return list;
  },
  getDeedListWithSignature: async function() {
    let list = [];
    let length = await App.getDeedCount();
    if (length > 0) {
      let obj = await App.getDeedDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getDeedDetail(obj.nextId);
        let signDeed = await App.getSignDeedByDeedId(obj.id);
        obj.signDeed = signDeed;
        list.push(obj);
      }
    }
    return list;
  },
   getDeedListWithSignatureAndProperty: async function() {
    let list = [];
    let length = await App.getDeedCount();
    if (length > 0) {
      let obj = await App.getDeedDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getDeedDetail(obj.nextId);
        let signDeed = await App.getSignDeedByDeedId(obj.id);
        obj.signDeed = signDeed;
        let property = await App.getPropertyDetail(signDeed.propertyId);
        obj.property = property;
        list.push(obj);
      }
    }
    return list;
  },
  getSignDeedByPropertyId: function(_propertyId) {
   return App.getSignDeedList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyId === _propertyId) {
          return list[i];
        }
      }
      return null;
    });
  },

   getSignDeedByDeedId: function(_deedId) {
   return App.getSignDeedList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].deedId === _deedId) {
          return list[i];
        }
      }
      return null;
    });
  },

  getPendingSignatureListByNic: async function(_nic) {
    let list =  await App.getDeedListWithSignature();
    let pendingList = [];
    for(let i=0;i<list.length; i++){
      if(list[i].sellerNic === _nic && list[i].signDeed != null &&
        list[i].signDeed.verified === 0 && list[i].signDeed.sellerSignature === "0x"){        
        let obj =list[i]; 
        obj.pendingAs="seller";
        obj.property = await App.getPropertyDetail(obj.propertyId);
        list[i] = obj;
        pendingList.push(list[i]);
      }else if(list[i].buyerNic === _nic && list[i].signDeed != null && 
        list[i].signDeed.verified === 0 && list[i].signDeed.buyerSignature === "0x"){      
        let obj =list[i]; 
        obj.pendingAs="buyer";
        obj.property = await App.getPropertyDetail(obj.propertyId);
        list[i] = obj;
        pendingList.push(list[i]);
      }
    }
    return pendingList;
  },

  getPendingMutationListForRegistrar: async function(_managingOrg) {
    let list =  await App.getDeedListWithSignatureAndProperty();
    let verifiedList = [];
    for(let i=0;i<list.length; i++){
      if(list[i].signDeed != null &&
        list[i].signDeed.verified === 1 && list[i].property.managingOrg === _managingOrg.toLowerCase()){
        let mutationExist = await App.getMutationBySignDeedId(list[i].signDeed.id);
        if(mutationExist === null){
          let obj =list[i]; 
          obj.pendingAs="mutation";      
          list[i] = obj;
          verifiedList.push(list[i]);
        }
      }
    }
    return verifiedList;
  },

  getPendingSignatureListByPublicKey: async function(_publicKey) {
     let list =  await App.getDeedListWithSignature();
    let pendingList = [];
    for(let i=0;i<list.length; i++){
      if(new String(list[i].sellerPKey).toLowerCase() === new String(_publicKey).toLowerCase() && list[i].signDeed != null &&
        list[i].signDeed.verified === 0 && web3.toDecimal(list[i].signDeed.sellerSignature) === 0){      
        let obj =list[i]; 
        obj.pendingAs="seller";
        list[i] = obj;
        pendingList.push(list[i]);
      }else if(new String(list[i].buyerPKey).toLowerCase() === new String(_publicKey).toLowerCase() && list[i].signDeed != null && 
        list[i].signDeed.verified === 0 && web3.toDecimal(list[i].signDeed.buyerSignature) === 0){        
        let obj =list[i]; 
        obj.pendingAs="buyer";
        list[i] = obj;
      }
    }
    return pendingList;
  },

  // SignDeed Crud End

  // Mutation  Start
  insertMutationData: function(
    _signDeedId,
    _propertyId,
    _mutatedOn,
    _mutatedByPkey,
    _mutatedByNic,
    _mutatedByFullName,
    _newOwnerPkey,
    _newOwnerNic,
    _newOwnerFullName,
    _fromAddress,
    _gas
  ) {
    return App.deployedContracts.mutationContract
      .insert(
        _signDeedId,
        _propertyId,
        _mutatedOn,
        _mutatedByPkey,
        App.convertToBytes(_mutatedByNic),
        App.convertToBytes(_mutatedByFullName),
        _newOwnerPkey,
        App.convertToBytes(_newOwnerNic),
        App.convertToBytes(_newOwnerFullName),         
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },
    insertMutationDataWhileMarkLastOneOld: async function(
    _signDeedId,
    _propertyId,
    _mutatedOn,
    _mutatedByPkey,
    _mutatedByNic,
    _mutatedByFullName,
    _newOwnerPkey,
    _newOwnerNic,
    _newOwnerFullName,
    _fromAddress,
    _gas
  ) {

    let mutation = await App.getLatestMutationByPropertyId(_propertyId);
    if(mutation != null){

      if(mutation.newOwnerNic === _newOwnerNic &&
        mutation.propertyId === _propertyId){
          throw "Already Mutated";
      }else{
          let trans =  await App.markMutationOld(mutation.id,_fromAddress,_gas);
          console.log(trans);
      }
    }

    return App.deployedContracts.mutationContract
      .insert(
        _signDeedId,
        _propertyId,
        _mutatedOn,
        _mutatedByPkey,
        App.convertToBytes(_mutatedByNic),
        App.convertToBytes(_mutatedByFullName),
        _newOwnerPkey,
        App.convertToBytes(_newOwnerNic),
        App.convertToBytes(_newOwnerFullName),        
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },
  markMutationOld: function (_mutationId,  _fromAddress,
    _gas){
     return App.deployedContracts.mutationContract
     .markMutationOld(_mutationId, { from: _fromAddress, gas: _gas })
     .then(function(response){
      return response;
     });
  },
  getMutationCount: function() {
    return App.deployedContracts.mutationContract
      .getMutationCount()
      .then(function(size) {
        return JSON.parse(size) - 1;
      });
  },
  getMutationDetail: function(id) {
    return App.deployedContracts.mutationContract
      .getMutationFirst(id)
      .then(function(_firstData) {
        let firstData = _firstData;
        return App.deployedContracts.mutationContract
          .getMutationSecond(id)
          .then(function(_secondData) {
            let secondData = _secondData;
             return App.deployedContracts.mutationContract
              .getMutationThird(id)
              .then(function(_thirdData) {
                let thirdData = _thirdData;
                return {
                  id: App.transformValue(firstData[0]),
                  signDeedId: App.transformValue(firstData[1]),
                  propertyId: App.transformValue(firstData[2]),
                  mutatedOn: App.transformValue(firstData[3]),
                  latest: App.transformValue(firstData[4]),
                  mutatedByPkey: secondData[1].substring(0, 42),
                  mutatedByNic: App.transformValue(secondData[2]),
                  mutatedByFullName: App.transformValue(secondData[3]),
                  newOwnerPkey: thirdData[1].substring(0, 42),
                  newOwnerNic: App.transformValue(thirdData[2]),
                  newOwnerFullName: App.transformValue(thirdData[3]),
                  prevId: App.transformValue(thirdData[4]),
                  nextId: App.transformValue(thirdData[5])
                };
              });
            });
      });
  },
  getMutationList: async function() {
    let list = [];
    let length = await App.getMutationCount();
    if (length > 0) {
      let obj = await App.getMutationDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getMutationDetail(obj.nextId);
        list.push(obj);
      }
    }
    return list;
  },
  getMutationListWithProperties: async function() {
    let list = [];
    let length = await App.getMutationCount();
    if (length > 0) {
      let obj = await App.getMutationDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getMutationDetail(obj.nextId);
        let property = await App.getPropertyDetail(obj.propertyId);
        obj.property = property;
        list.push(obj);
      }
    }
    return list;
  },
  getLeasableProperties: async function() {
    let list = [];
    let length = await App.getMutationCount();
    if (length > 0) {
      let obj = await App.getMutationDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getMutationDetail(obj.nextId);
        if(obj.latest ===1){
          obj.leasedPropertyList = await App.getLeasedPropertyListByMutationId(obj.id);
          if(obj.leasedPropertyList.length ===0 ){
            let property = await App.getPropertyDetail(obj.propertyId);
            obj.property = property;
            list.push(obj);
          }else{
            let result = obj.leasedPropertyList.filter(function(lease)
            { return lease.leaseStartDate<= new Date().getTime() &&
            lease.leaseEndDate >= new Date().getTime(); });
            if(result == null){
              let property = await App.getPropertyDetail(obj.propertyId);
              obj.property = property;
              list.push(obj);
            }
          }
        }
      }
    }
    return list;
  },
  getLeasableProperties: async function(managingOrg) {
    let list = [];
    let length = await App.getMutationCount();
    if (length > 0) {
      let obj = await App.getMutationDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getMutationDetail(obj.nextId);
        if(obj.latest ===1){
          obj.leasedPropertyList = await App.getLeasedPropertyListByMutationId(obj.id);
          if(obj.leasedPropertyList.length ===0 ){
            let property = await App.getPropertyDetail(obj.propertyId);
            if(managingOrg===property.managingOrg){
            obj.property = property;
            list.push(obj);
          }
          }else{
            let result = obj.leasedPropertyList.filter(function(lease)
            { return lease.leaseStartDate<= new Date().getTime() &&
            lease.leaseEndDate >= new Date().getTime(); });
            if(result == null){
              let property = await App.getPropertyDetail(obj.propertyId);
              if(managingOrg===property.managingOrg){
              obj.property = property;
              list.push(obj);
              }
            }
          }
        }
      }
    }
    return list;
  },
  getMutatedPropertiesForRegistrarByManagingOrgAndProperties: async function(_managingOrg,properties) {
      let mutationListWithProperties = await App.getMutationListWithProperties();
      let mutatedProperties = [];
      for(let i =0 ; i < mutationListWithProperties.length; i++){
              let obj = App.findOffChainProperty(properties,
              mutationListWithProperties[i].property.propertyOffChainId);
              if(obj != null  && mutationListWithProperties[i].property.managingOrg === _managingOrg.toLowerCase()
                && mutationListWithProperties[i].latest === 1){
              obj.mutatedProperty = mutationListWithProperties[i];
              mutatedProperties.push(obj);            
              }
      }
      return mutatedProperties;      
  },
   getMutatedPropertiesForRegistrarByManagingOrg: async function(_managingOrg) {
      let mutationListWithProperties = await App.getMutationListWithProperties();
      let mutatedProperties = [];
      for(let i =0 ; i < mutationListWithProperties.length; i++){
              let obj =  mutationListWithProperties[i];
              if(mutationListWithProperties[i].property.managingOrg === _managingOrg.toLowerCase()
                && mutationListWithProperties[i].latest === 1){
              obj.signDeed = await App.getSignDeedDetail(mutationListWithProperties[i].signDeedId);
              obj.deed = await App.getDeedDetail(obj.signDeed.deedId);          
              mutatedProperties.push(obj);
              }
      }
      return mutatedProperties;      
  },
  getMutatedPropertiesForRegistrarByOffchainProperties: async function(properties) {
      let mutationListWithProperties = await App.getMutationListWithProperties();
      let mutatedProperties = [];
      for(let i =0 ; i < mutationListWithProperties.length; i++){
              let obj = App.findOffChainProperty(properties,
              mutationListWithProperties[i].property.propertyOffChainId);
              if(obj != null){
              obj.mutatedProperty = mutationListWithProperties[i];
              mutatedProperties.push(obj);            
              }
      }
      return mutatedProperties;      
  },
  getMutatedPropertiesForUserByOffchainPropertiesAndNic: async function(properties,nic) {
      let mutationListWithProperties = await App.getMutationListWithProperties();
      let mutatedProperties = [];
      for(let i =0 ; i < mutationListWithProperties.length; i++){
              let obj = App.findOffChainProperty(properties,
              mutationListWithProperties[i].property.propertyOffChainId);
              if(obj != null  && mutationListWithProperties[i].newOwnerNic === nic
                && mutationListWithProperties[i].latest === 1){
              obj.mutatedProperty = mutationListWithProperties[i];
              mutatedProperties.push(obj);            
              }
      }
      return mutatedProperties;      
  },
   getMutatedPropertiesForUserByNic: async function(nic) {
    let list = [];
    let length = await App.getMutationCount();
    if (length > 0) {
      let obj = await App.getMutationDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getMutationDetail(obj.nextId);
        if(nic === obj.newOwnerNic && obj.latest === 1){
          let property = await App.getPropertyDetail(obj.propertyId);
          obj.property = property;
          list.push(obj);
        }
      }
    }
    return list;
  },
  getMutatedOffchainPropertyIds: async function() {
    let offchainPropertyIds = [];
    let length = await App.getMutationCount();
    if (length > 0) {
      let obj = await App.getMutationDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getMutationDetail(obj.nextId);      
          let property = await App.getPropertyDetail(obj.propertyId);
          offchainPropertyIds.push(property.propertyOffChainId);        
      }
    }
    return offchainPropertyIds;
  },
  findOffChainProperty: function(properties, propertyOffChainId){
    for(let i =0;i<properties.length;i++){
        if(properties[i].id === propertyOffChainId){
        return properties[i];
        }
    }
    return null;
  }
  ,
  getLatestMutationByPropertyId: function(_propertyId) {
    return App.getMutationList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyId === _propertyId &&
          list[i].latest === 1) {
          return list[i];
        }
      }
      return null;
    });
  },
  getMutationAndSaleAndSignDeedByPropertyId: async function(_propertyId) {

      let list =  await App.getMutationList();
      let propertyMutationHistory = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyId === _propertyId ) {
          let obj = {};
          obj.mutation = list[i];
          obj.signDeed = await App.getSignDeedDetail(obj.mutation.signDeedId);
          obj.deed = await App.getDeedDetail(obj.signDeed.deedId);
          obj.leasedPropertyList = await App.getLeasedPropertyListByMutationId(obj.mutation.id);
          if(obj.leasedPropertyList !== null && obj.leasedPropertyList.length >0){
            obj.leasedPropertyTaxList = [];
            for(let j=0;j<obj.leasedPropertyList.length;j++){
            obj.leasedPropertyTaxList[obj.leasedPropertyList[j].id+""] = await App.getLeasedPropertyTaxListByLeasedPropertyId(obj.leasedPropertyList[j].id);
            }
          }else{
             obj.leasedPropertyTaxList = [];
          }
          propertyMutationHistory.push(obj);
        }
      }
      return propertyMutationHistory.sort((a,b) => b.mutation.mutatedOn - a.mutation.mutatedOn);
  },
   getMutationAndSaleAndSignDeedByOffChainPropertyId: async function(_offChainPropertyId) {

      let list =  await App.getMutationList();
      let propertyMutationHistory = [];
      for (let i = 0; i < list.length; i++) {
        let propertyId =await App.getPropertyIdByOffChainPropertyId(_offChainPropertyId);
        if (list[i].propertyId === propertyId ) {
          let obj = {};        
          obj.mutation = list[i];
          obj.signDeed = await App.getSignDeedDetail(obj.mutation.signDeedId);
          obj.deed = await App.getDeedDetail(obj.signDeed.deedId);
          obj.leasedPropertyList = await App.getLeasedPropertyListByMutationId(obj.mutation.id);
          if(obj.leasedPropertyList !== null && obj.leasedPropertyList.length >0){
            obj.leasedPropertyTaxList = [];
            for(let j=0;j<obj.leasedPropertyList.length;j++){          
            obj.leasedPropertyTaxList[obj.leasedPropertyList[j].id+""] = await App.getLeasedPropertyTaxListByLeasedPropertyId(obj.leasedPropertyList[j].id);
            }
          }else{
             obj.leasedPropertyTaxList = [];
          }
          propertyMutationHistory.push(obj);
        }
      }
      return propertyMutationHistory.sort((a,b) => b.mutation.mutatedOn - a.mutation.mutatedOn);
  },
  canCreateLease: function(latestMutation,leasedList){
      let allowCreatingLease = true;
      for(let i=0;i<leasedList.length;i++){
          if(latestMutation != null && leasedList[i].mutationId === latestMutation.id &&
              latestMutation.newOwnerNic === leasedList[i].leasedToNic && leasedList[i].leaseStartDate <= new Date().getTime()
              &&   leasedList[i].leaseEndDate >= new Date().getTime()){
              allowCreatingLease =false;
              return allowCreatingLease;

          }

      }
      return allowCreatingLease;
  }
  ,getLatestMutationByOffChainPropertyId: async function(_offChainPropertyId) {
    let length = await App.getMutationCount();
    if (length > 0) {
      let obj = await App.getMutationDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getMutationDetail(obj.nextId);
        let property = await App.getPropertyDetail(obj.propertyId);
        obj.property = property;
        if(obj.latest===1 && obj.property.propertyOffChainId===_offChainPropertyId){
          return obj;
        }
      }
    }
    return null;
  },
  getMutationBySignDeedId: function(_signDeedId) {
    return App.getMutationList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].signDeedId === _signDeedId) {
          return list[i];
        }
      }
      return null;
    });
  },

   getLatestMutationByNewOwnerPkey: function(_newOwnerPkey) {
    return App.getMutationList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].newOwnerPkey === _newOwnerPkey && 
          list[i].latest === 1) {
          return list[i];
        }
      }
      return null;
    });
  },

  // Mutation Crud End

  // Leased Property  Start
  insertLeasedPropertyData: function(
    _mutationId,
    _propertyId,
    _leaseStartDate,
    _leaseEndDate,
    _leasedByPkey,
    _leasedByNic,
    _leasedToPkey,
    _leasedToNic,
    _leasedAmount,
    _taxAmountPerYear,
    _fromAddress,
    _gas
  ) {
    return App.deployedContracts.leasedPropertyContract
      .insert(
        _mutationId,
        _propertyId,
        _leaseStartDate,
        _leaseEndDate,
        _leasedByPkey,
         App.convertToBytes(_leasedByNic),
        _leasedToPkey,
         App.convertToBytes(_leasedToNic),
        _leasedAmount,
        _taxAmountPerYear,
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },
  getLeasedPropertyCount: function() {
    return App.deployedContracts.leasedPropertyContract
      .getLeasedCount()
      .then(function(size) {
        return JSON.parse(size) - 1;
      });
  },
  getLeasedPropertyDetail: function(id) {
    return App.deployedContracts.leasedPropertyContract
      .getLeasedFirst(id)
      .then(function(_firstData) {
        let firstData = _firstData;
        return App.deployedContracts.leasedPropertyContract
          .getLeasedSecond(id)
          .then(function(_secondData) {
            let secondData = _secondData;
             return App.deployedContracts.leasedPropertyContract
                .getLeasedThird(id)
                .then(function(_thirdData) {
                  let thirdData = _thirdData;
                    return {
                      id: App.transformValue(firstData[0]),
                      mutationId: App.transformValue(firstData[1]),
                      propertyId: App.transformValue(firstData[2]),
                      leaseStartDate: App.transformValue(firstData[3]),
                      leaseEndDate: App.transformValue(firstData[4]),
                      leasedByPkey: secondData[1].substring(0, 42),
                      leasedByNic: App.transformValue(secondData[2]),
                      leasedToPkey: thirdData[1].substring(0, 42),
                      leasedToNic: App.transformValue(thirdData[2]),
                      leasedAmount: App.transformValue(thirdData[3]),
                      taxAmountPerYear: App.transformValue(thirdData[4]),
                      prevId: App.transformValue(thirdData[5]),
                      nextId: App.transformValue(thirdData[6])
                    };
                });
          });
      });
  },
  getLeasedPropertyList: async function() {
    let list = [];
    let length = await App.getLeasedPropertyCount();
    if (length > 0) {
      let obj = await App.getLeasedPropertyDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getLeasedPropertyDetail(obj.nextId);
        list.push(obj);
      }
    }
    return list;
  },
   getLeasedPropertyListByNic: async function(nic) {
    let list = [];
    let length = await App.getLeasedPropertyCount();
    if (length > 0) {
      let obj = await App.getLeasedPropertyDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getLeasedPropertyDetail(obj.nextId);
        if(obj.leasedToNic === nic){
          list.push(obj);
        }
      }
    }
    return list;
  },
  getLeasedPropertyByPropertyId: function(_propertyId) {
    return App.getLeasedPropertyList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyId === _propertyId) {
          return list[i];
        }
      }
      return null;
    });
  },

  getLeasedPropertyByMutationId: function(_mutationId) {
    return App.getLeasedPropertyList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].mutationId === _mutationId) {
          return list[i];
        }
      }
      return null;
    });
  },

    getLeasedPropertyListByMutationId: function(_mutationId) {
      let leasedList=[];
      return App.getLeasedPropertyList().then(function(list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].mutationId === _mutationId) {          
            leasedList.push(list[i])
          }
        }
        return leasedList;
      });
  },

  // Leased Property Crud End

  // Leased Property Tax Crud Start
  insertLeasedPropertyTaxData: function(
    _leasePropertyId,
    _amountPaid,
    _submissionDate,
    _taxYear,
    _fromAddress,
    _gas
  ) {
    return App.deployedContracts.leasedPropertyTaxContract
      .insert(_leasePropertyId, _amountPaid, _submissionDate, _taxYear, {
        from: _fromAddress,
        gas: _gas
      })
      .then(function(response) {
        //console.log(response);
        return response;
      });
  },
  getLeasedPropertyTaxCount: function() {
    return App.deployedContracts.leasedPropertyTaxContract
      .getLeasedPropertyTaxCount()
      .then(function(size) {
        return JSON.parse(size) - 1;
      });
  },
  getLeasedPropertyTaxDetail: function(id) {
    return App.deployedContracts.leasedPropertyTaxContract
      .getLeasedPropertyTax(id)
      .then(function(_firstData) {
        let firstData = _firstData;
        return {
          id: App.transformValue(firstData[0]),
          leasePropertyId: App.transformValue(firstData[1]),
          amountPaid: App.transformValue(firstData[2]),
          submissionDate: App.transformValue(firstData[3]),
          taxYear: App.transformValue(firstData[4]),
          prevId: App.transformValue(firstData[5]),
          nextId: App.transformValue(firstData[6])
        };
      });
  },
  getLeasedPropertyTaxList: async function() {
    let list = [];
    let length = await App.getLeasedPropertyTaxCount();
    if (length > 0) {
      let obj = await App.getLeasedPropertyTaxDetail(0);
      while (obj.nextId != 0) {
        obj = await App.getLeasedPropertyTaxDetail(obj.nextId);
        list.push(obj);
      }
    }
    return list;
  },
   getLeasedPropertyTaxListByLeasedPropertyId: async function(_leasePropertyId) {
    let list = [];
    let length = await App.getLeasedPropertyTaxCount();
    if (length > 0) {
      let obj = await App.getLeasedPropertyTaxDetail(0);
      while (obj.nextId != 0) {
        if(obj.leasePropertyId === _leasePropertyId){
        obj = await App.getLeasedPropertyTaxDetail(obj.nextId);
        list.push(obj);
         }
      }
    }
    return list;
  },
  getLeasedPropertyTaxByLeasedPropertyId: function(_leasePropertyId) {
    return App.getLeasedPropertyTaxList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].leasePropertyId === _leasePropertyId) {
          return list[i];
        }
      }
      return null;
    });
  },

  // Leased Property Tax Crud End

  convertToBytes(asci) {
    if (asci == null || asci == "") return "0x00";
    else return web3.fromAscii(asci);
  },
  convertToAsci(bytes) {
    if (bytes == "0x00") return "";
    else
      try {
        return web3.toUtf8(bytes);
      } catch (e) {
        // console.log(e);
        return web3.toAscii(bytes);
      }
  },
  transformValue(element) {
    try {
      let value = JSON.parse(element);
      return value;
    } catch (e) {
      // console.log(e);
      return App.convertToAsci(element);
    }
  },
  render: function() {
    var propertyContractInstance;
    // Load contract data
    App.contracts.PropertyContract.deployed()
      .then(function(instance) {
        propertyContractInstance = instance;
        return propertyContractInstance.properties();
      })
      .then(function(propertyContractInstance) {
        var candidatesResults = $("#candidatesResults");
        candidatesResults.empty();

        var candidatesSelect = $("#candidatesSelect");
        candidatesSelect.empty();

        for (var i = 1; i <= propertyContractInstance.length; i++) {
          propertyContractInstance.properties(i).then(function(property) {
            var id = property.id;

            // Render candidate Result
            var candidateTemplate =
              "<tr><th>" +
              id +
              "</th><td>" +
              "name" +
              "</td><td>" +
              "voteCount" +
              "</td></tr>";
            candidatesResults.append(candidateTemplate);

            // Render candidate ballot option
            var candidateOption =
              "<option value='" + id + "' >" + "name" + "</ option>";
            candidatesSelect.append(candidateOption);
          });
        }
        return true;
      })
      .then(function(hasVoted) {
        // Do not allow a user to vote
        if (hasVoted) {
          $("form").hide();
        }
        loader.hide();
        content.show();
      });
  },
  castVote: function() {
    var candidateId = $("#candidatesSelect").val();
    App.contracts.PropertyContract.deployed()
      .then(function(instance) {
        return instance.vote(candidateId, { from: App.account });
      })
      .then(function(result) {
        // Wait for votes to update
        $("#content").hide();
        $("#loader").show();
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
