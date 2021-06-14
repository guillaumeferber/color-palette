import  { generate } from '../helpers/uuid';

export const COLORS_CONFIG = {
    BASE_COLORS: {
        RED: '#ff0000',
        GREEN: '#00FF00',
        BLUE: '#0000FF'
    },
    DEFAULT_COLOR: {
        id: 0,
        hex: '#ffffff',
        hsl: { h: 0, s: 0, l: 100 },
        rgb: { r: 255, g: 255, b: 255 },
        hsv: { h: 0, s: 0, v: 100 }
    },
    GRADIENTS: {
        DEFAULT: 'hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%)'
    },
    INITIAL_DATA: {
        SELECTED_COLOR_LIST: null,
        SELECTED_COLOR: {
            id: 0,
            hex: '#ffffff',
            hsl: { h: 0, s: 0, l: 100 },
            rgb: { r: 255, g: 255, b: 255 },
            hsv: { h: 0, s: 0, v: 100 }
        },
        COLORS: [
            {
                id: generate(),
                paletteId: null,
                list: []
            },
            {
                id: generate(),
                paletteId: 0,
                list: [
                    {
                        id: generate(),
                        hex: '#f7b2a4',
                        hsl: null,
                        rgb: null,
                        hsv: null
                    },
                    {
                        id: generate(),
                        hex: '#f0f5f5',
                        hsl: null,
                        rgb: null,
                        hsv: null
                    },
                ]
            },
            {
                id: generate(),
                paletteId: 1,
                list:  [
                    {
                        id: generate(),
                        hex: '#cf234e',
                        hsl: null,
                        rgb: null,
                        hsv: null
                    },
                    {
                        id: generate(),
                        hex: '#ff6347',
                        hsl: null,
                        rgb: null,
                        hsv: null
                    },
                    {
                        id: generate(),
                        hex: '#0071ee',
                        hsl: null,
                        rgb: null,
                        hsv: null
                    },
                ]
            }
        ]
    }
};
