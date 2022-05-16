import React from "react";

export default class Modal3DRenderSeek extends React.Component {
  render() {

    const modal3DIcon = "Dusk-Blue.gif";
    
    return (
      <div className="pdp-hero-3d-cta">
        <a data-seek-key={this.props.modelKey} data-seek-xp="auto-rotate-v2" href="#">
          <img src={`https://motorolaimgrepo.vteximg.com.br/arquivos/${modal3DIcon}`} alt="Intractive 3d Icon"></img>
        </a>
      </div>
    );
  }
}
