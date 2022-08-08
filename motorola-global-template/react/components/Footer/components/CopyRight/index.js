import { Component } from 'react'
import Logo from './logo.svg'

class CopyRight extends Component {
  render() {
    return (
      <section className="checkout-footer-copy">
        <div className="container">
          <div className="f-row">
            <div className="checkout-footer-copy-row checkout-footer-copy-location">
              <ul>
                <li className="checkout-footer-copy-location-flag">
                  <span></span>
                </li>
                <li className="checkout-footer-copy-location-name">
                  <p>USA</p>
                </li>
                <li className="checkout-footer-copy-location-btn">
                  <a href="/">Change Location</a>
                </li>
              </ul>
            </div>
            <div className="checkout-footer-copy-row">
              <div className="checkout-footer-copy-col logo-col">
                <img src="https://motorolaimgrepo.vteximg.com.br/arquivos/logo.svg" alt="Logo" />
                <p>© 2019 Motorola Mobility LLC. All Rights Reserved</p>
                <p>MOTOROLA, the Stylized M Logo, MOTO and the MOTO family of marks are trademarks of Motorola
                    Trademark Holdings, LLC. LENOVO is a trademark of Lenovo. All other trademarks are the
                    property
                            of their respective owners. © 2017 Motorola Mobility LLC.</p>
                <p>All mobile phones are designed and manufactured by Motorola Mobility LLC, a wholly owned
                            subsidiary of Lenovo.</p>
              </div>
              <div className="checkout-footer-copy-col">
                <p>† All battery life claims are approximate and based on a mixed use profile (which includes both usage and standby time) under optimal network conditions. Actual battery performance will vary and depends on many factors including signal strength, network configuration, age of battery, operating temperature, features selected, device settings, and voice, data, and other application usage patterns.</p>
                <p>§ The display and embedded lens are warranted against shattering and cracking for four (4) years from the original date of purchase. This phone is not shockproof or designed to withstand all damage from dropping. All other warranty exclusions, including scratches and other cosmetic damage, intentional damage or abuse, normal wear and tear and other limitations apply; visit Motorola.com for details and warranty coverage.</p>
                <p>‡ Liquid damage not covered under warranty. Water, splash and dust resistance were tested to IP68 standards under controlled laboratory conditions. Resistance will decrease as a result of normal wear. Not designed to work while submerged underwater. Do not expose to pressurized water, or liquids other than fresh water. Do not attempt to charge a wet phone.</p>
                <p>** $30 off moto g6 play.
                  Up to $160 off moto g5s plus: $140 off 32 GB, $160 off 64 GB.
                  Up to $120 off moto g6: $70 off 32 GB, $120 off 64 GB.
                        Promos good May 19, 2019 12:00 a.m. CDT through May 25, 2019 11:59 p.m. CDT or while supplies last.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CopyRight;