# Motorola Store Theme
The template for Motorola built using Vtex IO

- [Motorola Store Theme](#motorola-store-theme)
  - [Requirements](#requirements)
  - [Dependencies](#dependencies)
    - [Description](#description)
  - [Running the theme](#running-the-theme)
  - [Useful links](#useful-links)
  - [List of default pages](#list-of-default-pages)
    - [Description](#description-1)
  - [List of template pages (created using the site editor)](#list-of-template-pages-created-using-the-site-editor)
    - [Description](#description-2)
  - [List of components](#list-of-components)
    - [Description](#description-3)

## Requirements
* [Vtex Toolbelt](https://github.com/vtex/toolbelt)

## Dependencies

### Description

All store components that you see on this document are open source too. Production ready, you can found those apps in this GitHub organization.

Store framework is the baseline to create any store using VTEX IO Web Framework.

* [Store](https://github.com/vtex-apps/store/blob/master/README.md)

Store GraphQL is a middleware to access all VTEX APIs.

* [Store GraphQL](https://github.com/vtex-apps/store-graphql/blob/master/README.md)

## Running the theme
Login inside your Vtex account:
```
vtex login codeby
```
> We are using CodeBy's account for this example 

Create a Workspace and change to it:
```
vtex use development -r
```
> The `-r` parameter is used to reset the workspace and get all the info such as latest apps version from the Master workspace

> We've choosen the `development`as the name but you can use what ever the name you want

Link your local theme with the remote one:
```
vtex link
```
You can access the theme running in:
[https://development--codeby.myvtex.com](https://development--codeby.myvtex.com)

## Useful links
* [Creating a custom template](https://www.notion.so/lucasyamamoto/Creating-a-custom-template-page-26bdd7c9a4824b60b2fad0231c67d9f8)
* [Creating a custom page](https://www.notion.so/lucasyamamoto/Creating-a-custom-page-f89fdd9544b24b819fd8ba2c8b794eec)
* [Going to production](https://www.notion.so/lucasyamamoto/Going-to-production-31e581e007f642019cf494a4b5db5f84)
* [Adding custom JavaScript inside React](https://www.notion.so/lucasyamamoto/Adding-custom-JavaScript-inside-React-a1821f7291bf4831bd11102bea593e02)
* [Installing and configuring the Motorola Theme in an Account](https://www.notion.so/lucasyamamoto/Trainning-documents-b9ca1d829d614003b2edb79a5e293764?p=84cc08db28d947a99a224c00f20c763b&showMoveTo=true)

## List of default pages

### Description

Below are the default pages of the theme. Each do those default pages from a VTEX store.

* Home Page
  * PathID: `store.home.motorola`
  * Path name: `/`

* Account Page
  * PathID: `store.account.motorola`
  * Path name: `/account`

* Login Page
  * PathID: `store.login.motorola`
  * Path name: `/login`

* Product Page
  * PathID: `store.product.motorola`
  * Path name: `/:slug/p`

* OrderPlaced
  * PathID: `store.orderplaced.motorola`
  * Path name: `/checkout/orderPlaced`

* Search
  * PathID: `store.search.motorola`
  * Path name: `/:term/s`

* Search by brand
  * PathID: `store.search.motorola#brand`
  * Path name: `/:brand/b"`

* Search by department
  * PathID: `store.search.motorola#department`
  * Path name: `/:department/d"`

* Search by category
  * PathID: `store.search.motorola#category`
  * Path name: `/:department/:category"`

* Search by subcategory
  * PathID: `store.search.motorola#subcategory`
  * Path name: `/:department/:category/:subcategory"`

* Search by subcategory with terms
  * PathID: `store.search.motorola#subcategory-terms`
  * Path name: `/:department/:category/:subcategory/terms`

* ESP
  * PathID: `store.esp`
  * Path name: `/vtex-rnt-esp`

* Warranty page
  * PathID: `store.warranty`
  * Path name: `/warranty`

## List of template pages (created using the site editor)

### Description

Those are the template pages. They can be created and managed through the Admin Pages from Vtex:

* Landing Page:
  * PathID: `store.custom.landing-page`

* Headered and Footered Page: 
  * PathID: `store.custom.headered-and-footered-page`

* Headered and Footered Drupal Page:
  * PathID: `store.custom.headered-and-footered-drupal-page`

* Family Page:
  * PathID: `store.custom.family-page`

* Specials Page:
  * PathID: `store.custom.specials`

* Contact Enterprise Page:
  * PathID: `store.custom.contact-enterprise`

* Contact Enterprise Thank You Page:
  * PathID: `store.custom.contact-enterprise-thank-you`

## List of components

### Description

These are the components that are currently in this theme. Each of them has a README in it's containing folder:

* [BannerLine](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/BannerLine/README.md)
* [Carousel](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Carousel/README.md)
* [CheckoutButton](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/CheckoutButton/README.md)
* [CollectionShelf](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/CollectionShelf/README.md)
* [ContactEnterpriseBanner](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/ContactEnterpriseBanner/README.md)
* [ContactEnterpriseForm](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/ContactEnterpriseForm/README.md)
* [ContactEnterpriseThankYou](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/ContactEnterpriseThankYou/README.md)
* [CopyRight](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/CopyRight/README.md)
* [CurrentLocation](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/CurrentLocation/README.md)
* [Disclaimers](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Disclaimers/README.md)
* [DrupalIntegration](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/DrupalIntegration/README.md)
* [Esp](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Esp/README.md)
* [FAQ](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/FAQ/README.md)
* [FamilyBannerLine](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/FamilyBannerLine/README.md)
* [FamilyShelf](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/FamilyShelf/README.md)
* [FooterCustom](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/FooterCustom/README.md)
* [FooterNav](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/FooterNav/README.md)
* [Footer](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Footer/README.md)
* [HTMLEditor](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/HTMLEditor/README.md)
* [HeaderCustom](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/HeaderCustom/README.md)
* [Header](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Header/README.md)
* [InPageNav](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/InPageNav/README.md)
* [LenovoLogo](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/LenovoLogo/README.md)
* [Loading](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Loading/README.md)
* [MotoProductBlock](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/MotoProductBlock/README.md)
* [MotoProductDetails](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/MotoProductDetails/README.md)
* [MotoProductSummary](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/MotoProductSummary/README.md)
* [MotoShelf](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/MotoShelf/README.md)
* [MotoStoreWrapperCustom](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/MotoStoreWrapperCustom/README.md)
* [MotoStoreWrapper](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/MotoStoreWrapper/README.md)
* [MotoTile](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/MotoTile/README.md)
* [Navbar](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Navbar/README.md)
* [NewsLine](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/NewsLine/README.md)
* [NewsTile](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/NewsTile/README.md)
* [NotFound](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/NotFound/README.md)
* [Offers](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Offers/README.md)
* [[DEPRECATED] ProductPage](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/ProductPage/README.md)
* [ProductHTML](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/ProductHTML/README.md)
* [ProductReviews](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/ProductReviews/README.md)
* [ProductSpecifications](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/ProductSpecifications/README.md)
* [SearchResult](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/SearchResult/README.md)
* [SocialIcons](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/SocialIcons/README.md)
* [Subnav](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Subnav/README.md)
* [TopNav](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/TopNav/README.md)
* [Warranty](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/Warranty/README.md)
* [[DEPRECATED] WarrantyPage](https://gitlab.cloud.motorola.net/motoroladev/VTEX/tree/documentation/react/components/WarrantyPage/README.md)

---

Built by [CodeBy](https://www.codeby.com.br)