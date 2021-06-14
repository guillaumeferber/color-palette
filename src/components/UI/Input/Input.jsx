import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './_Input.scss';
import Aux from '../../../hoc/Aux/Aux';
import { generate } from '../../../helpers/uuid';

class Input extends Component {
    static propTypes = {
        className: PropTypes.string,
        element: PropTypes.string,
        max: PropTypes.string,
        min: PropTypes.string,
        id: PropTypes.string,
        invert: PropTypes.bool,
        readonly: PropTypes.bool,
        children: PropTypes.node,
        value: PropTypes.node,
        label: PropTypes.string,
        onFocus: PropTypes.func,
        onClick: PropTypes.func,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        type: PropTypes.string,
        style: PropTypes.object,
        placeholder: PropTypes.string
    };

    static defaultProps = {
        className: 'c-input',
        element: 'input',
        type: 'text',
        disabled: false,
        value: '',
        max: '100',
        min: '0',
        readonly: false,
        placeholder: '',
        label: '',
        invert: false,
        id: ''
    };

    handleClick = event => {
        const { disabled, onClick } = this.props;
        if (disabled) { return; }
        onClick && onClick({ event });
    }

    handleFocus = event => {
        const { disabled, onFocus } = this.props;
        if (disabled) { return; }
        onFocus && onFocus({ event });
    }

    handleChange = event => {
        const { disabled, onChange } = this.props;
        if (disabled) { return; }
        onChange && onChange({ event });
    }

    renderLabel = (id) => {
        const { label } = this.props;
        if (label) {
            return (
                <label htmlFor={id}>{label}</label>
            )
        }
        return null;
    }

    renderChildren = () => {
        const { children } = this.props;
        return children ? children : 'Input';
    }

    renderHint = () => {
        const { hint } = this.props;
        if (hint) {
            return (
                <span className='Input__hint'>{hint}</span>
            )
        }
    }
    renderElement = () => {
        const {
            className,
            disabled,
            type,
            element,
            min, max,
            style,
            value,
            placeholder,
            readonly,
            invert
          } = this.props;

          const _classnames = cx(
            'Input',
            className,
            `Input--${type}`,
            {
              'Input--invert': invert
            }
        );

        const ElementCustomTag = `${element}`;
        let _id;
        if ('textarea' === element) {
            _id = generate();
            return (
                <Aux>
                    <div className='Input-group'>
                        <ElementCustomTag
                            style={style}
                            id={_id}
                            className={_classnames}
                            onFocus={this.handleFocus}
                            onChange={this.handleChange}
                            onClick={this.handleClick}
                            readOnly={readonly ? 'readonly' : null}
                            placeholder={placeholder}>{this.renderChildren}</ElementCustomTag>
                            {this.renderLabel(_id)}
                            {this.renderHint()}
                    </div>
                </Aux>
            );
        }
        _id = generate();
        return (
            <Aux>
                <div className='Input-group'>

                    <ElementCustomTag
                        style={style}
                        type={type}
                        min={min}
                        max={max}
                        value={value}
                        id={_id}
                        disabled={disabled}
                        className={_classnames}
                        onFocus={this.handleFocus}
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                        readOnly={readonly ? 'readonly' : null}
                        placeholder={placeholder ? placeholder : null} />
                        {this.renderLabel(_id)}
                        {this.renderHint()}
                </div>
            </Aux>
        );


    }

    render() {
        return this.renderElement();
    }
}

export default Input;
