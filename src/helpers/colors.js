import { generate } from './uuid';
import { COLORS_CONFIG } from '../constants/colors';
import { SCHEMES_CONFIG } from '../constants/schemes';

export const rgbToHsl = (r, g, b) => {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta === 0)
        h = 0;
    // Red is max
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax === g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(2);
    l = +(l * 100).toFixed(2);

    return {
        h,
        s,
        l
    };
}

export const rgbToHsv = (r, g, b) => {
    const hsl = rgbToHsl(r, g, b);
    let cmax = Math.max(r, g, b),
        v = -1, h = hsl.h, s = hsl.s;

        v = cmax;
    return { h, s, v }
}

export const randomColor = () => {
    let hex = '#';
    const range = 'ABCDEF0123456789';
    for (let i = 0; i < 6; i++) {
        hex += range.charAt(Math.floor(Math.random() * range.length));
    }

    const rgbValues = getRGBValues(hex);
    const { r, g, b } = rgbValues;
    return {
        hex: hex,
        rgb: rgbValues,
        hsl: rgbToHsl(r, g, b),
        hsv: rgbToHsv(r, g, b),
    }
}

export const isColorLight = value => value > 50;

export const getRGBValues = value => ({
    r: parseInt(value.substr(1, 2), 16), // Grab the hex representation of red (chars 1-2) and convert to decimal (base 10).
    g: parseInt(value.substr(3, 2), 16),
    b: parseInt(value.substr(5, 2), 16)
});

export const hue2rgb = (p, q, t) => {
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
}

export const hslToRgb = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    var r, g, b;

    if(s === 0){
        r = g = b = l; // achromatic
    }else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    }
}

export const rgbToHex = (r, g, b) => {
    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const hueShift = (hue, shift) => (hue + shift) % 360;

export const hexToRgb = value => {
    if (!Object.keys(value.rgb).length) {
        const { r, g, b } = getRGBValues(value.hex);
        return { r, g, b };
    }
    return value.rgb;
}


export const sortArray = (array, item) => {
    if (array instanceof Object) {
        Object.keys(array).map(key => {
            if (array[key].length < 11) {
                if (array[key].length <= 1) { return array[key].unshift(item); }
                array[key].splice(Math.floor(array[key].length / 2), 0, item);
                return array[key];
            }
            return array[key];
        });
        return array;
    }
}

const isMonochromatic = value => {
    return value === SCHEMES_CONFIG.TYPE_LIST[5].SLUG;
}

const getHueShiftValueList = (type, cb) => {
    let hueShiftValueList;
    switch (type) {
        case SCHEMES_CONFIG.TYPE_LIST[0].SLUG: hueShiftValueList = SCHEMES_CONFIG.HUE_SHIFT_VALUE_LIST.COMPLEMENTARY;
            break;
        case SCHEMES_CONFIG.TYPE_LIST[1].SLUG: hueShiftValueList = SCHEMES_CONFIG.HUE_SHIFT_VALUE_LIST.SPLIT_COMPLEMENTARY;
            break;
        case SCHEMES_CONFIG.TYPE_LIST[2].SLUG: hueShiftValueList = SCHEMES_CONFIG.HUE_SHIFT_VALUE_LIST.TRIADIC;
            break;
        case SCHEMES_CONFIG.TYPE_LIST[3].SLUG: hueShiftValueList = SCHEMES_CONFIG.HUE_SHIFT_VALUE_LIST.TETRADIC;
            break;
        case SCHEMES_CONFIG.TYPE_LIST[4].SLUG: hueShiftValueList = SCHEMES_CONFIG.HUE_SHIFT_VALUE_LIST.ANALOGOUS;
            break;
        case SCHEMES_CONFIG.TYPE_LIST[5].SLUG: hueShiftValueList = SCHEMES_CONFIG.HUE_SHIFT_VALUE_LIST.MONOCHROMATIC;
            break;
        default: hueShiftValueList = SCHEMES_CONFIG.HUE_SHIFT_VALUE_LIST.DEFAULT;
        }
    return {list: hueShiftValueList, isMono: cb(type)};
}

const getSchemes = (schemeList, color) => {
    return schemeList.map(value => {
        let scheme = {...COLORS_CONFIG.DEFAULT_COLOR}; // assign from default color object
        scheme.hsl = {...color.hsl}; // copy HSL values
        scheme.hsv = {...color.hsv}; // copy HSV values
        const _updatedTempH = hueShift(scheme.hsl.h, value); // get new Hue value from scheme type
        scheme.hsl.h = scheme.hsv.h = _updatedTempH; // copy new Hue value to temp color
        const _rgb = hslToRgb(_updatedTempH, scheme.hsl.s, scheme.hsl.l); // get rgb from new HSL value
        scheme.rgb = _rgb; // assign rgb values
        scheme.hex = rgbToHex(_rgb.r, _rgb.g, _rgb.b); // get HEX value from RGB
        scheme.id = generate(); // generate new id
        return scheme;
    });
}

const adjustSaturation = (factor) => factor % 105;// must stop before 105 value

export const getColorSheme = color => {
    // define temp vars
    const _updatedColor = {...color};
    let _red, _green, _blue;
    // check controls
    if (!Object.keys(_updatedColor.hsl).length) {
        const { r, g, b } = hexToRgb(_updatedColor);
        _red = r; _green = g; _blue = b;
        _updatedColor.hsl = rgbToHsl(_red, _green, _blue);
    }
    if (!Object.keys(_updatedColor.hsv).length) {
        _updatedColor.hsv = rgbToHsv(_red, _green, _blue);
    }

    let output = {};
    // map over scheme types (complementary, etc.)
    SCHEMES_CONFIG.TYPE_LIST.map(x => x.SLUG).map(type => {
        const hueShiftValue = getHueShiftValueList(type, isMonochromatic);
        // map over shift values associated with scheme types
        let schemes = [];
        if (!hueShiftValue.isMono) {
            schemes = getSchemes(hueShiftValue.list, {..._updatedColor});
            schemes.unshift(color);
            output[type] = schemes;
        } else {
            for (let i = 100; i >= 0; i -= 5) {
                const _currentScheme = Object.assign({}, color); // assign from default color object
                const _updatedSaturation = adjustSaturation(i);
                const { r, g, b } = hslToRgb(_currentScheme.hsl.h, _updatedSaturation, _currentScheme.hsl.l); // get rgb from new HSL value
                _currentScheme.hsl.s = _currentScheme.hsv.s = _updatedSaturation;
                _currentScheme.rgb = { r, g, b }; // assign
                _currentScheme.hex = rgbToHex(r, g, b); // get HEX value from RGB
                _currentScheme.id = generate(); // generate new id
                schemes.push(_currentScheme);
            }
        }
        output[type] = schemes;
        return schemes;
    });
    return {schemes: output};
}

const getTintFactor = (value, factor) => {
    return Math.round(value + ((255 - value) * factor));
};

const getFactor = (value, factor) => {
    return Math.round(value * factor);
};

const generateColorValuesFromRgb = (r, g, b) => {
    const currrentColor = {...COLORS_CONFIG.DEFAULT_COLOR};
    currrentColor.rgb = { r, g, b };
    currrentColor.hsl = rgbToHsl( r, g, b );
    currrentColor.hex = rgbToHex( r, g, b );
    currrentColor.hsv = rgbToHsv( r, g, b );
    currrentColor.id = generate();
    return currrentColor;
}

const generateColorValuesFromHsl = (h, s, l) => {
    const currrentColor = {...COLORS_CONFIG.DEFAULT_COLOR};
    currrentColor.hsl = { h, s, l };
    currrentColor.rgb = hslToRgb( h, s, l );
    const { r, g, b } = currrentColor.rgb;
    currrentColor.hsv = rgbToHsv( r, g, b );
    currrentColor.hex = rgbToHex( r, g, b );
    currrentColor.id = generate();
    return currrentColor;
}

export const getShades = color => {
    const limit = SCHEMES_CONFIG.DIMENSION_LIMIT;
    const { r, g, b } = color.rgb;
    let factor, o = [];
    for (let i = limit; i >= 0; i--) {
        factor = i/limit;
        const _r = getFactor(r, factor);
        const _g = getFactor(g, factor);
        const _b = getFactor(b, factor);
        o.push(generateColorValuesFromRgb(_r, _g, _b));
    }
    return o;
}

export const getTints = color => {
    const limit = SCHEMES_CONFIG.DIMENSION_LIMIT;
    const { r, g, b } = color.rgb;
    let factor, o = [];
    for (let i = limit; i >= 0; i--) {
        factor = i/limit;
        const _r = getTintFactor(r, factor);
        const _g = getTintFactor(g, factor);
        const _b = getTintFactor(b, factor);
        o.push(generateColorValuesFromRgb(_r, _g, _b));
    }
    return o;
}

export const getTones = color => {
    const limit = SCHEMES_CONFIG.DIMENSION_LIMIT;
    const { h, s, l } = color.hsl;
    let factor, o = [];
    const _h = h;
    for (let i = limit; i >= 0; i--) {
        factor = i/limit;
        const _s = getFactor(s, factor);
        const _l = getFactor(l, factor);
        o.push(generateColorValuesFromHsl(_h, _s, _l));
    }
    return o;
}
