import React from 'react';

import { Helmet } from 'react-helmet';

const googleTagManagerCustom = (props) => {

    const dataLayerScript = `dataLayer = [];`;

    const gtm = {
        id: 'GTM-PVKRGQF',
        get script() {
            return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${this.id}');`;
        },
        get noScript() {
            return `<iframe src="https://www.googletagmanager.com/ns.html?id=${this.id}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        }
    };

    const optimize = {
        antiFlickerStyle: `.async-hide { opacity: 0 !important}`,
        antiFlickerScript: `(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
        h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
        (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
        })(window,document.documentElement,'async-hide','dataLayer',4000,{'${gtm.id}':true});`
    };

    return (
        <Helmet>
            <script>{ dataLayerScript }</script>
            <style>{ optimize.antiFlickerStyle }</style>
            <script>{ optimize.antiFlickerScript }</script>
            <script>{ gtm.script }</script>
        </Helmet>
    );
};

export default googleTagManagerCustom;
