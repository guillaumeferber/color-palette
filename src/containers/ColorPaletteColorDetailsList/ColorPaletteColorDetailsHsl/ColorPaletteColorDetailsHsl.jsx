import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import ColorPaletteColorDetailsListItem from '../ColorPaletteColorDetailsListItem/ColorPaletteColorDetailsListItem';
import { List, ListItem } from '../../../components/UI/';

const colorPaletteColorDetailsHsl = props => {
    const renderColorList = () => {
        return Object.keys(props.colors).length && Object.keys(props.colors).map((key, idx) => {
            const name = key === 'h' ? 'Hue' : key === 's' ? 'Saturation' : 'Lightness';
            return (
                <ListItem key={`${props.id}%_${idx}`}>
                    <ColorPaletteColorDetailsListItem
                        name={name}
                        handleHueChange={(e) => props.handleHueChange(e)}
                        handleSaturationChange={(e) => props.handleSaturationChange(e)}
                        max={key === 'h' ? props.max[0] : props.max[1]}
                        className={key === 'l' ? 'is-lightness' : null}
                        thumbnail={true}
                        type={props.type}
                        color={props.value}
                        value={props.colors[key]}
                    />
               </ListItem>
            )
        });
    }

    return (
        <Aux>
            <List> { renderColorList() } </List>
        </Aux>
    )
}

export default colorPaletteColorDetailsHsl;
