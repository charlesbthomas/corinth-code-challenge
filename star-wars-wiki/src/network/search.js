import axios from "axios";
/**
 *
 * @param {string} name
 * @returns {Promise<[PeopleObjects]>} resolves with an array of SWAPI people
 */
export const search = (name) =>
  axios.get(`/api/people/search?name=${name}`).then(({ data }) => data.results);
