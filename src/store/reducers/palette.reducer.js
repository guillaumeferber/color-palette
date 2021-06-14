import * as actionTypes from '../actions/palette.actions';
import  { generate } from '../../helpers/uuid';
import { updateObject } from '../utility';
import { PALETTES_CONFIG } from '../../constants/palettes';

const initialState = {
    selectedColorPalette: PALETTES_CONFIG.INITIAL_DATA.SELECTED_COLOR_PALETTE,
    showColorList: PALETTES_CONFIG.INITIAL_DATA.SHOW_COLOR_LIST,
    paletteList: PALETTES_CONFIG.INITIAL_DATA.PALETTE_LIST
};
const addPalette = state => {
    const newPaletteList = [...state.paletteList];
    const _newPalette = {};
    let _newName = PALETTES_CONFIG.DEFAULT_NAME;
    const palettesWithSameName = newPaletteList.filter(palette => palette.name === _newName);
    if (palettesWithSameName.length) {
        _newName += ` ${palettesWithSameName.length + 1}`;
    }
    _newPalette.id = generate();
    _newPalette.name = _newName;
    const _updateNewPaletteList = newPaletteList.concat(_newPalette)
    return updateObject(state, { paletteList: _updateNewPaletteList })
}

const removePalette = (state, action) => {
    return updateObject(state, {
        paletteList: [...state.paletteList].filter(palette => palette.id !== action.payload),
        selectedColorPalette: null
    });
}

const selectPalette = (state, action) => {
    const selectedColorPalette = [...state.paletteList].find(palette => palette.id === action.payload);
    return updateObject(state, {
        selectedColorPalette: selectedColorPalette.id,
        showColorList: !state.showColorList
    });
}

const showPaletteList = state => updateObject(state, { showColorList: false });

const paletteReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PALETTE: return addPalette(state);
        case actionTypes.REMOVE_PALETTE: return removePalette(state, action);
        case actionTypes.SELECT_PALETTE: return selectPalette(state, action);
        case actionTypes.SHOW_PALETTE_LIST: return showPaletteList(state);
        default: return state;
    }
}

export default paletteReducers;
