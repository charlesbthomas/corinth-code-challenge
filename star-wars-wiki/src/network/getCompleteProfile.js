import axios from "axios";
/**
 *
 * @param {string} name
 * @returns {Promise<[PeopleObjects]>} resolves with an array of SWAPI people
 */
export const getCompleteProfile = (url) =>
  axios
    .get(`/api/people/${url.split("/").reverse()[1]}`)
    .then(({ data }) => data);
