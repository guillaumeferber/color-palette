import React, { Component } from 'react';
import './_Pointer.scss';
import cx from 'classnames';

class Pointer extends Component {

    state = {
        mousedown: false,
        x: 0,
        y: 0
    }
    style = () => {
        return {
            left: this.props.left + 'px'
        }
    }
    classNames = () => {
        const { type } = this.props;
        return cx(
            'Pointer',
            type,
            {
                'grabbing': this.state.mousedown
            }
        );
    }

    componentDidMount() {

    }

    handleMouseDown = e => {
        this.setState({mousedown: true});
        const element = e.target;
        this.setState({
            x: element.offsetLeft - e.clientX,
            y: element.offsetTop - e.clientY
        });
    }

    handleMouseUp = e => {
        this.setState({mousedown: false});
        this.props.onMouseUp({x: e.target.offsetLeft, y: e.target.offsetTop});
    }

    handleMouseMove = e => {
        if (this.state.mousedown) {
            const element = e.target;
            element.style.left = e.clientX + this.state.x + 'px';
            element.style.top = e.clientY + this.state.y + 'px';
        }
    }

    render() {
        return (
            <div
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                style={this.style()}
                className={this.classNames()}></div>
         );
    }
}

export default Pointer;
