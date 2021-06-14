import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/palette.actions';
import * as colorActionTypes from '../../store/actions/colors.actions';

import Aux from '../../hoc/Aux/Aux';
import './_ColorPaletteManager.scss';
import {ColorPaletteList, ColorPaletteColorList, ColorPaletteToolbar} from '..';
class ColorPaletteManager extends Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.renderColorPaletteColorList();
        }
    }

    renderColorPaletteColorList = () => {
        return this.props.showColorList ? (
            <ColorPaletteColorList />
        ) : null;
    };

    renderColorPaletteList = () => {
        return !this.props.showColorList ? (
                    <ColorPaletteList
                        onClick={(e) => this.props.onPaletteSelected(e)}
                        onDelete={(e) => this.props.onPaletteRemoved(e)}
                        palettes={this.props.paletteList}/>
                ) : null;
    }

    render() {
        return (
            <Aux>
                <div className="ColorPaletteManager">
                    <ColorPaletteToolbar
                        showBack={!this.props.showColorList}
                        showAdd={this.props.showColorList}
                        back={this.props.onPaletteListShow}
                        add={this.props.onPaletteAdded}/>
                    {this.renderColorPaletteList()}
                    {this.renderColorPaletteColorList()}
                </div>
            </Aux>
         );
    }
}

const mapStateToProps = state => ({
    paletteList: state.palettes.paletteList,
    showColorList: state.palettes.showColorList
})

const mapDispatchToProps = dispatch => ({
    onPaletteAdded: () => dispatch({type: actionTypes.ADD_PALETTE}),
    onPaletteRemoved: id => dispatch({type: actionTypes.REMOVE_PALETTE, payload: id}),
    onPaletteSelected: id => dispatch({type: actionTypes.SELECT_PALETTE, payload: id}),
    onPaletteListShow: () => dispatch({type: actionTypes.SHOW_PALETTE_LIST}),

    onColorListSelected: id => dispatch({type: colorActionTypes.SELECT_COLOR_LIST, payload: id})
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorPaletteManager);
