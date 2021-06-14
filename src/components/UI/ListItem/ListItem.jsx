import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './ListItem.scss';

class ListItem extends Component {
    static propTypes = {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        disabledClassName: PropTypes.string,
        label: PropTypes.string,
        active: PropTypes.bool,
        activeClassName: PropTypes.string,
        children: PropTypes.node
    }

    static defaultProps = {
        className: 'ListItem',
        disabled: false,
        disabledClassName: 'disabled',
        label: '',
        active: false,
        activeClassName: 'active'
    }

    renderChildren = () => {
        const { children } = this.props;
        if (children) { return children; }
        return 'List Item';
    }

    render() {
        const {
            className,
            disabled,
            disabledClassName,
            active,
            activeClassName
        } = this.props;

        const _classNames = cx(
            className,
            {
                [disabledClassName]: disabled,
                [activeClassName]: active
            }
        )
        return ( <li className={_classNames}>{this.renderChildren()}</li> );
    }
}

export default ListItem;
