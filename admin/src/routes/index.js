import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import reducer from '../redux/reducer';
import Main  from '../components/main';
import Login from '../components/login'
import NotFound from '../components/errorPages/404'

const composeEnhancers =
	(typeof window === 'object' && process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(
	reducer,
	enhancer
);

class AppRoutes extends React.PureComponent {
    render() {
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact component={Main} />
                        <Route path='/login' component={Login} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default AppRoutes;