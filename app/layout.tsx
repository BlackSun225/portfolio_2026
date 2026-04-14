import type { Metadata } from "next";
import {DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NavContextComponent from "./components/navContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"]
})

export const metadata: Metadata = {
  title: "Maison Doudjo - @BlackSun225",
  description: "Fullstack developer portfolio",
  keywords: [
    "site web",'Developpeur full stack', 'Fullstack Developer', "développeur d'application", "développeur abidjan",
    "next.js full stack developer portfolio", 'React', 'Node.js', 'Go', 'mobile development', 
    "hire next.js developer from africa", 'Web Development', 'Nextjs', "freelance developer",
    "remote from Ivory Coast", "figma to code", "design to code", "vuejs", "flutter", "react native",
    "rest api", "postgresql", "mysql", "vps deployment", "déploiement", "formation", "self taught developer",
    "développeur autodidacte"
  ]
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Christ Doudjo FOUSSENI',
  jobTitle: 'Full-Stack Developer',
  description: "Full-stack software developer with 3+ years of experience building scalable web and mobile applications. Currently pivoting into well documented application, combining systems programming (Go)",
  knowsAbout: [
    "React Native",
    "Flutter",
    "Reactjs",
    "Vuejs",
    "Next.js",
    "Go (Golang)",
    "Data Security (Libsodium)",
    "Javascript",
    "Typescript",
    "HTML",
    "CSS"
  ],
  url: 'https://maisondoudjo.com',
  sameAs: [
    'https://github.com/BlackSun225',
    'https://www.linkedin.com/in/yoanan-christ-fousseni-3125711bb'
  ],
  knowsAbout: [
    'React', 'Node.js', 'Go', 'Full-stack Development', 'Android Application', 'Web Application'
  ]
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="js-focus-visible" data-js-focus-visible="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <body className={`${dmSans.variable} antialiased`} >
        <NavContextComponent>
          <Navbar />
          {children}
          <Footer />
        </NavContextComponent>
      </body>
    </html>
  );
}
