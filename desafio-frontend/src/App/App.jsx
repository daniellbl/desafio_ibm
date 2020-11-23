import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import {TransactionPage} from '../TransactionPage'
import {SignUpPage} from '../SignUpPage'


class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
    
        });
    }

    render() {
     
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
               
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/Transaction" component={TransactionPage} />
                                <Route path="/SignUpPage" component={SignUpPage} />
                  
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 