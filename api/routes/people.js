const express = require("express");
const axios = require("axios");
const router = express.Router();
const hydrateProfileData = require("../helpers/hydrateProfileData");

const { BASE_SW_URL, PEOPLE_ENDPOINT } = require("../constants");
const PEOPLE_URL = `${BASE_SW_URL}${PEOPLE_ENDPOINT}`;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// search people
router.get("/search", (req, res) => {
  const url = `${PEOPLE_URL}/?search=${req.query.name}`;
  axios.get(url).then(({ data }) => {
    res.send(data);
  });
});

// get specific person (complete profile - fetches any urls returned in the profile by swapi)
router.get("/:peopleId", (req, res) => {
  const { peopleId } = req.params;
  const url = `${PEOPLE_URL}/${peopleId}/`;
  console.log(url);
  if (parseInt(peopleId) > 0) {
    axios
      .get(url)
      .then((resp) => hydrateProfileData(resp.data))
      .then((data) => res.send(data));
  } else {
    res.status(400);
    res.send("People ID must be a number greater than 0");
  }
});

module.exports = router;
