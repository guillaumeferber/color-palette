import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './ColorPalettePicker.scss';
import Aux from '../../../../hoc/Aux/Aux';

class ColorPalettePicker extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();

        this.options = {
            width: this.props.width || '100%',
            height: this.props.height || '100%',

        }

        this.state = {
            mousedown: false,
            background: props.background || 'rgb(255, 0, 0)'
        }
    }
    static propTypes = {
        background: PropTypes.string,
        children: PropTypes.node,
        style: PropTypes.object
    }

    static defaultProps = {
        background: '',
        style: {}
    }


    componentDidMount() {
        this.addBackgroundToCanvas(this.state.background);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.background !== this.props.background) {
            this.setState({background: this.props.background});
            this.addBackgroundToCanvas(this.state.background);
        }
    }

    addBackgroundToCanvas = (color) => {
        const canv = this.canvas.current;
        this.ctx = canv.getContext('2d');

        // gradients
        // color gradient
        const colorGradient = this.ctx.createLinearGradient(100, 0, 0, 100);
        colorGradient.addColorStop(0, color);
        colorGradient.addColorStop(1, 'transparent');

        // black gradient
        const blackGradient = this.ctx.createLinearGradient(100, 100, 100, 0);
        blackGradient.addColorStop(0, '#000000');
        blackGradient.addColorStop(1, 'transparent');

        // white gradient
        const whiteGradient = this.ctx.createLinearGradient(0,0,100,100);
        whiteGradient.addColorStop(0, '#ffffff');
        whiteGradient.addColorStop(1, 'transparent');

        // apply gradients
        this.ctx.fillStyle = colorGradient;
        this.ctx.fillRect(0, 0, canv.width, canv.height);

        this.ctx.fillStyle = whiteGradient;
        this.ctx.fillRect(0, 0, canv.width, canv.height);

        this.ctx.fillStyle = blackGradient;
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
        return (
            <Aux>
                <div className='ColorPalettePicker'>
                    <canvas
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

export default ColorPalettePicker;
