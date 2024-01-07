import Head from "next/head";

export default function LayoutAuth({ children, metaTitle, metaDescription }) {
 return (
  <div>
   <Head>
    <title>{`${metaTitle} Whisper`}</title>
    <meta
     name="description"
     content={metaDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/whisperLogo.png" />
   </Head>
    {children}
  </div>
 );
}