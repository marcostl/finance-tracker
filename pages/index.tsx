import Head from "next/head";
import App from "../components/app/app";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-main text-font font-mono">
      <Head>
        <title>Finance tracker</title>
        <meta name="description" content="Finance tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full max-w-[450px] flex flex-col items-stretch">
        <div className="w-full h-nav bg-secondary flex items-center">
          <p className="w-full font-semibold text-center">💵 Finance tracker</p>
        </div>
        <App />
      </div>
    </div>
  );
}
