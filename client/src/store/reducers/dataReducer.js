const initialState = {
  loading: true,
  error: "",
  currentData: [],
  previousData: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        loading: false,
        currentData: action.payload.current,
        previousData: action.payload.previous,
        filteredData: [],
        error: "",
      };
    case "FETCH_DATA_FAILURE":
      return {
        loading: false,
        currentData: [],
        previousData: [],
        error: action.payload,
      };
    case "FILTER_DATA":
      return {
        ...state,
        filteredData: action.payload.data.data.TK1[action.payload.filterBy],
        filterBy: action.payload.filterBy,
      };
    default:
      return state;
  }
};

export default productReducer;
