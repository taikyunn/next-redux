import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const initial = {
  message: 'START',
  count: 0
}

// レデューサー
function counterReducer(state = initial, action) {
  switch (action.type) {
    case 'INCREMENT' :
      return {
        message: 'INCREMENT',
        count: state.count + 1
      }

    case 'DECREMENT' :
      return {
        message: 'DECREMENT',
        count: state.count - 1
      }

    case 'RESET' :
      return {
        message: 'RESET',
        count: initial.count
      }

    default :
      return state;
  }
}

export function initStore(state = initial) {
  return createStore(counterReducer, state, applyMiddleware(thunkMiddleware))
}
