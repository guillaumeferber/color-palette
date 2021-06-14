import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import { connect } from 'react-redux';
import {ColorPaletteColorListItem} from '../../';
import { Button } from '../../../components/UI';
import * as actionTypes from '../../../store/actions/colors.actions';
import { isColorLight } from '../../../helpers/colors';
class ColorPaletteColorList extends Component {

    componentDidMount() {
        this.props.onColorListSelected(this.props.selectedColorPalette);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.selectedColorList) {
            this.props.onColorListAdded(this.props.selectedColorPalette);
        }
    }

    renderPaletteColorList = () => {
        if (!this.props.selectedColorList)  return null;
        return (
            <ul className="u-list-unstyled">
                {this.props.selectedColorList.list.map((color, idx) => {
                    return (
                        <ColorPaletteColorListItem
                            tag="li"
                            key={`${color.id}_%_${idx}`}
                            style={{background: color.hex, color: isColorLight(color.hsl.l) ? '#333' : '#fff'}}
                            isSelected={this.props.selectedColor?.id === color.id}
                            onClick={(e) => this.props.onColorSelected(e)}
                            onDelete={(e) => this.props.onColorDeleted(this.props.selectedColorList.paletteId, e)}
                            color={color} />
                    )
                })}
            </ul>
        )
    }
    render() {
        return (
            <Aux>
                {this.renderPaletteColorList()}
                <Button
                    type='icon'
                    ariaLabel='Add new color'
                    className='Button u-m-t-md icon u-float-right'
                    iconType='add-em'
                    iconSize='large'
                    onClick={() => this.props.onColorAdded(this.props.selectedColorPalette)} />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedColorPalette: state.palettes.selectedColorPalette,
        selectedColorList: state.colors.selectedColorList,
        selectedColor: state.colors.selectedColor
    }
};

const mapDispatchToProps = dispatch => ({
    onColorListSelected: id => dispatch({type: actionTypes.SELECT_COLOR_LIST, payload: id}),
    onColorListAdded: id => dispatch({type: actionTypes.ADD_COLOR_LIST, payload: id}),
    onColorSelected: color => dispatch({type: actionTypes.SELECT_COLOR, payload: {color}}),
    onColorAdded: (id, hex, options) => dispatch({type: actionTypes.ADD_COLOR, payload: {id, hex, options}}),
    onColorDeleted: (paletteId, id) => dispatch({type: actionTypes.REMOVE_COLOR, payload: {paletteId: paletteId, id}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorPaletteColorList);
