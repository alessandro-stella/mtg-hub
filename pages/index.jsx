import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import Loader from "../components/Loader";

export default function Home() {
    const resultsRef = useRef(null);

    const [results, setResults] = useState("");
    const [exact, setExact] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);

    const [hasScrollbar, setHasScrollbar] = useState(false);

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

    useEffect(() => {
        if (results === "") return;

        setHasScrollbar(
            resultsRef.current.scrollHeight > resultsRef.current.clientHeight
        );
    }, [results]);

    async function openDetails(cardName) {
        let response = await fetch("/api/getCardId", {
            headers: { cardName },
        });

        let { cardId } = await response.json();

        if (cardId === "not-found") {
            return;
        }

        Router.push(`/${cardId}`);
    }

    return (
        <>
            <Head>
                <title>MTG Hub</title>
                <meta
                    name="description"
                    content="A comprehensive website to get informations about your favourites MTG cards"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col items-center justify-center w-screen min-h-screen gap-4 p-4 bg-gradient-to-b from-indigo-900 to-violet-700">
                <div
                    className={`${
                        loadingPage ? "fixed" : "hidden"
                    } z-10 w-screen h-screen bg-black bg-opacity-50 grid place-content-center`}>
                    <Loader />
                </div>

                <div className="flex flex-col items-center justify-center text-white">
                    <div className="font-bold text-center text-9xl font-beleren drop-shadow-2xl ">
                        MTG Hub
                    </div>

                    <div className="text-2xl text-center">
                        Browsing{" "}
                        <span className="font-bold tracking-wide text-white">
                            Magic: The Gathering
                        </span>{" "}
                        cards, as simple as it can get
                    </div>
                </div>

                <div className="flex items-center justify-center w-3/4 max-w-xl gap-4">
                    <input
                        ref={inputRef}
                        className="flex-1 px-4 py-2"
                        type="text"
                        onChange={(e) => getResults(e.target.value)}
                    />

                    <input
                        type="checkbox"
                        value={exact}
                        onChange={() => setExact(!exact)}
                    />
                </div>

                {results !== "" ? (
                    <div
                        className={`flex flex-col gap-2  max-h-[30em] overflow-auto w-3/4 max-w-sm relative ${
                            hasScrollbar ? "pr-2" : ""
                        }`}
                        ref={resultsRef}>
                        {results === "loading" ? (
                            <Loader />
                        ) : (
                            <>
                                {results === "not-found" ? (
                                    <div className="rounded-md font-bold px-8 py-2 text-2xl text-center w-fit m-auto text-white bg-red-500 border-red-700 border-2">
                                        NO MATCHES
                                    </div>
                                ) : (
                                    <>
                                        {results.map((singleResult, index) => (
                                            <div
                                                key={index}
                                                className="w-full rounded-md p-2 text-xl transition-all bg-purple-500 bg-opacity-25 border-purple-700 border-2 cursor-pointer hover:bg-purple-700 text-white"
                                                onClick={() => {
                                                    setLoadingPage(true);
                                                    openDetails(singleResult);
                                                }}>
                                                {singleResult}
                                            </div>
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
