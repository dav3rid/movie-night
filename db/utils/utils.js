exports.createRefObj = (data, key, value) => {
  return data.reduce((refObj, datum) => {
    refObj[datum[key]] = datum[value];
    return refObj;
  }, {});
};

exports.formatData = (refObj, data, keyToAdd, keyToRemove) => {
  return data.map((datum) => {
    const newDatum = { ...datum };
    newDatum[keyToAdd] = refObj[datum[keyToRemove]];
    delete newDatum[keyToRemove];
    return newDatum;
  });
};
