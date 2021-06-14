import { updateObject } from '../utility';
import * as actionTypes from '../actions/schemes.actions';
import { getColorSheme, getShades, getTints, getTones } from '../../helpers/colors';

const initialState = {
    schemeList:null,
    variationShades: null,
    variationTints: null,
    variationTones: null,
}

const getScheme = (state, action) => updateObject(state, {
    schemeList: getColorSheme(action.payload)
});

const getDimensions = (state, action) => updateObject(state, {
    variationShades: getShades(action.payload),
    variationTints: getTints(action.payload),
    variationTones: getTones(action.payload)
});

const schemesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SCHEME: return getScheme(state, action);
        case actionTypes.GET_DIMENSIONS: return getDimensions(state, action);
        default: return state;
    }
}

export default schemesReducer;
