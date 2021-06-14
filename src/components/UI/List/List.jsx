import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './List.scss';

class List extends Component {
    static propTypes = {
        children: PropTypes.node,
        styled: PropTypes.bool,
        styledClassName: PropTypes.string,
        className: PropTypes.string,
        orientation: PropTypes.string
    };

    static defaultProps = {
        className: 'List',
        styledClassName: 'unstyled',
        styled: false,
        orientation: 'column'
    }

    renderChildren = () => {
        const { children } = this.props;
        if (children) {
            return children;
        }
        return 'List';
    }


    render() {
        const {
            className,
            orientation,
            styledClassName,
            styled
          } = this.props;

          const _classnames = cx(
            className,
            orientation,
            {
                [styledClassName]: !styled,
            }
        );
        return (
            <ul className={_classnames}>{this.renderChildren()}</ul>
         );
    }
}

export default List;
