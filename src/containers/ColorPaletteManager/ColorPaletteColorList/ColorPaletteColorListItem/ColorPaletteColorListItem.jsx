import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import { Cell } from '../../../../components/';

const colorPaletteColorListItem = props => {
    // console.log(props.color);
    return (
        <Aux>
            <Cell
                customTag={props.tag}
                style={props.style}
                extraClassNames={['c-cell--color']}
                onClick={() => props.onClick(props.color)}
                active={props.isSelected}>{props.color.hex}</Cell>
        </Aux>
     );
}

export default colorPaletteColorListItem;
