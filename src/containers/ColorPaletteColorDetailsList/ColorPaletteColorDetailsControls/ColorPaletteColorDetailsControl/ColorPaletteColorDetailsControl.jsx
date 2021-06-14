import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import { Sun, Disc } from 'react-feather';
import { Plus, Minus } from 'react-feather';
import {Button} from '../../../../components/UI/';
const colorPaletteColorDetailsControl = props => {
    return (
        <Aux>
            <div className="c-list__item">
                <div className="c-list__item--icon">
                    { props.icon === 'sun' ? <Sun /> : <Disc /> }
                </div>
                <div className="c-list__item--values">
                    <span>{props.name}</span>
                    <div className="c-button-group">
                        <Button
                            className={'c-button--pill'}
                            onClick={() => props.onDecrement(props.name)}><Minus /></Button>
                        <Button
                            className={'c-button--pill'}
                            onClick={() => props.onIncrement(props.name)}><Plus /></Button>
                    </div>
                </div>
            </div>
        </Aux>
     );
}

export default colorPaletteColorDetailsControl;
