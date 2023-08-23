import axios from "axios";

export function getDogs(name) {
  return async function (dispatch) {
    try {
      if (name) {
        const dogsName = await axios.get(
          "http://localhost:3001/dogs?name=" + name
        );
        return dispatch({
          type: "GET_DOGS_BY_NAME",
          payload: dogsName.data,
        });
      }
      const dogs = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: "GET_DOGS",
        payload: dogs.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: "GET_DOGS_ERROR",
        payload: error.response.data,
      });
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const temperaments = await axios.get(
        "http://localhost:3001/temperaments"
      );
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: temperaments.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: "GET_TEMPERAMENTS_ERROR",
        payload: error.response.data,
      });
    }
  };
}

export function sortByName(payload) {
  return {
    type: "SORT_BY_NAME",
    payload,
  };
}

export function sortByWeight(payload) {
  return {
    type: "SORT_BY_WEIGHT",
    payload,
  };
}




export function filterDogsByTemperament(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/dogs", payload);
      const createdDog = response.data; // Extract relevant data from response
      return dispatch({
        type: "POST_DOGS",
        payload: createdDog,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      const dogDetail = response.data;
      return dispatch({
        type: "GET_DETAIL",
        payload: dogDetail,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearDetail() {
  return {
    type: "CLEAR_DETAIL",
  };
}
