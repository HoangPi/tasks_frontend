import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "./user"

const reducers = combineReducers({
    user: userReducer
})

export const store = configureStore({
  reducer: reducers
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store