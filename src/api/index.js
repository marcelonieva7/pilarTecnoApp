const BASE_URL = 'https://covidcentre.herokuapp.com/api';

///LIST CENTERS
export const fetchCenters = () => {
  return fetch(`${BASE_URL}/vaccinationcentres`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).then(Response => {
    return Promise.all([Response, Response.json()]);
  });
};
///CREATE CENTER
export const postCenters = body => {
  return fetch(`${BASE_URL}/vaccinationcentres`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  }).then(Response => {
    console.log('json create: ' + JSON.stringify(Response));
    return Promise.all([Response, Response.json()]);
  });
};
///EDIT CENTER
export const putCenter = ({ body, _id }) => {
  return fetch(`${BASE_URL}/vaccinationcentres/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  }).then(Response => {
    console.log('json edit: ' + JSON.stringify(Response));
    return Promise.all([Response, Response.json()]);
  });
};
///DELETE CENTER
export const deleteCenter = _id => {
  return fetch(`${BASE_URL}/vaccinationcentres/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  }).then(Response => {
    console.log('json delete: ' + JSON.stringify(Response));
    return Promise.all([Response, Response.json()]);
  });
};
