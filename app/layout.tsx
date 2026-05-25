import type { Metadata } from "next";
import {DM_Sans, Glass_Antiqua} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NavContextComponent from "./components/navContext";
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"]
})

const glassAntiqua = Glass_Antiqua({
  variable: "--font-glass-antiqua",
  subsets: ["latin"],
  weight: ["400"]
})


export const metadata: Metadata = {
  metadataBase: new URL('https://maisondoudjo.com'),
  title: "Maison Doudjo - @BlackSun225",
  description: "Fullstack developer portfolio",
  keywords: [
    "maison doudjo", "site web",'Developpeur full stack', 'Fullstack Developer', "développeur d'application", "développeur abidjan",
    "next.js full stack developer portfolio", 'React', 'Node.js', 'Go', 'mobile development', 
    "hire next.js developer from africa", 'Web Development', 'Nextjs', "freelance developer",
    "remote from Ivory Coast", "figma to code", "design to code", "vuejs", "flutter", "react native",
    "rest api", "postgresql", "mysql", "vps deployment", "déploiement", "formation", "self taught developer",
    "développeur autodidacte"
  ]
};

const jsonLd = {
  "@context": 'https://schema.org',
  "@type": 'Person',
  "name": 'Christ Doudjo FOUSSENI',
  "jobTitle": 'Full-Stack Developer',
  "description": "Full-stack software developer with 3+ years of experience building scalable web and mobile applications. Currently pivoting into well documented application, combining systems programming (Go)",
  "url": 'https://maisondoudjo.com',
  "sameAs": [
    'https://github.com/BlackSun225',
    'https://www.linkedin.com/in/yoanan-christ-fousseni-3125711bb'
  ],
  "knowsAbout": [
    "React Native",
    "Flutter",
    'Reactjs', 
    'Node.js', 
    'Go (Golang)', 
    'Full-stack Development', 
    'Android Application', 
    'Web Application',
    "HTML",
    "CSS"
  ]
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="js-focus-visible" data-js-focus-visible="">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${glassAntiqua.variable} antialiased`} >
        <NavContextComponent>
          <Navbar />
          {children}
          <Footer />
        </NavContextComponent>
        {/* Microsoft Clarity Script */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "whdvdru650");
          `}
        </Script>
      </body>
    </html>
  );
}
