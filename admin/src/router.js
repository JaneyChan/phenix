import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reducer from './redux/reducer';
import Loadable from 'react-loadable';

const composeEnhancers = (
  typeof window === 'object' && process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(
  reducer,
  enhancer
);

const Main = Loadable({
  loader: () => import('./components/main'),
  loading: () => { return null; }
});

const Login = Loadable({
  loader: () => import('./components/login'),
  loading: () => { return null; }
});

const NotFound = Loadable({
  loader: () => import('./components/errorPages/404'),
  loading: () => { return null; }
});

const Routers = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login' component={Login} />
        <Route path="/category/:cid/note/:nid" component={Main}/>
        <Route path="/category/:cid" component={Main}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routers;
