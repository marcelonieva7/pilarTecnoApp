import {
  FETCH_CENTERS,
  POST_CENTERS,
  DEL_CENTERS,
  UPDATE_CENTERS,
} from '../constants';

const initialState = {
  centers: null,
};

export default (state = initialState, action) => {
  if (action.type === FETCH_CENTERS) {
    return {
      ...state,
      centers: action.data,
    };
  }
  if (action.type === POST_CENTERS) {
    return {
      ...state,
      centers: [...state.centers, action.data],
    };
  }
  if (action.type === UPDATE_CENTERS) {
    const update = state.centers.map(center => {
      if (center._id === action.data._id) {
        return { ...action.data.body, _id: action.data._id };
      }
      return center;
    });
    return {
      ...state,
      centers: update,
    };
  }
  if (action.type === DEL_CENTERS) {
    const update = state.centers.filter(center => center._id !== action.data);
    return {
      ...state,
      centers: update,
    };
  }
  return { ...state };
};
