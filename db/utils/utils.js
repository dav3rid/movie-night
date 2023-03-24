exports.createRefObj = (data, key, value) => {
  return data.reduce((refObj, datum) => {
    refObj[datum[key]] = datum[value];
    return refObj;
  }, {});
};

exports.formatData = (data, alterations) => {
  return data.map((datum) => {
    const datumCopy = { ...datum };

    alterations.forEach(([refObj, keyToAdd, keyToRemove]) => {
      datumCopy[keyToAdd] = refObj[datum[keyToRemove]];
      delete datumCopy[keyToRemove];
    });

    return datumCopy;
  });
};
