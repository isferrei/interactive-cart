import { Component } from 'react'
import { getAssetsUrl } from '../../../../utils/helpers'
class SocialIcons extends Component {
  render() {
    return (
      <section className="checkout-footer-social">
        <div className="container">
          <div className="f-row">
            <div className="checkout-footer-social-icons">
              <h4>Let's stay in touch</h4>
              <ul>
                <li>
                  <a href="https://www.facebook.com/MotorolaUS/" target="_blank">
                    <img
                      src={`${getAssetsUrl}/arquivos/icon_facebook.png`} alt="Facebook Icon" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/MotorolaUS" target="_blank">
                    <img
                      src={`${getAssetsUrl}/arquivos/icon_twitter.png`}  alt="Twitter Icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/motorolaus/" target="_blank">
                    <img
                      src={`${getAssetsUrl}/arquivos/icon_instagram.png`} alt="Instagram Icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/motorolaus/" target="_blank">
                    <img
                      src={`${getAssetsUrl}/arquivos/icon_youtube.png`} alt="Youtube Icon" />
                  </a>
                </li>
                <li>
                  <a href="https://pages.motorola-mail.com/registration/" target="_blank">
                    <img
                      src={`${getAssetsUrl}/arquivos/icon-mail.png`} alt="Mail Icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default SocialIcons;