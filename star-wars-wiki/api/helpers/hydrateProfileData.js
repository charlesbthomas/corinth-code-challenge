const axios = require("axios");

const isUrl = (string) => string.indexOf("http") === 0;

/**
 * MUTATES PASSED IN OBJ
 * iterates the obj replacing any urls and arrays of urls with data fetched from swapi
 */
module.exports = hydrateProfileData = async (obj) => {
  const isArray = Array.isArray(obj);
  const promises = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (key === "url") {
      // do not fetch self
      return;
    } else if (isUrl(value)) {
      console.log(value);
      promises.push(axios.get(value).then((resp) => (obj[key] = resp.data)));
    } else if (!isArray && Array.isArray(value)) {
      promises.push(hydrateProfileData(value));
    }
  });

  await Promise.all(promises);
  return obj;
};
