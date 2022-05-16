import React from 'react';
import { useItemContext } from "vtex.product-list/ItemContext";
import MiniCartQuantitySelector from './MiniCartQuantitySelector';

const MiniCartQuantitySelectorWrapper = () => {
    const { item } = useItemContext()
    if(item.manualPrice === null) {
        return (
            <MiniCartQuantitySelector item={item} />
        )
    } else {
        return <div style={{width: '60px'}}>&nbsp;</div>;
    }

}

export default MiniCartQuantitySelectorWrapper;