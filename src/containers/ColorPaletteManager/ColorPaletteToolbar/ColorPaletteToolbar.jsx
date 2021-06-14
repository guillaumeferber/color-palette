import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import { Button } from '../../../components/UI';
import './_ColorPaletteToolbar.scss';

class ColorPaletteToolbar extends Component {

    render() {
        return (
            <Aux>
                <div className='ColorPaletteToolbar'>
                    <Button
                        type='icon'
                        iconType={this.props.showAdd ? 'arrow-left' : 'add'}
                        onClick={this.props.showAdd ? this.props.back : this.props.add} />
                    <h4 className="u-text-center u-m-b-0">My Palettes</h4>
                </div>
            </Aux>
         );
    }
}

export default ColorPaletteToolbar;
