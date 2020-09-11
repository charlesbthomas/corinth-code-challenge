import React from "react";
import { Search as SearchBar } from "semantic-ui-react";
import * as Network from "../network";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

const transformResults = (swapiResults) =>
  swapiResults.map((person, idx) => ({
    title: person.name,
    id: idx,
  }));

const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };

    default:
      throw new Error();
  }
};

const Search = ({ setPerson }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loading, results, value } = state;

  const timerRef = React.useRef();

  const fetchResults = (name) => {
    timerRef.current = null;
    if (name.length === 0) {
      dispatch({ type: "CLEAN_QUERY" });
      return;
    }
    Network.search(name).then((results) => {
      // eject if handleSearch has been called again while waiting for api.
      if (timerRef.current) return;
      dispatch({
        type: "FINISH_SEARCH",
        results,
      });
    });
  };

  const handleSearchChange = (e, data) => {
    clearTimeout(timerRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });
    timerRef.current = setTimeout(() => fetchResults(data.value), 350);
  };

  return (
    <SearchBar
      size="large"
      loading={loading}
      onResultSelect={(e, data) => {
        setPerson(results[data.result.id]);
        dispatch({ type: "CLEAN_QUERY" });
      }}
      onSearchChange={handleSearchChange}
      results={transformResults(results)}
      value={value}
      showNoResults={!!value}
    />
  );
};

export default Search;
