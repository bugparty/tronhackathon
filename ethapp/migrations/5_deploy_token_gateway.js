
var TokenGateway = artifacts.require("TokenGateway")
var DaiToken = artifacts.require("DaiToken");
var PaxToken = artifacts.require("PaxToken");

module.exports =  function(deployer) {
    deployer.deploy(TokenGateway).then( instance => {

        instance.addNewToken('DAI', DaiToken.address).then( () =>{
            instance.addNewToken('PAX', PaxToken.address).then(()=>{
                console.log("ok");
            })
        })

    })

};
