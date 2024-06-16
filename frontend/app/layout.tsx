import Footer from "./components/layouts/footer/Footer";
import Header from "./components/layouts/header/Header";
import { AuthProvider } from './contexts/Auth';
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) 

{
  return (
    <html lang="en">
        <head>
          <meta/>
          <title>Conduit</title>
          <link
            href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
            rel="stylesheet"
            type="text/css"
          />
          <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        </head>

      <body>
        <AuthProvider> 
        <Header/>
        {children}
        <Footer/>
        </AuthProvider> 
      </body>
    </html>
  );
}
