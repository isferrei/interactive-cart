import React from 'react';
import { ExtensionPoint } from 'vtex.render-runtime';
import './SocialIcons.global.css';

const SocialIcons = () => {
  return (
    <ExtensionPoint id="social-icons" socialIconsLocation="dropdown" />
  )
}
export default SocialIcons;