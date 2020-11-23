import { accountConstants } from '../_constants';

export function account(state = {}, action) {
  switch (action.type) {
    case accountConstants.GET_BY_USER_REQUEST:
      return {
        loading: true
      };
    case accountConstants.GET_BY_USER_SUCCESS:
      return {
        items: action.account
      };
    case accountConstants.GET_BY_USER_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}