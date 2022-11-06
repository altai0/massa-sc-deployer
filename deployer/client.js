const Client = require("@massalabs/massa-web3").Client;
const ProviderType = require("@massalabs/massa-web3").ProviderType;
const baseAccount = require("../config").baseAccount;
const providerUrl = require("../config").providers;

const providers = [
  {
    url: providerUrl.public,
    type: ProviderType.PUBLIC,
  },
  {
    url: providerUrl.private,
    type: ProviderType.PRIVATE,
  },
];

const web3ClientConfig = {
  providers: providers,
  retryStrategyOn: true,
  periodOffset: 3, // set an offset of a few periods (default = 5)
};

const web3Client = new Client(web3ClientConfig, baseAccount);

module.exports = web3Client;