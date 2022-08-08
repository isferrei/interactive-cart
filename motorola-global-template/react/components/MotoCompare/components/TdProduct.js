import React, {Component} from 'react';

class TdProduct extends Component {
    render() {
        const {devices, details, sku, id, na} = this.props;
        if (sku) { 
            let c = [];
            let data, findColor, originalData, item, availableItem, element;
            const regEx = /^#([0-9a-f]{3}){1,2}$/i;
            devices.map(e => e ).map((d)=> {
                if (d.cacheId === sku && d.cacheId.length > 0){
                    details.map((e,i) => {
                        const specs = d.specificationGroups.concat(d.specificationGroups.find((g) => g.name === 'allSpecifications').specifications);
                        data = specs.filter((g) => g.name === e.Name)[0];
                        if (data != null) {
                            item = d.items.find((i) => i.sellers[0].commertialOffer.Price > 0);
                            availableItem = item ? d.items.indexOf(item) : 0;
                            originalData = data.values[availableItem];
                            console.log(originalData);
                            if(originalData) element = originalData.split('[').pop().split(']')[0].match(regEx);
                            
                            if((originalData != undefined) && originalData.search(regEx) && element != null) {
                                findColor = Object.values(element)[0];
                                originalData = originalData.replace(findColor, `<div class="specification-color-swatcher" style="background-color:${findColor}"></div>`);
                                originalData = originalData.replace('[', " ").replace(']', "");
                            }

                            c[i] = "<div class='text-box'> " + originalData + " </div>";

                        } else {

                            c[i] = "<div class='text-box'>" + na + "</div>";
                        }
                        
                    })
                };
            });

            return (
                <div className="column table" data-id={sku} id={id} name={id}>
                    {details.map((e,i) =>{
                        return <div className="description column" key={i} data-id={sku} specification-name={e.Name} dangerouslySetInnerHTML={{__html: c[i]}}></div>
                    })}
                </div>
            );
        } else {
            return (
                <div className="column table" data-productid="" id={id} name={id}>
                     {details.map((e,i) =>{
                        return <div className="description column empty-cell" key={i} specification-name={e.Name}></div>
                    })}
                </div>
            );
        }
    };
};

export default TdProduct;