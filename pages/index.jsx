import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";

export default function Home() {
    const [results, setResults] = useState("");
    const [exact, setExact] = useState(false);

    const inputRef = useRef(null);
    let timeout;

    const getResults = (keyword) => {
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
            if (keyword.trim() === "") {
                setResults("");
                return;
            }

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

            <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 bg-slate-600 md:bg-red-600">
                <div className="text-6xl font-bold">MTG Hub</div>

                <div className="flex items-center justify-center gap-4">
                    <input
                        ref={inputRef}
                        className="px-4 py-2"
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
                    <div className="flex flex-col gap-1">
                        {results === "not-found" ? (
                            <div className="w-full px-2 py-1 text-white bg-red-700">
                                No results
                            </div>
                        ) : (
                            <>
                                {results.map((singleResult, index) => (
                                    <div
                                        key={index}
                                        className="w-full p-2 bg-blue-700 cursor-pointer hover:bg-blue-500 transition-all"
                                        onClick={() => {
                                            openDetails(singleResult);
                                        }}>
                                        {singleResult}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                ) : null}
            </div>
        </>
    );
}
