import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import {ColorPaletteListItem} from '../../';

class ColorPaletteList extends Component {
    renderColorPaletteList = () => {
        return (
            <ul className="u-list-unstyled">
                {this.props.palettes.map((palette, idx) => {
                    return (
                        <ColorPaletteListItem
                            tag="li"
                            key={`${idx}_${palette.id}`}
                            onClick={(e) => this.props.onClick(e)}
                            onDelete={(e) => this.props.onDelete(e)}
                            palette={palette} />
                    )
                })}
            </ul>
        )
    }
    render() {
        return (
            <Aux>
                {this.renderColorPaletteList()}
            </Aux>
         );
    }
}

export default ColorPaletteList;
