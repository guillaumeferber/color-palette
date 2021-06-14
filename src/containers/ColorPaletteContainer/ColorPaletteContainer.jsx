import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import {ColorPaletteManager, ColorPaletteColorDetailsList} from '..';
import './_ColorPaletteContainer.scss';
import ColorPaletteSchemesContainer from '../ColorPaletteSchemesContainer/ColorPaletteSchemesContainer';

class ColorPaletteContainer extends Component {

    render() {
        return (
            <Aux>
                <div className="ColorPaletteContainer">
                    <ColorPaletteManager />
                    <ColorPaletteSchemesContainer />
                    <ColorPaletteColorDetailsList />
                </div>
            </Aux>
         );
    }
}

export default ColorPaletteContainer;
