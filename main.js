//Don't forget to edit the config.js file before launching
//npm run deploy
const deploy = require("./deployer/deploy");
const sc = require("./config").scPath;

//deploy smart contract
deploy(sc.name);