App = {
  web3Provider: null,
  contracts: {},
  deployedContracts: {},
  account: "0x0",
  gasStandard:3000000,
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
    return App.initContract();
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
    plotOffChainId,
    _propertyOffChainId,
    _areaSqYards,
    _style,
    _propertyType,
    _kind,
    _managingOrg,
    _street,
    _city,
    _country,
    _fromAddress,
    _gas
  ) {
    return App.deployedContracts.propertyContract
      .insert(
        plotOffChainId,
        _propertyOffChainId,
        _areaSqYards,
        App.convertToBytes(_style),
        App.convertToBytes(_propertyType),
        App.convertToBytes(_managingOrg),
        App.convertToBytes(_kind),
        App.convertToBytes(_street),
        App.convertToBytes(_city),
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
                  plotOffChainId: App.transformValue(firstData[1]),
                  propertyOffChainId: App.transformValue(firstData[2]),
                  areaSqYards: App.transformValue(firstData[3]),
                  style: App.transformValue(firstData[4]),
                  propertyType: App.transformValue(secondData[1]),
                  kind: App.transformValue(secondData[2]),
                  managingOrg: App.transformValue(secondData[3]),
                  street: App.transformValue(thirdData[1]),
                  city: App.transformValue(thirdData[2]),
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
      while (obj.nextId != 0) {
        obj = await App.getPropertyDetail(obj.nextId);
        list.push(obj);
      }
    }
    return list;
  },
  getPropertyByOffChainPropertyId: function(_OffChainPropertyId) {
    App.getDeedList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyOffChainId === _OffChainPropertyId) {
          return list[i];
        }
      }
      return null;
    });
  },

  syncOffChainPropertiesToBlockChain: function(list) {
    for (let i = 0; i < list.length; i++) {
      let obj = App.getPropertyByOffChainPropertyId(list[i].propertyOffChainId);
      if (obj != null) {
        App.insertPropertyData(
          obj.plotOffChainId,
          obj.propertyOffChainId,
          obj.areaSqYards,
          obj.style,
          obj.propertyType,
          obj.kind,
          obj.managingOrg,
          obj.street,
          obj.city,
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
  getDeedDetail: function(id) {
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
    App.getDeedList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyId === _propertyId) {
          return list[i];
        }
      }
      return null;
    });
  },

  // Deed Crud End

   // SignDeed Start
  insertSignDeedData: function(
        _propertyId,
        _deedId,
        _soldAmount,
        _buyerSignature,
        _sellerSignature,
        _fromAddress,
        _gas
  ) {
    return App.deployedContracts.signDeedContract
      .insert(
        _propertyId,
        _deedId,
        _soldAmount,
        _buyerSignature,
        _sellerSignature,
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
  getSignDeedDetail: function(id) {
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
  getSignDeedByPropertyId: function(_propertyId) {
    App.getDeedList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyId === _propertyId) {
          return list[i];
        }
      }
      return null;
    });
  },

   getSignDeedByDeedId: function(_deedId) {
    App.getDeedList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].deedId === _deedId) {
          return list[i];
        }
      }
      return null;
    });
  },

  // SignDeed Crud End

  // Mutation  Start
  insertMutationData: function(
    _signDeedId,
    _propertyId,
    _mutatedOn,
    _mutatedBy,
    _newOwnerPkey,
    _newOwnerNic,
    _fromAddress,
    _gas
  ) {
    return App.deployedContracts.mutationContract
      .insert(
        _signDeedId,
        _propertyId,
        _mutatedOn,
        _mutatedBy,
        _newOwnerPkey,
        _newOwnerNic,
        { from: _fromAddress, gas: _gas }
      )
      .then(function(response) {
        //console.log(response);
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
            return {
              id: App.transformValue(firstData[0]),
              signDeedId: App.transformValue(firstData[1]),
              propertyId: App.transformValue(firstData[2]),
              mutatedOn: App.transformValue(firstData[3]),
              latest: App.transformValue(firstData[4]),
              mutatedBy: secondData[1].substring(0, 42),
              newOwnerPkey: App.transformValue(secondData[2]),
              newOwnerNic: App.transformValue(secondData[3]),
              prevId: App.transformValue(secondData[4]),
              nextId: App.transformValue(secondData[5])
            };
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
  getMutationByPropertyId: function(_propertyId) {
    return App.getMutationList().then(function(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].propertyId === _propertyId) {
          return list[i];
        }
      }
      return null;
    });
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
    _leasedBy,
    _leasedTo,
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
        _leasedBy,
        _leasedTo,
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
            return {
              id: App.transformValue(firstData[0]),
              mutationId: App.transformValue(firstData[1]),
              propertyId: App.transformValue(firstData[2]),
              leaseStartDate: App.transformValue(firstData[3]),
              leaseEndDate: App.transformValue(firstData[4]),
              leasedBy: secondData[1].substring(0, 42),
              leasedTo: secondData[2].substring(0, 42),
              taxAmountPerYear: App.transformValue(secondData[3]),
              prevId: App.transformValue(secondData[4]),
              nextId: App.transformValue(secondData[5])
            };
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
