exports.createRefObj = (data, key, value) => {
  return data.reduce((refObj, datum) => {
    refObj[datum[key]] = datum[value];
    return refObj;
  }, {});
};

exports.formatData = (refObj, data, keyToAdd, keyToRemove) => {
  return data.map(({ [keyToRemove]: oldKey, ...rest }) => {
    return {
      ...rest,
      [keyToAdd]: refObj[oldKey]
    };
  });
};
