export const SCHEMES_CONFIG = {
    TYPE_LIST: [
        {
            NAME: 'Complementary',
            SLUG: 'complementary'
        },
        {
            NAME: 'Split Complementary',
            SLUG: 'splitComplementary'
        },
        {
            NAME: 'Triadic',
            SLUG: 'triadic'
        },
        {
            NAME: 'Tetradic',
            SLUG: 'tetradic'
        },
        {
            NAME: 'Analogous',
            SLUG: 'analogous'
        },
        {
            NAME: 'Monochromatic',
            SLUG: 'monochromatic'
        },
    ],
    DIMENSION_LIMIT: 19,
    HUE_SHIFT_VALUE_LIST: {
        COMPLEMENTARY: [180],
        SPLIT_COMPLEMENTARY: [150, 210],
        TRIADIC: [120, 240],
        TETRADIC: [90, 180, 270],
        ANALOGOUS: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
        MONOCHROMATIC: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
        DEFAULT: [0]
    }
}
