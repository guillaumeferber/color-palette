import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorActions from '../../../store/actions/colors.actions';
import { rgbToHsl, rgbToHex, rgbToHsv } from '../../../helpers/colors';
import { generate } from '../../../helpers/uuid';

import Aux from '../../../hoc/Aux/Aux';
import cx from 'classnames';
import { ColorPicker } from '../../../components/UI';

class ColorPaletteSpectrum extends Component {

    handleColorPickerChange = e => {
        const { r, g, b } = e.event;
        const color = {
            rgb: { r, g, b},
            hsl: rgbToHsl(r, g, b),
            hex: rgbToHex(r, g, b),
            hsv: rgbToHsv(r, g, b),
        }
        color.id = generate();
        this.props.onColorSelected(color);
    }
    render() {
        const _classnames = cx(
            'ColorPaletteDimensions',
        );
        return (
            <Aux>
                <div className={_classnames}>
                    <ColorPicker
                        type='default'
                        background='rgba(44, 255, 0, 1)'
                        onChange={(e) => this.handleColorPickerChange(e)}/>
                </div>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onColorSelected: color => dispatch({type: colorActions.SELECT_COLOR, payload: {color}})
})
export default connect(null, mapDispatchToProps)(ColorPaletteSpectrum);
