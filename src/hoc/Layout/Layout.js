import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import {Toolbar} from '../../components';
import { ColorPaletteContainer } from '../../containers/';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar />
                <ColorPaletteContainer />
            </Aux>
         );
    }
}

export default Layout;
