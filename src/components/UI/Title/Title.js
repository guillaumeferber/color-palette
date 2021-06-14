import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './_Title.scss';
import cx from 'classnames';
class Title extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        variant: PropTypes.string,
        level: PropTypes.string
    };

    static defaultProps = {
        variant: 'basic',
        level: '1',
        className: ''
    };
    render() {
        const { level, variant, className, children } = this.props;
        const _classNames = cx(
            className,
            styles.Title,
            styles[variant]
        );
        const CustomTag = `h${level}`;
        return ( <CustomTag className={_classNames}>{children}</CustomTag> );
    }
}

export default Title;
