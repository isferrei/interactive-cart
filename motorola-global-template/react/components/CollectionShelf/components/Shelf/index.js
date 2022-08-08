import { Component, Fragment } from 'react';
import { ExtensionPoint } from 'vtex.render-runtime';
import { SliderLayout } from 'vtex.slider-layout'
import "../../../ComponentRenderer/common/css/slick.global.css"
import "../../../ComponentRenderer/common/css/slick-theme.global.css"
import { handleResize, debounce } from "../../../ComponentRenderer/common/js/deviceDetection";


class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      tabPotrait:false
    };
  }

  componentDidMount() {
    let current = this;
    this.findViewPort();
    window.addEventListener(
      "resize",
      this.findViewPort,
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
      }, 500)
    );
  }

  findViewPort = () => {
   if(((window.screen.width >= 1024 && window.screen.width < 1366) && (window.matchMedia("(orientation: portrait)").matches))) {
      this.setState({
        tabPotrait: true
    });
    } else {
      this.setState({
        tabPotrait: false
    });
    }
}

  render() {
    const { showBuyNowButton,products} = this.props;
    const sliderConfigurationProps = {
      itemsPerPage: { tablet: 2 , phone: 1 },
      infinite: true,
      showNavigationArrows: 'always',
      showPaginationDots: 'always',
      arrowSize: 25,
      fullWidth: false,
    }

    return (
      <Fragment>
           {
             (this.state.checkDevice.isMobile || this.state.checkDevice.isTablet) || (this.state.tabPotrait) ?
             <div className="collection-cards">
             <SliderLayout {...sliderConfigurationProps}>
             {products.map((product, key) => (
               <Fragment key={key}>
                 <ExtensionPoint id="moto-product-summary" {...product} key={key + "-0"} showBuyNowButton={showBuyNowButton} getCompare={this.props.getCompare} />
                 <ExtensionPoint id="moto-product-block" {...product} key={key + "-1"} />
               </Fragment>
             ))}
           </SliderLayout>
           </div>
           :
           <div className="collection-cards">
             {products.map((product, key) => (
               <Fragment key={key}>
                 <ExtensionPoint id="moto-product-summary" {...product} key={key + "-0"} showBuyNowButton={showBuyNowButton} getCompare={this.props.getCompare} />
                 <ExtensionPoint id="moto-product-block" {...product} key={key + "-1"} />
               </Fragment>
             ))}
             </div>
           }
      </Fragment>
    )
  }
}

export default Shelf;

