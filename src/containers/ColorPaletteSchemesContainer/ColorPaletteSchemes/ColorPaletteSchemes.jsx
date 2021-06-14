import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import { connect } from 'react-redux';
import * as colorActionTypes from '../../../store/actions/colors.actions';
import * as schemesActionTypes from '../../../store/actions/schemes.actions';
import cx from 'classnames';
import ColorPaletteSchemesList from './ColorPaletteSchemesList/ColorPaletteSchemesList';
import './ColorPaletteSchemes.scss';
import { SCHEMES_CONFIG } from '../../../constants/schemes';

class ColorPaletteSchemes extends Component {

    componentDidMount() {
        this.props.onSchemeListSelected(this.props.selectedColor);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedColor.hex !== this.props.selectedColor.hex) {
            this.props.onSchemeListSelected(this.props.selectedColor);
        }
    }

    renderColorPaletteShemesList = () => {
        return this.props.schemeList ?
            SCHEMES_CONFIG.TYPE_LIST.map((schemesType, idx) => {
                return [4, 5].indexOf(idx) < 0 ? (
                    <ColorPaletteSchemesList
                        key={idx}
                        label={schemesType.NAME}
                        selected={this.props.selectedColor}
                        list={this.props.schemeList.schemes[schemesType.SLUG]}
                        onAction={(e) => this.props.onColorAdded(this.props.selectedColorPalette, e.hex)}
                        onClick={(e) => this.props.onColorSelected(e)}/>
                ) : null;
            }) : null;
    }
    render() {
        const _classnames = cx(
            'ColorPaletteSchemes',
        );
        return (
            <Aux>
                <div className={_classnames}>
                    <div>
                        {this.renderColorPaletteShemesList()}
                    </div>
                    <div>
                        {this.props.schemeList ?
                            <ColorPaletteSchemesList
                                label={SCHEMES_CONFIG.TYPE_LIST[4].NAME}
                                list={this.props.schemeList.schemes[SCHEMES_CONFIG.TYPE_LIST[4].SLUG]}
                                selected={this.props.selectedColor}
                                onAction={(e) => this.props.onColorAdded(this.props.selectedColorPalette, e.hex)}
                                onClick={(e) => this.props.onColorSelected(e)} />
                    : null}
                    </div>
                    <div>
                    {this.props.schemeList ?
                        <ColorPaletteSchemesList
                            label={SCHEMES_CONFIG.TYPE_LIST[5].NAME}
                            list={this.props.schemeList.schemes[SCHEMES_CONFIG.TYPE_LIST[5].SLUG]}
                            selected={this.props.selectedColor}
                            onAction={(e) => this.props.onColorAdded(this.props.selectedColorPalette, e.hex)}
                            onClick={(e) => this.props.onColorSelected(e)} />
                    : null}
                    </div>
                </div>
            </Aux>
         );
    }
}

const mapStateToProps = state => {
    return {
        selectedColor: state.colors.selectedColor,
        selectedColorPalette: state.palettes.selectedColorPalette,
        schemeList: state.schemes.schemeList,
    }
};

const mapDispatchToProps = dispatch => ({
    onColorSelected: color => dispatch({type: colorActionTypes.SELECT_COLOR, payload: {color}}),
    onSchemeListSelected: color => dispatch({type: schemesActionTypes.GET_SCHEME, payload: color}),
    onColorAdded: (id, hex, options) => dispatch({type: colorActionTypes.ADD_COLOR, payload: {id, hex, options}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorPaletteSchemes);
