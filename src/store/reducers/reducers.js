import paletteReducers from './palette.reducer';
import colorReducer from './colors.reducer';
import { combineReducers } from 'redux';
import schemesReducer from './schemes.reducer';

const rootReducer = combineReducers({
    palettes: paletteReducers,
    colors: colorReducer,
    schemes: schemesReducer
});

export default rootReducer;
