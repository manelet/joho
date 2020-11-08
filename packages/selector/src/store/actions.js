import { removeButton } from '../lib'

export const ACTIONS = {
  SET_ACTIVE: 'SET_ACTIVE',
  REMOVE_ACTIVE: 'REMOVE_ACTIVE',
  ADD_EXTRACTION: 'ADD_EXTRACTION',
  REMOVE_EXTRACTION: 'REMOVE_EXTRACTION',
  REPLACE_EXTRACTION: 'REPLACE_EXTRACTION'
}

export function createActions (dispatch) {
  return {
    setActive: function (payload) {
      removeButton()
      document.body.classList.add('locked')
      return dispatch({ type: ACTIONS.SET_ACTIVE, payload })
    },
    removeActive: function () {
      document.body.classList.remove('locked')
      return dispatch({ type: ACTIONS.REMOVE_ACTIVE })
    },
    addExtraction: function (payload) {
      document.body.classList.remove('locked')
      return dispatch({ type: ACTIONS.ADD_EXTRACTION, payload })
    },
    removeExtraction: function (payload) {
      return dispatch({ type: ACTIONS.REMOVE_EXTRACTION, payload })
    },
    replaceExtraction: function (extraction, index) {
      return dispatch({ type: ACTIONS.REPLACE_EXTRACTION, payload: { index, extraction } })
    }
  }
}