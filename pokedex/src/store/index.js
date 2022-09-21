import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

const initialState = {
  pokemons: [],
  detail: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "fetch/success":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "byid/success":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
