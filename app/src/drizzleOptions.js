import PatronageCollectibles from "./contracts/PatronageCollectibles.json";
import SimpleStorage from "./contracts/SimpleStorage.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [SimpleStorage, PatronageCollectibles],
  events: {
    SimpleStorage: ["StorageSet"],
    PatronageCollectibles: ["Minted"]
  },
  polls: {
    // set polling interval to 30secs so we don't get buried in poll events
    accounts: 30000,
  },
};

export default options;
