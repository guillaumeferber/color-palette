import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import { Shuffle } from 'react-feather';
import { List, ListItem } from '../../../components/UI';

const colorPaletteColorDetailsExtraActions = (props) => {
    return (
        <Aux>
            <List>
                <ListItem>
                    <div className="c-list__item">
                        <div className="c-list__item--values">
                            <button className="c-button c-button--link c-button--icon" onClick={props.onClick}><Shuffle /><span>&nbsp;Random</span></button>
                        </div>
                    </div>
                </ListItem>
            </List>
        </Aux>
     );
}

export default colorPaletteColorDetailsExtraActions;
