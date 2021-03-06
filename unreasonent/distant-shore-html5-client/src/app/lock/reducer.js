'use strict'

import { handleActions } from 'redux-actions'

var initialLock = {
  booting: true,
  idToken: null,
}

module.exports = handleActions({
  LOCK_SUCCESS: (state, action) => ({
    ...state,
    booting: false,
    ...action.payload,
  }),
  LOCK_CLEAR: () => ({
    ...initialLock,
    booting: false,
  }),
}, initialLock)
