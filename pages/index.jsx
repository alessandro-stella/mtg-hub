import Loader from "components/Loader";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const resultsRef = useRef(null);

    const [results, setResults] = useState("");
    const [exact, setExact] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);

    const inputRef = useRef(null);
    let timeout;

    const getResults = (keyword) => {
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
            if (keyword.trim() === "") {
                setResults("");
                return;
            }

            setResults("loading");

            let response = await fetch("/api/matchKeyword", {
                headers: { keyword, exact },
            });

            let { possibleCards } = await response.json();

            setResults(possibleCards);
        }, 500);
    };

    useEffect(() => {
        const getData = async (keyword) => {
            if (keyword.trim() === "") {
                setResults("");
                return;
            }

            let response = await fetch("/api/matchKeyword", {
                headers: { keyword, exact },
            });

            let { possibleCards } = await response.json();

            setResults(possibleCards);
        };

        getData(inputRef.current.value);
    }, [exact]);

    return (
        <>
            <Head>
                <title>MTG Hub</title>
                <meta
                    name="description"
                    content="A comprehensive website to get infos about your favorites MTG cards"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col items-center justify-center w-screen min-h-screen gap-4 p-4 bg-gradient-to-b from-dark-violet to-violet-700">
                <div
                    className={`${
                        loadingPage ? "fixed" : "hidden"
                    } z-10 w-screen h-screen bg-black bg-opacity-50 grid place-content-center`}>
                    <Loader />
                </div>

                <div className="flex flex-col items-center justify-center text-white">
                    <div className="text-6xl font-bold text-center  md:text-9xl font-beleren drop-shadow-2xl">
                        MTG Hub
                    </div>

                    <div className="text-sm text-center md:text-2xl">
                        Browsing{" "}
                        <span className="font-bold tracking-wide text-white">
                            Magic: The Gathering
                        </span>{" "}
                        cards, as simple as it can get
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-3/4 max-w-xl gap-4">
                    <input
                        ref={inputRef}
                        className="w-full px-4 py-2 text-lg"
                        type="text"
                        onChange={(e) => getResults(e.target.value)}
                    />

                    <div className="flex items-center justify-center w-full gap-4 text-white">
                        <div className="text-xl md:text-2xl">Exact match</div>
                        <div
                            onClick={() => setExact(!exact)}
                            className={`text-sm sm:text-xl ${
                                exact
                                    ? "bg-white text-dark-violet"
                                    : "bg-transparent"
                            } select-none cursor-pointer hover:brightness-150 font-bold px-2 py-1 rounded-md border-2 transition-all grid place-items-center`}>
                            {exact ? "ON" : "OFF"}
                        </div>
                    </div>
                </div>

                {results !== "" ? (
                    <div
                        className="p-2 rounded-lg flex flex-col gap-2 max-h-[20em] overflow-auto w-3/4 max-w-sm relative border-2"
                        ref={resultsRef}>
                        {results === "loading" ? (
                            <Loader />
                        ) : (
                            <>
                                {results === "not-found" ? (
                                    <div className="w-full px-8 py-2 text-sm font-bold text-center text-white bg-red-500 border-2 border-red-700 rounded-md md:text-2xl ">
                                        NO MATCHES
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-lg font-bold text-white md:text-2xl">
                                            {exact
                                                ? "Result"
                                                : "Possible results"}
                                        </div>
                                        {results.map((singleResult, index) => (
                                            <Link
                                                href={singleResult.cardId}
                                                key={index}>
                                                <div
                                                    className="w-full p-2 text-lg text-white transition-all bg-purple-500 bg-opacity-25 border-2 rounded-md cursor-pointer md:text-xl hover:border-purple-700 hover:bg-purple-700"
                                                    onClick={() =>
                                                        setLoadingPage(true)
                                                    }>
                                                    {singleResult.cardName}
                                                </div>
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ) : null}
            </div>
        </>
    );
}
