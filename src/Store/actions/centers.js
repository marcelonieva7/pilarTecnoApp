import {
  FETCH_CENTERS,
  POST_CENTERS,
  DEL_CENTERS,
  UPDATE_CENTERS,
} from '../constants';
import { fetchCenters, postCenters, deleteCenter, putCenter } from '../../api';

const getCentersSucess = data => {
  return {
    type: FETCH_CENTERS,
    data,
  };
};
const createCenterSuceess = data => {
  return {
    type: POST_CENTERS,
    data,
  };
};
const delCenterSuceess = data => {
  return {
    type: DEL_CENTERS,
    data,
  };
};
const updateCenterSuceess = data => {
  return {
    type: UPDATE_CENTERS,
    data,
  };
};
export const getCenters = () => dispatch => {
  return fetchCenters()
    .then(([response, json]) => {
      dispatch(getCentersSucess(json));
      return json;
    })
    .catch(error => console.log(error));
};
export const createCenter = data => dispatch => {
  return postCenters(data)
    .then(([response, json]) => {
      if (response.ok === true) {
        dispatch(createCenterSuceess(json.added));
      }
      return json;
    })
    .catch(error => console.log(error));
};
export const delcenter = data => dispatch => {
  const { _id } = data;
  return deleteCenter(_id)
    .then(([response, json]) => {
      if (response.ok === true) {
        dispatch(delCenterSuceess(_id));
      }
      return json;
    })
    .catch(error => console.log(error));
};
export const updateCenter = data => dispatch => {
  return putCenter(data)
    .then(([response, json]) => {
      if (response.ok === true) {
        dispatch(updateCenterSuceess(data));
      }
      return json;
    })
    .catch(error => console.log(error));
};
