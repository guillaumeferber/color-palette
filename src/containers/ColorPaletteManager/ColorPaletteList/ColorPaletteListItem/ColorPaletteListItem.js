import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import {Cell} from '../../../../components/';

class ColorPaletteListItem extends Component {
    render() {
        return (
            <Aux>
                <Cell
                    customTag={this.props.tag}
                    action="delete"
                    onDelete={() => this.props.onDelete(this.props.palette.id)}
                    onClick={() => this.props.onClick(this.props.palette.id)}>
                        {this.props.palette.name}
                    </Cell>
            </Aux>
         );
    }
}

export default ColorPaletteListItem;
