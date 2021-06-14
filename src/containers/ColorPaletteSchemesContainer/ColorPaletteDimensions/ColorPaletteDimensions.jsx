import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import { connect } from 'react-redux';
import './_ColorPaletteDimensions.scss';
import * as schemesActionTypes from '../../../store/actions/schemes.actions';
import * as colorActionTypes from '../../../store/actions/colors.actions';
import cx from 'classnames';
import ColorPaletteDimensionList from './ColorPaletteDimensionList/ColorPaletteDimensionList';
class ColorPaletteDimensions extends Component {

    componentDidMount() {
        this.props.onSchemeVariationsSelected(this.props.selectedColor);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedColor !== this.props.selectedColor) {
            this.props.onSchemeVariationsSelected(this.props.selectedColor);
        }
    }

    renderDimensionList = () => {
        const listArray = [
            { id: 0, label: 'Tints', list: this.props.variationTints },
            { id: 1, label: 'Tones', list: this.props.variationTones },
            { id: 2, label: 'Shades', list: this.props.variationShades }
        ];

        return listArray.map((item, key) => {
            return Object.keys(item).length ? (
                <ColorPaletteDimensionList
                    key={`${item.id}_%${key}`}
                    onClick={(e) => this.props.onColorSelected(e)}
                    onAction={(e) => this.props.onColorAdded(this.props.selectedColorPalette, e.hex)}
                    label={item.label}
                    list={item.list} /> ) : null;
        });
    }
    render() {
        const _classnames = cx(
          'ColorPaletteDimensions',
        );
        return (
            <Aux>
                <div className={_classnames}>
                    {this.renderDimensionList()}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => ({
    selectedColor: state.colors.selectedColor,
    selectedColorPalette: state.palettes.selectedColorPalette,
    variationTints: state.schemes.variationTints,
    variationShades: state.schemes.variationShades,
    variationTones: state.schemes.variationTones,
});

const mapDispatchToProps = dispatch => ({
    onSchemeVariationsSelected: color => dispatch({type: schemesActionTypes.GET_DIMENSIONS, payload: color}),
    onColorSelected: color => dispatch({type: colorActionTypes.SELECT_COLOR, payload: {color}}),
    onColorAdded: (id, hex, options) => dispatch({type: colorActionTypes.ADD_COLOR, payload: {id, hex, options}}),
})
export default connect(mapStateToProps, mapDispatchToProps)(ColorPaletteDimensions);
