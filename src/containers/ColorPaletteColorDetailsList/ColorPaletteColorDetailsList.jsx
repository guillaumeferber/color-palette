import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/colors.actions';

import './ColorPaletteColorDetailsList.scss';
import ColorPaletteColorDetailsListItem from './ColorPaletteColorDetailsListItem/ColorPaletteColorDetailsListItem';
import ColorPaletteColorDetailsRgb from './ColorPaletteColorDetailsRgb/ColorPaletteColorDetailsRgb';
import ColorPaletteColorDetailsHsl from './ColorPaletteColorDetailsHsl/ColorPaletteColorDetailsHsl';
import ColorPaletteColorDetailsControls from './ColorPaletteColorDetailsControls/ColorPaletteColorDetailsControls';
import ColorPaletteColorDetailsExtraActions from './ColorPaletteColorDetailsExtraActions/ColorPaletteColorDetailsExtraActions';

class ColorPaletteColorDetailsList extends Component {

    renderColorDetailListItemHex = () => {
        return this.props.selectedColor ? (
            <ul className="u-list-unstyled c-list">
                <li>
                    <ColorPaletteColorDetailsListItem
                        name="HEX"
                        thumbnail={true}
                        color={this.props.selectedColor.hex}
                    />
                </li>
            </ul>
        ) : null;
    }
    onIncrementHandler = (e) => {
        'Brightness' === e ? this.props.updateColorLightness('increment') : this.props.updateColorSaturation('increment');
    }

    onDecrementHandler = (e) => {
        'Brightness' === e ? this.props.updateColorLightness('decrement') : this.props.updateColorSaturation('decrement');
    }

    render() {
        return (
            <Aux>
                <div className="ColorPaletteColorDetailsList">
                    <h4 className='u-p-l-sm'>Base Color</h4>
                    { this.props.selectedColor ? (
                        <Aux>
                            {this.renderColorDetailListItemHex()}
                            <ColorPaletteColorDetailsHsl
                                max={['360', '100']}
                                id={this.props.selectedColor.id}
                                handleHueChange={(hue) => this.props.updateColorHue(this.props.selectedColorPalette, hue)}
                                handleSaturationChange={(saturation) => this.props.updateColorSaturation(null, saturation)}
                                type='number'
                                colors={this.props.selectedColor.hsl}
                                value={this.props.selectedColor.hex} />
                            <ColorPaletteColorDetailsRgb
                                max='255'
                                id={this.props.selectedColor.id}
                                type='number'
                                colors={this.props.selectedColor.rgb} />
                            <ColorPaletteColorDetailsControls
                                onIncrement={(e) => this.onIncrementHandler(e)}
                                onDecrement={(e) => this.onDecrementHandler(e)} />
                            <ColorPaletteColorDetailsExtraActions onClick={() => this.props.onRandomColorAdded(this.props.selectedColorPalette, null, {random: true})} />
                        </Aux>

                    ) : null }
                </div>
            </Aux>
         );
    }
}

const mapStateToProps = state => ({
    selectedColor: state.colors.selectedColor,
    selectedColorPalette: state.palettes.selectedColorPalette,
});
const mapDispatchToProps = dispatch => ({
    onRandomColorAdded: (id, hex, options) => dispatch({ type: actionTypes.ADD_COLOR, payload: { id, hex, options}}),
    updateColorLightness: (direction) => dispatch({type: actionTypes.UPDATE_COLOR_LIGHTNESS, payload: {direction}}),
    updateColorSaturation: (direction, saturation) => dispatch({type: actionTypes.UPDATE_COLOR_SATURATION, payload: {direction, saturation}}),
    updateColorHue: (selectedPalette, hue) => dispatch({type: actionTypes.UPDATE_COLOR_HUE, payload: {selectedPalette, hue}}),
})
export default connect(mapStateToProps, mapDispatchToProps)(ColorPaletteColorDetailsList);
