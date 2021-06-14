import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';
import './ColorPaletteNavigation.scss';
import cx from 'classnames';
import {COLOR_PALETTE_SCHEMES_NAVIGATION} from '../../../constants/navigation';
import { ListItem, List} from '../../../components/UI';

class ColorPaletteNavigation extends Component {

    static propTypes = {
        selectedClassName: PropTypes.string,
        selected: PropTypes.number
    };

    static defaultProps = {
        selectedClassName: '',
        selected: 1
    };

    render() {
        const { selected, selectedClassName } = this.props;
        const _classnames = cx(
            'ColorPaletteNavigation',
            {
                [selectedClassName]: selected
            }
        );
        return (
            <Aux>
                <div className={_classnames}>
                    <List orientation='row'>
                        {COLOR_PALETTE_SCHEMES_NAVIGATION.map((item, idx) => (
                            <ListItem key={item.name +'%'+ idx}>
                                <NavLink to={item.slug} activeClassName='active'>{item.name}</NavLink>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Aux>
         );
    }
}

export default ColorPaletteNavigation;
