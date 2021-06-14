import * as actionTypes from '../actions/colors.actions';
import { updateObject } from '../utility';
import  { generate } from '../../helpers/uuid';
import  { getRGBValues, rgbToHsl, randomColor, rgbToHsv } from '../../helpers/colors';
import { COLORS_CONFIG } from '../../constants/colors';

const initialState = {
    selectedColorList: COLORS_CONFIG.INITIAL_DATA.SELECTED_COLOR_LIST,
    selectedColor: COLORS_CONFIG.INITIAL_DATA.SELECTED_COLOR,
    colors: COLORS_CONFIG.INITIAL_DATA.COLORS
}

const selectColorList = (state, action) => {
    const _colors = [...state.colors];
    if (_colors.findIndex(color => color.paletteId === action.payload) < 0) {
        addColorList(state, action);
    }
    const _selectedColorPaletteIdx = _colors.findIndex(color => color.paletteId === action.payload);
    const _selectedColorPalette = _colors[_selectedColorPaletteIdx];
    const _updatedSelectedPaletteColor = _selectedColorPalette.list.map(listItem => {
        let r, g, b;
        if (!listItem.rgb) {
            const rgb = getRGBValues(listItem.hex);
            r = rgb.r;
            g = rgb.g;
            b = rgb.b;
            listItem.rgb = rgb;
        }
        listItem.hsl = !listItem.hsl ? rgbToHsl(r, g, b) : listItem.hsl;
        listItem.hsv = !listItem.hsv ? rgbToHsv(r, g, b) : listItem.hsv;
        return listItem;
    });
    _selectedColorPalette.list = _updatedSelectedPaletteColor;
    _colors[_selectedColorPaletteIdx] = _selectedColorPalette;
    return updateObject(state, {
        selectedColorList: _selectedColorPalette,
        colors: _colors
    });
};

const addColorList = (state, action) => {
    const _colorPaletteList = [...state.colors];
    const _newColorList = Object.assign([], state.colors)[0];
    _newColorList.paletteId = action.payload;
    const _updatedColorList = _colorPaletteList.concat(_newColorList);
    return updateObject(state, {
        colors: _updatedColorList,
        selectedColorList: _newColorList
     });
}

const selectColor = (state, action) => updateObject(state, { selectedColor: action.payload.color });

const addColor = (state, action) => {
    const _colorPaletteList = [...state.colors]; // get the color list
    const _selectedColorPaletteIdx = _colorPaletteList.findIndex(colorItem => colorItem.paletteId === action.payload.id); // get the index for the selected palette
    // console.log(action.payload.id, _selectedColorPaletteIdx);
    if (_selectedColorPaletteIdx === -1) {
        return updateObject(state, { selectedColor: action.payload.color });
    }
    const _selectedColorPaletteColorList = {..._colorPaletteList[_selectedColorPaletteIdx]}; // get color list from selected palette
    let _newColor;
    // generate new default color
    if (action.payload.options && action.payload.options.random) {
        _newColor = randomColor();
    } else {
        const rgb = getRGBValues(action.payload.hex || '#333333');
        const { r, g, b } = rgb;
        _newColor = {
            id: generate(),
            hex: action.payload.hex || '#333333',
            rgb: rgb,
            hsl: rgbToHsl(r, g, b),
            hsv: rgbToHsv(r, g, b)
        };

        // concat new color to color list of the selected palette
        const _updatedSelectedColorPaletteColorList = _selectedColorPaletteColorList.list.concat(_newColor);
        // assign updated color list to selected palette's color list
        _selectedColorPaletteColorList.list = _updatedSelectedColorPaletteColorList;
        // assign updated selected palette to color list
        _colorPaletteList[_selectedColorPaletteIdx] = _selectedColorPaletteColorList;
        return updateObject(state, {
            colors: _colorPaletteList,
            selectedColorList: _colorPaletteList[_selectedColorPaletteIdx],
        });
    }
    _newColor.id = generate();

    return updateObject(state, {
        selectedColor: _newColor
    });
}

const removeColor = (state, action) => {
    const _colorPaletteList = [...state.colors]; // get the color list
    const _selectedColorPaletteIdx = _colorPaletteList.findIndex(colorItem => colorItem.paletteId === action.payload.paletteId); // get the index for the selected palette
    const _selectedColorPaletteColorList = {..._colorPaletteList[_selectedColorPaletteIdx]}; // get color list from selected palette
    // filter color list of the selected palette
    const _updatedSelectedColorPaletteColorList = _selectedColorPaletteColorList.list.filter(listItem => listItem.id !== action.payload.id);
    // assign updated color list to selected palette's color list
    _selectedColorPaletteColorList.list = _updatedSelectedColorPaletteColorList;
    // assign updated selected palette to color list
    _colorPaletteList[_selectedColorPaletteIdx] = _selectedColorPaletteColorList;

    return updateObject(state, {
        colors: _colorPaletteList,
        selectedColorList: _colorPaletteList[_selectedColorPaletteIdx]
    });
}

const updateColorHue = (state, action) => {
    const _colors = [...state.colors];
    const _selectedColor = {...state.selectedColor};
    if (_selectedColor.hsl) {
        _selectedColor.hsl.h = Math.floor(action.payload.hue.h);
        _selectedColor.hsv.h = Math.floor(action.payload.hue.h);
    }
    if (action.payload.selectedPalette) {
        const _selectedColorPaletteIdx = _colors.findIndex(color => color.paletteId === action.payload.selectedPalette);
        const _colorIdx = _colors[_selectedColorPaletteIdx].list.findIndex(color => color.id === _selectedColor.id);
        _colors[_selectedColorPaletteIdx].list[_colorIdx] = _selectedColor;
    }
    return updateObject(state, { selectedColor: _selectedColor, colors: _colors });
}


const updateColorLightness = (state, action) => {
    const _selectedColor = {...state.selectedColor};
    if (_selectedColor.hsl) {
        switch (action.payload.direction) {
            case 'decrement':
                if (_selectedColor.hsl.l > 0) {
                    _selectedColor.hsl.l = _selectedColor.hsl.l < 1 ? 0 : _selectedColor.hsl.l - 1;
                }
                break;
                default:
                    _selectedColor.hsl.l = _selectedColor.hsl.l > 100 ? 100 : _selectedColor.hsl.l + 1;
        }
    }
    return updateObject(state, { selectedColor: _selectedColor });
}

const updateColorSaturation = (state, action) => {
    const _selectedColor = {...state.selectedColor};
    if (_selectedColor.hsl && _selectedColor.hsv) {
        if (action.payload.direction) {
            switch (action.payload.direction) {
                case 'decrement':
                    if (_selectedColor.hsl.s > 0) {
                        _selectedColor.hsl.s -= 1;
                        _selectedColor.hsv.s -= 1;
                     }
                    break;
                default:
                    if (_selectedColor.hsl.s < 100) {
                        _selectedColor.hsl.s += 1;
                        _selectedColor.hsv.s += 1;
                    }
            }
        } else if (action.payload.saturation) {
            const sat = action.payload.saturation.s < 1 ? Math.floor(action.payload.saturation.s * 100) : action.payload.saturation.s;
            _selectedColor.hsl.s = sat;
            _selectedColor.hsv.s = sat;
        }
    }
    return updateObject(state, { selectedColor: _selectedColor });
}

const colorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_COLOR_LIST: return selectColorList(state, action);
        case actionTypes.ADD_COLOR_LIST: return addColorList(state, action);
        case actionTypes.SELECT_COLOR: return selectColor(state, action);
        case actionTypes.ADD_COLOR: return addColor(state, action);
        case actionTypes.REMOVE_COLOR: return removeColor(state, action);
        case actionTypes.UPDATE_COLOR_LIGHTNESS: return updateColorLightness(state, action);
        case actionTypes.UPDATE_COLOR_SATURATION: return updateColorSaturation(state, action);
        case actionTypes.UPDATE_COLOR_HUE: return updateColorHue(state, action);
        default: return state;
    }
}

export default colorReducer;
