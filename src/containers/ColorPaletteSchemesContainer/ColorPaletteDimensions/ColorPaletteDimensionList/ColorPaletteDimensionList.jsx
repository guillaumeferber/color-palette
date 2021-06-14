import React, { Component } from 'react';
import ColorPaletteSchemesList from '../../ColorPaletteSchemes/ColorPaletteSchemesList/ColorPaletteSchemesList';
import './_ColorPaletteDimensionList.scss';

class ColorPaletteDimensionList extends Component {

    renderList = () => {
        return this.props.list ? (
            <ColorPaletteSchemesList
                label={this.props.label}
                selected={this.props.selectedColor}
                list={this.props.list}
                onAction={(e) => this.props.onAction(e)}
                onClick={(e) => this.props.onClick(e)}/>
        ) : null;
    }

    render() {
        return (
            <div className='ColorPaletteDimensionList'>{this.renderList()}</div>
         );
    }
}

export default ColorPaletteDimensionList;
