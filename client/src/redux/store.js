import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers';
import rootSaga from './sagas'



let initState = {};


const sagaMiddleware = createSagaMiddleware()
const middleware = [thunk];
let localState = localStorage.getItem('app-state')
localState && (initState = JSON.parse(localState))

const store = createStore(rootReducer, initState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        // sagaMiddleware.run(rootSaga),

    

));
export default store;

/*
export default function makeStore(initialState = initState) {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware, thunk]
    let composeEnhancers = compose
    const localState = localStorage.getItem('app-state')
    localState && (initialState = JSON.parse(localState))
  
    if (process.env.NODE_ENV === 'development') {
      if ((window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      }
    }
  
    const store = createStore(
      rootReducer(),
      initialState,
      composeEnhancers(applyMiddleware(...middlewares))
    )
  
    sagaMiddleware.run(rootSaga)
  
    if ((module).hot) {
      ;(module).hot.accept('./reducers', () => {
        const nextReducer = require('./reducers').default
        store.replaceReducer(nextReducer)
      })
    }
  
    return store

}*/