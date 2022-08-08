import React from 'react';
import LogoSvg from './logo.svg';
import './LenovoLogo.global.css';

const LenovoLogo = () => {
  return (
    <div className="lenovo-logo">
      <a target="blank" href="https://www.lenovo.com">
        <img src={LogoSvg} alt="Logo" />
      </a>
    </div>
  )
}

export default LenovoLogo;