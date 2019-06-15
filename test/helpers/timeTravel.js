function timeTravel(time) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [time], // 86400 is num seconds in day
      id: new Date().getTime(),
    }, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

module.exports = timeTravel;