import React, { Component } from 'react';
import './_ColorPickerSlider.scss';
import Aux from '../../../../hoc/Aux/Aux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
class ColorPickerSlider extends Component {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();

        this.options = {
            width: this.props.style.width || '100%',
            height: this.props.style.height || '100%',
            background: this.props.background
        }

        this.state = {
            mousedown: false
        }
    }
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object,
        background: PropTypes.array
    }

    static defaultProps = {
        style: {},
        background: []
    }

    componentDidMount() {
        this.addBackgroundToCanvas();
    }

    addBackgroundToCanvas = () => {
        const canv = this.canvas.current;
        this.ctx = canv.getContext('2d');

        const gradient = this.ctx.createLinearGradient(0,100,0,0);
        gradient.addColorStop(0,"red");
        gradient.addColorStop(0.15,"yellow");
        gradient.addColorStop(0.3,"green");
        gradient.addColorStop(0.45,"aqua");
        gradient.addColorStop(0.6,"blue");
        gradient.addColorStop(0.7,"fuchsia");
        gradient.addColorStop(1,"red");

        // apply gradients
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, canv.width, canv.height);
    }


    handleMouseDown = e => {
        this.setState({ mousedown: true });
    }

    handleMouseUp = e => {
        if (!this.state.mousedown) return;
        const canv = this.canvas.current;
        const rect = this.canvas.current.getBoundingClientRect();
        // calculate the ratio since the height & width of the canvas are 100%
        // but got a certain value in px
        const {x, y} = {
            x: Math.round(Math.abs((e.clientX - rect.left) / (rect.width / canv.width))),
            y: Math.round(Math.abs((e.clientY - rect.top) / (rect.height / canv.height)))
        }
        const { data } = this.ctx.getImageData(x, y, 1, 1);
        const { onChange } = this.props;
        // emit the value to the parent
        onChange && onChange({
            r: data[0],
            g: data[1],
            b: data[2],
            // a: Math.round(data[3] / 255)
        });
        this.setState({ mousedown: false });
    }

    renderCanvas = () => {
        const { style, orientation } = this.props;
        const _classnames = cx(
            'ColorPickerSlider',
            orientation
        );
        return (
            <Aux>
                <div className={_classnames}>
                    <canvas
                        style={style}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        height={this.options.height}
                        width={this.options.width}
                        ref={this.canvas} >
                    </canvas>
                </div>
                {this.props.children}
            </Aux>
        )
    }

    render() {
        return (
            this.renderCanvas()
         );
    }
}

export default ColorPickerSlider;
