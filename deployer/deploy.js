const EOperationStatus = require("@massalabs/massa-web3").EOperationStatus;
const fs = require("fs");
const client = require("./client");
const baseAccount = require("../config").baseAccount;
const loading = require("loading-cli");

module.exports = async function (name) {
  console.clear();

  const path = "./build/" + name;
  const wasmBuffer = fs.readFileSync(path);
  const deployer = await client.smartContracts().deploySmartContract(
    {
      fee: 0,
      maxGas: 2000000,
      gasPrice: 0,
      coins: 0,
      contractDataBase64: wasmBuffer,
    },
    baseAccount
  );
  const tx = deployer[0];

  console.log("\n\nOperation id: " + tx + "\n\n");
  const load = loading("Waiting for finality state...").start();
  await client
    .smartContracts()
    .awaitRequiredOperationStatus(tx, EOperationStatus.FINAL)
    .then(async () => {
      const filteredEvent = await client
        .smartContracts()
        .getFilteredScOutputEvents({
          start: null,
          end: null,
          original_caller_address: null,
          original_operation_id: tx,
          emitter_address: null,
        });
      load.stop();
      console.clear();
      console.log("\n--- Smart contract deployed ---\n");
      console.log("\n--- Output event ---\n" + filteredEvent[0].data);
      console.log(
        "---Caller address ---\n" + filteredEvent[0].context.call_stack + "\n\n\n\n\n"
      );
      const finishing = loading("closing...").start();
      const item = {
        outputEvent: filteredEvent[0].data,
        caller: filteredEvent[0].context.call_stack,
      };
      let data = JSON.stringify(item);
      fs.writeFileSync("result.json", data);
      setTimeout(function () {
        finishing.color = "yellow";
        finishing.text = " complete";
      }, 2000);
      setTimeout(function () {
        finishing.stop();
      }, 3000);
    })
    .catch((e) => {
      console.log(e + " error");
    });
};
