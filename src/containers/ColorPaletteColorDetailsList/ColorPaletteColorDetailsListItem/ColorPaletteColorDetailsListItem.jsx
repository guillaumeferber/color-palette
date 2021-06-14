import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import cx from 'classnames';
import { Input } from '../../../components/UI';
import './ColorPaletteColorDetailsListItem.scss';
var { Hue, Saturation } = require('react-color/lib/components/common');
class ColorPaletteColorDetailsListItem extends Component {

    state = {
        showBar: false,
    }

    renderGradient = () => {
        switch (this.props.name) {
            case 'Hue':
                return (
                    <Hue
                        onChange={ this.handleHueChange }
                        hsl={this.props.value}/>
                );
            case 'Saturation':
                return (
                    <Saturation
                        onChange={ this.handleSaturationChange }
                        hsl={this.props.value}
                        hsv={this.props.value}/>
                    )
            default:
                return null;
        }
    }
    renderGradientBar = () => {
        if ('HEX' !== this.props.name) {
            const _classNames = cx(
                'c-list__item-bar',
                this.state.showBar ? 'is-visible' : null
            );

            return (
                <div className={_classNames}> {this.renderGradient()} </div>
            )
        }
    }

    handleHueChange = (color) => {
        return this.props.handleHueChange(color)
    }

    handleSaturationChange = (color) => {
        return this.props.handleSaturationChange(color)
    }
    handleInputOnClick = () => {
        this.setState({ showBar: !this.state.showBar});
    }

    render() {
        const { color, name, value, thumbnail, className, max, type } = this.props;
        const style = {
            background: color
        }
        const _classNames = cx(
            'ColorPaletteColorDetailsListItem',
            className
        );
        return (
            <Aux>
                <div className={_classNames}>
                    <div className="ColorPaletteColorDetailsListItem--thumb">{thumbnail ? (<span style={style}></span>) : null}</div>
                    <div className="ColorPaletteColorDetailsListItem--values">
                        <span>{name}</span>
                        <Input
                            invert
                            type={type}
                            style={{borderRadius: '3.2rem'}}
                            className="u-uppercase"
                            readonly={true}
                            max={max}
                            onClick={this.handleInputOnClick}
                            value={undefined === value ? color : value} />
                    </div>
                </div>
                {this.renderGradientBar()}
            </Aux>
         );
    }
}

export default ColorPaletteColorDetailsListItem;
