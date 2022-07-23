import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>MTG Hub</title>
                <meta
                    name="description"
                    content="A comprehensive website to get informations about your favourites MTG cards"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex items-center justify-center w-screen h-screen bg-slate-600">
                <div>BONJOUR</div>
            </div>
        </div>
    );
}
