import React from 'react';

const SocialIcon = ({title,link, imageIcon}) => {
  return (
    <li><a target="blank" title={title} href={link}><img src={imageIcon} alt={title} /></a></li>
  )
}

export default SocialIcon;