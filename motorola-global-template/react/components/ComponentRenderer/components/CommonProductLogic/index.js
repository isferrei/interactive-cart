import {imageAccountPath , npiImagePath} from "../../common/js/globalConstants";
var imagePath;

 const commonProductLogic = (arg1, arg2 = false) => {
    if (arg1 == 'MotoMarketing') {
        if (arg2) {
            imagePath = npiImagePath;
        } else {
            imagePath = imageAccountPath;
        }
    }
    else {
        if (arg1) {
            if (arg1.product && arg1.product.specificationGroups) {
                var productContent = arg1.product.specificationGroups;
            }
            if (productContent) {
                var pdpBlock = productContent.find(pdpContentItem => {
                    return pdpContentItem.name === "Blocks";
                });
                if (pdpBlock) {
                    var pdpNpiFlag = pdpBlock.specifications.find(pdpBlockItem => {
                        return pdpBlockItem.name === "NPIProduct";
                    });
                }
                if (pdpNpiFlag) {
                    imagePath = npiImagePath;
                } else {
                    imagePath = imageAccountPath;
                }
            }
        } else {
            imagePath = imageAccountPath;
        }
    }
}

export { commonProductLogic, imagePath }