import { COUNTER, ADD, UPDATE, DELETE, SET_PRODUCTS } from "./action";
export const renderPage = (count = 0, action) => {
  switch (action.type) {
    case COUNTER:
      return (count = count + 1);
    default:
      return count;
  }
};
export const addData = (oldValues = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.payload];
    case ADD:
      return [...oldValues, action.payload];
    case UPDATE:
      return oldValues.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            username: action.payload.username,
            email: action.payload.email,
            designation: action.payload.designation,
          };
        }
        return item;
      });
    // return [...oldValues, action.payload];
    case DELETE:
      const duplicateArray = oldValues.filter(
        (item) => item.id === action.payload.id
      );
      duplicateArray.pop();
      return [
        ...duplicateArray,
        ...oldValues.filter((item) => item.id !== action.payload.id),
      ];
    default:
      return oldValues;
  }
};
