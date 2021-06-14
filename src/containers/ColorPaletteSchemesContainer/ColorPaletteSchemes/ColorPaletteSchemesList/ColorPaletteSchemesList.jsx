import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { List, Title } from '../../../../components/UI/';
import Cell from '../../../../components/Cell/Cell';
import { isColorLight } from '../../../../helpers/colors';

class ColorPaletteSchemesList extends Component {
    static propTypes = {
        label: PropTypes.string,
        children: PropTypes.node,
        className: PropTypes.string,
        list: PropTypes.array,
        onClick: PropTypes.func,
        onColorAdd: PropTypes.func,
        selected: PropTypes.object
    }

    static defaultProps = {
        className: 'ColorPaletteSchemesList',
        label: '',
    }

    renderChildrenCellStyle = color => {
        return {
            background: color.hex,
            color: isColorLight(color.hsl?.l) ? '#333' : '#fff'
        }
    }

    renderSchemeColor = list => {
        return (
            <Aux>
                {list.map((color, idx) => {
                    return (
                        <Cell
                            active={this.props.selected === color.id}
                            customTag='li'
                            key={`${color.id}%_${idx}`}
                            style={this.renderChildrenCellStyle(color)}
                            onClick={() => this.props.onClick(color)}
                            onAction={() => this.props.onAction(color)}
                            action='add'
                            extraClassNames={['c-cell--color']}>{color.hex}</Cell>
                    )
                })}
            </Aux>
        )
    };

    renderChildren = () => {
        const { children, list } = this.props;
        if (list) {
            return this.renderSchemeColor(list);
        }
        if (children) return children;
        return 'ColorPaletteSchemesList';
    }

    render() {
        const { className, label } = this.props;
        const _classnames = cx(
            className
        );

        return (
            <Aux>
                <Title level='4'>{label}</Title>
                <List className={_classnames}>{this.renderChildren()}</List>
            </Aux>
         );
    }
}

export default ColorPaletteSchemesList;
