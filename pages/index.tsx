import Head from "next/head";
import App from "../components/app/app";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-main text-font font-mono">
      <Head>
        <title>Finance tracker</title>
        <meta name="description" content="Finance tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </div>
  );
}
