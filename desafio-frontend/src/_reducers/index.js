import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {account} from './account.reducer';
import {transac} from './transaction.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  account,
  transac
});

export default rootReducer;