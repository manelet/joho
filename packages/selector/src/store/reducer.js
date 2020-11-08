import initialState from './initial'
import { ACTIONS } from './actions'

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE:
      return {...state, active: action.payload}
    case ACTIONS.REMOVE_ACTIVE:
      return {...state, active: null}
    case ACTIONS.ADD_EXTRACTION:
      return {
        ...state,
        active: null,
        extractions: [...state.extractions, action.payload]
      }
    case ACTIONS.REMOVE_EXTRACTION:
      return {
        ...state,
        extractions: state.extractions.filter((_, i) => i !== action.payload)
      }
    case ACTIONS.REPLACE_EXTRACTION:
      return {
        ...state,
        active: null,
        extractions: Object.assign([], state.extractions, {[action.payload.index]: action.payload.extraction})
      }
    default:
      return {...state}
  }
}