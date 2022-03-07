import {
  applyMiddleware, combineReducers, compose, createStore
} from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { apiRequestReducer, cartReducer, catalogReducer } from "../slices";
import {
  handleRequestEpic, handleChangeCategoryEpic, handleChangeSearchEpic,
  handleRequestItemsEpic, handleMoreRequestEpic, handleCartChangeEpic,
  handleCreateOrderEpic, handleCartClearEpic, handleCartOrderEpic, handleCleanItemsEpic,
  handleLoadItemsEpic
} from "../epics";

const reducer = combineReducers({
  api: apiRequestReducer,
  catalog: catalogReducer,
  cart: cartReducer
});

const epic = combineEpics<any>(
  handleRequestEpic,
  handleLoadItemsEpic,
  handleCreateOrderEpic,
  handleRequestItemsEpic,
  handleChangeCategoryEpic,
  handleChangeSearchEpic,
  handleCleanItemsEpic,
  handleMoreRequestEpic,
  handleCartChangeEpic,
  handleCartOrderEpic,
  handleCartClearEpic
);

export type StateType = ReturnType<typeof reducer>;

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();

const store = createStore(reducer, composeEnhancer(applyMiddleware(epicMiddleware)));

epicMiddleware.run(epic);

export default store;
