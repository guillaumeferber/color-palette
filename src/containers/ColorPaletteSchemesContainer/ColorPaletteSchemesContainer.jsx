import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import ColorPaletteSpectrum from './ColorPaletteSpectrum/ColorPaletteSpectrum';
import ColorPaletteDimensions from './ColorPaletteDimensions/ColorPaletteDimensions';
import ColorPaletteSchemes from './ColorPaletteSchemes/ColorPaletteSchemes';
import ColorPaletteNavigation from './ColorPaletteNavigation/ColorPaletteNavigation';
import './_ColorPaletteSchemesContainer.scss';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { COLOR_PALETTE_SCHEMES_NAVIGATION } from '../../constants/navigation';

class ColorPaletteSchemesContainer extends Component {

    renderPage = id => {
        switch(id) {
            case 0: return <ColorPaletteSpectrum />;
            case 1: return <ColorPaletteSchemes />;
            case 2: return <ColorPaletteDimensions />;
            default: return null;
        }
    }

    renderPages = () => (
        <Switch>
            {
                COLOR_PALETTE_SCHEMES_NAVIGATION.map((item, idx) => {
                    return (
                        <Route path={item.slug} key={`${item.id}_${idx}`}>
                            {this.renderPage(item.id)}
                        </Route>
                    )
                })
            }
        </Switch>
    )

    render() {
        return (
            <Aux>
                <Router>
                    <div className='ColorPaletteSchemesContainer'>
                        <ColorPaletteNavigation />
                        <div className='ColorPaletteSchemesContainer__pages'>
                            {this.renderPages()}
                        </div>
                    </div>
                </Router>
            </Aux>
        );
    }
}

export default ColorPaletteSchemesContainer;
