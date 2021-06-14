import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import { Pointer } from '../index';
import ColorPickerSlider from './ColorPickerSlider/ColorPickerSlider';
import ColorPalettePicker from './ColorPalettePicker/ColorPalettePicker';
import './_ColorPicker.scss';

class ColorPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coordinates: null,
            background: props.background
        }
    }
    static propTypes = {
        type: PropTypes.string,
        background: PropTypes.string,
        className: PropTypes.string,
        onChange: PropTypes.func
    }

    static defaultProps = {
        type: '',
        className: '',
        background: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.background !== this.state.background) {
            this.setState({background: this.state.background});
        }
    }

    handleChange = (event) => {
        const { onChange } = this.props;
        onChange && onChange({event})
    }

    handleSpetrumChange = e => {
        const { r, g, b } = e;
        this.setState({background: `rgba(${r}, ${g}, ${b})`});
    }

    renderChildren = () => {
        const { type } = this.props;
        switch (type) {
            case 'default':

                const sliderStyle = {
                    height: '100%'
                };
                return (
                    <div className='u-d-flex u-justify-content-space-between'>
                        <ColorPalettePicker
                            onChange={this.handleChange}
                            background={this.state.background} >
                        </ColorPalettePicker>
                        <ColorPickerSlider
                            orientation='vertical'
                            style={sliderStyle}
                            onChange={(e) => this.handleSpetrumChange(e)}>
                        </ColorPickerSlider>
                    </div>
                );
            case 'slider':
            return (
                <ColorPickerSlider>
                    <Pointer type='slider' />
                </ColorPickerSlider>
            );
            default: return null;
        }
    }

    render() {
        const { className } = this.props;
        const _classnames = cx(
            'ColorPicker',
            className
        );
        return (
            <div className={_classnames}>
                {this.renderChildren()}
            </div>
        );
    }
}

export default ColorPicker;
