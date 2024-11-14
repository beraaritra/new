import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Script from 'next/script'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'acciofinance.com',
  description: 'At Accio Finance, we provide expert accounting and bookkeeping services and a full suite of support and advisory services tailored for US-based companies.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src='/GTM.js' />
        {/* <script>
          {`(function(w,d,s,l,i){
            w[l] = w[l] || [];
            w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
            var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-TZXJJ9C4');`}
        </script> */}


        {/* START <!-- Google tag (gtag.js) --> */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11111864025" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date()); 
            gtag('config', 'AW-11111864025'); 
        `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"></link>
        {/* END <!-- Google tag (gtag.js) --> */}

        {/* <Script id="zoho-salesiq-init" strategy="lazyOnload">
          {`
            window.$zoho=window.$zoho || {};
            $zoho.salesiq = $zoho.salesiq || { ready: function(){} };
          `}
        </Script>
        <Script id="zoho-salesiq-script" src="https://salesiq.zohopublic.in/widget?wc=siq4ef5c203dbf1dabf888e0215ab0b976e3ee2966ea30101efa6af5828bcfb07e1" strategy="lazyOnload" defer /> */}



        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZXJJ9C4" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}

        <Navbar />
        <div className="flex1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

