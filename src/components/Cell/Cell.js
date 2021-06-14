import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button } from '../UI/';
import Aux from '../../hoc/Aux/Aux';

class Cell extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        onDelete: PropTypes.func,
        onAction: PropTypes.func,
        children: PropTypes.node,
        className: PropTypes.string,
        activeClassName: PropTypes.string,
        active: PropTypes.bool,
        extraClassNames: PropTypes.array,
        action: PropTypes.string,
        label: PropTypes.string,
        disabledClassName: PropTypes.string,
        disabled: PropTypes.bool,
        style: PropTypes.object,
        customTag: PropTypes.string
    };

    static defaultProps = {
        className: "c-cell",
        activeClassName: "active",
        extraClassNames: [],
        label: "",
        active: false,
        action: null,
        disabled: false,
        disabledClassName: "",
        style: {},
        customTag: 'div'
    };

    handleClick = event => {
        const { onClick, disabled } = this.props;

        if (disabled) return;

        onClick && onClick({ event });
    }

    handleAction = event => {
        const { onAction, onDelete, action } = this.props;
        'add' !== action ? onDelete && onDelete({ event }) : onAction && onAction({ event });
    }

    renderChildren = () => {
        const { label, children, action, style } = this.props;

        if (label) { return label; }
        if (children) {
            return (
                <Aux>
                    <div className='c-cell__body' onClick={this.handleClick}>
                        <span>{children}</span>
                    </div>
                    {action ? <Button
                        color={style.color}
                        type="icon"
                        iconType={action}
                        onClick={this.handleAction} /> : null }
                </Aux>
            )
         }

        return "Cell";
    }

    render() {
        const {
            className,
            disabled,
            disabledClassName,
            extraClassNames,
            style,
            activeClassName,
            customTag,
            active
          } = this.props;

          const _classnames = cx(
            className,
            extraClassNames.join(' '),
            {
                [activeClassName]: active,
                [disabledClassName]: disabled
            }
        );

        const CustomTag = `${customTag}`;
        return (
            <CustomTag
                style={style}
                disabled={this.props.disabled}
                className={_classnames}
                >{this.renderChildren()}</CustomTag>
         );
    }
}

export default Cell;
