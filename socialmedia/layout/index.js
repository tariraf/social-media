import StickyIconButton from "@/components/add_button";
import AddModal from "@/components/add_modal";
import Header from "@/components/header";
import Head from "next/head";

export default function Layout({ children, metaTitle, metaDescription }) {
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
   <Header />
   {children}
   <StickyIconButton />
   <AddModal />
  </div>
 );
}