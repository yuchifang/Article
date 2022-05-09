import { combineReducers } from "redux";
import WriterListReducer from "./WriterListReducer";
import ArticleReducer from "./ArticleReducer";
const RootReducer = combineReducers({
  WriterList: WriterListReducer,
  Article: ArticleReducer,
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;
