import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import ColorPaletteColorDetailsControl from './ColorPaletteColorDetailsControl/ColorPaletteColorDetailsControl';
import { List, ListItem } from '../../../components/UI';
import {DETAILS_CONTROLS} from '../../../constants/detailsControls';

class ColorPaletteColorDetailsControls extends Component {
    renderDetailsControls = () => {
        return DETAILS_CONTROLS.map((control, idx) => {
            return (
                <ListItem key={`${control.id}%_${idx}`}>
                    <ColorPaletteColorDetailsControl
                        name={control.name}
                        icon={control.icon}
                        onIncrement={(e) => this.props.onIncrement(e)}
                        onDecrement={(e) => this.props.onDecrement(e)}
                    />
                </ListItem>
            );
        });
    }
    render() {
        return (
            <Aux>
                <List>{this.renderDetailsControls()}</List>
            </Aux>
         );
    }
}

export default ColorPaletteColorDetailsControls;
