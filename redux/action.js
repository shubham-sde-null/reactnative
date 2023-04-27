export const ADD = 'ADD';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const INITIAL_LOAD = 'INITIAL_LOAD';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const COUNTER = 'COUNTER';
export const setProducts = (products = null) => {
  if (products) {
    return {
      type: SET_PRODUCTS,
      payload: products,
    };
  }
};
export const fetchProducts = () => {
  return async function (dispatch) {
    try {
      const res = await fetch(
        'https://repulsive-leotard-fly.cyclic.app/allresource',
      );
      const data = await res.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.log('the error occured due to', error);
    }
  };
};
export const initialLoad = () => {
  fetch('https://repulsive-leotard-fly.cyclic.app/allresource')
    .then(res => res.json())
    .then(data => {
      return {
        type: INITIAL_LOAD,
        payload: data,
      };
    });
};
export const valueChanged = value => ({
  type: COUNTER,
  payload: value,
});
export const addData = (
  id,
  username,
  email,
  designation,
  password,
  today,
  billable,
  nonbillable,
) => ({
  type: ADD,
  payload: {
    id,
    username,
    email,
    designation,
    password,
    today,
    billable,
    nonbillable,
  },
});
export const updateData = (
  id,
  username,
  email,
  designation,
  password,
  today,
  billable,
  nonbillable,
) => ({
  type: UPDATE,
  payload: {
    id,
    username,
    email,
    designation,
    password,
    today,
    billable,
    nonbillable,
  },
});
export const deleteData = id => ({
  type: DELETE,
  payload: {
    id,
  },
});
