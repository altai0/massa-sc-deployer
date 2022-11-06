# massa-sc-deployer
Smart contract deployer for Massa

## Installation 🛠️

Clone this project  

```sh
git clone https://github.com/altai0/massa-sc-deployer.git
```

Go to the root of your folder and run this command  

```sh
npm install
```

## Usage ℹ️

Put the smart contract you want to deploy into the `build/` folder.

Open `config.js` and enter the name of your smart contract 

```js
exports.scPath = {
  name: "main.wasm",
};

```

### Deploy smart contract

```sh
npm run deploy
```
