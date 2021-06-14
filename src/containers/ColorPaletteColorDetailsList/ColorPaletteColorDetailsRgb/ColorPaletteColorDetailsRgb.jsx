import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import ColorPaletteColorDetailsListItem from '../ColorPaletteColorDetailsListItem/ColorPaletteColorDetailsListItem';
import { COLORS_CONFIG } from '../../../constants/colors';
import { List, ListItem } from '../../../components/UI/';

const colorPaletteColorDetailsRgb = props => {
    const renderColorList = () => {
        return Object.keys(props.colors).length && Object.keys(props.colors).map((key, idx) => {
            const name = key === 'r' ? 'Red' : key === 'g' ? 'Green' : 'Blue';
            const color = key === 'r' ? COLORS_CONFIG.BASE_COLORS.RED : key === 'g' ? COLORS_CONFIG.BASE_COLORS.GREEN : COLORS_CONFIG.BASE_COLORS.BLUE;
            return (
                <ListItem key={`${idx}%_${props.id}`}>
                    <ColorPaletteColorDetailsListItem
                        name={name}
                        max={props.max}
                        thumbnail={true}
                        color={color}
                        type={props.type}
                        value={props.colors[key]}
                    />
                </ListItem>
            )
        });
    }
    return (
        <Aux>
            <List>
                { renderColorList() }
            </List>
        </Aux>
    )
}

export default colorPaletteColorDetailsRgb;
