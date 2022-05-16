export function mapCartItemToPixel(item) {
    return {
      skuId: item.id,
      variant: item.skuName,
      price: item.sellingPrice,
      priceIsInt: true,
      name: getNameWithoutVariant(item),
      quantity: item.quantity,
      productId: item.productId,
      productRefId: item.productRefId,
      brand: item.additionalInfo ? item.additionalInfo.brandName : '',
      category: productCategory(item),
      detailUrl: item.detailUrl,
      imageUrl: item.imageUrls
        ? fixUrlProtocol(item.imageUrls.at3x)
        : item.imageUrl ?? '',
      referenceId: item.refId,
    }
  }
  
  export function mapBuyButtonItemToPixel(item) {
    // Change this `/Apparel & Accessories/Clothing/Tops/`
    // to this `Apparel & Accessories/Clothing/Tops`
    const category = item.category ? item.category.slice(1, -1) : ''
  
    return {
      skuId: item.id,
      variant: item.skuName,
      price: item.sellingPrice,
      priceIsInt: true,
      name: item.name,
      quantity: item.quantity,
      productId: item.productId,
      productRefId: item.productRefId,
      brand: item.brand,
      category,
      detailUrl: item.detailUrl,
      imageUrl: item.imageUrl,
      referenceId: item.refId,
    }
  }
  
  /**
   * URL comes like "//storecomponents.vteximg.com.br/arquivos/ids/155491"
   * this function guarantees it comes with protocol in it.
   */
  function fixUrlProtocol(url) {
    if (!url || url.indexOf('http') === 0) {
      return url
    }
  
    return `https:${url}`
  }
  
  /**
   * Remove the variant from the end of the name.
   * Ex: from "Classic Shoes Pink" to "Classic Shoes"
   */
  function getNameWithoutVariant(item) {
    if (!item.name.includes(item.skuName)) {
      return item.name
    }
  
    const leadingSpace = 1
    const variantLength = leadingSpace + item.skuName.length
  
    return item.name.slice(0, item.name.length - variantLength)
  }
  
  function productCategory(item) {
    try {
      const categoryIds = item.productCategoryIds.split('/').filter(c => c.length)
      const category = categoryIds.map(id => item.productCategories[id]).join('/')
  
      return category
    } catch {
      return ''
    }
  }
  
