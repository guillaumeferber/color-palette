import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Trash, Copy, ArrowLeft, Plus, PlusCircle } from 'react-feather';
import './_Button.scss';

class Button extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.node,
        className: PropTypes.string,
        label: PropTypes.string,
        ariaLabel: PropTypes.string,
        type: PropTypes.string,
        iconType: PropTypes.string,
        iconSize: PropTypes.string,
        disabledClassName: PropTypes.string,
        disabled: PropTypes.bool,
        color: PropTypes.string
    };

    static defaultProps = {
        className: "Button",
        ariaLabel: 'Button',
        label: "",
        iconSize: 'medium',
        type: 'button',
        iconType: null,
        disabled: false,
        disabledClassName: '',
        color: ''
    };

    handleClick = event => {
        const { onClick, disabled } = this.props;

        if (disabled) return;

        onClick && onClick({ event });
    }

    renderChildren = () => {
        const { label, children , type, iconType, iconSize, color } = this.props;
        const _classnames = cx(
            `Button__icon--${iconSize}`
        );
        if (label) { return label; }
        if (children) {
            return (
                <div className='Button__body'>
                    <span>{children}</span>
                </div>
            )
         } else if (type === 'icon') {
             let iconElement;
            if (iconType) {
                switch (iconType) {
                    case 'delete':
                        iconElement = <Trash />;
                        break;
                    case 'copy':
                        iconElement = <Copy />;
                        break;
                    case 'arrow-left':
                        iconElement = <ArrowLeft />;
                        break;
                    case 'add':
                        iconElement = <Plus />;
                        break;
                    case 'add-em':
                        iconElement = <PlusCircle />;
                        break;
                    default:
                        iconElement = null;
                }
            }
            return <span style={{color: color ? color : '#fff'}} className={_classnames}>{iconElement}</span>;
        }

        return "Button";
    }

    render() {
        const {
            className,
            disabled,
            type,
            ariaLabel,
            disabledClassName
          } = this.props;

          const _classnames = cx(
            className,
            type,
            {
              [disabledClassName]: disabled
            }
        );

        return (
            <button
                type="button"
                aria-label={ariaLabel}
                disabled={this.props.disabled}
                className={_classnames}
                onClick={this.handleClick}>{this.renderChildren()}</button>
         );
    }

}

export default Button;
