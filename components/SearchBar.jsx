import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

export default function SearchBar({ startLoading }) {
    const inputRef = useRef(null);
    const resultsRef = useRef(null);
    const searchBarRef = useRef(null);
    const buttonRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState("");
    const [exact, setExact] = useState(false);

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
        if (isOpen) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 200);

            return;
        }

        inputRef.current.value = "";
        setResults("");
    }, [isOpen]);

    useEffect(() => {
        if (results === "") return;

        document.body.classList.add("disable-scroll");

        return () => {
            document.body.classList.remove("disable-scroll");
        };
    }, [results]);

    return (
        <>
            <div
                className={`relative flex flex-1 max-w-xl pr-2 gap-2 ${
                    isOpen ? "" : "translate-x-[calc(100%-2.5em)]"
                } transition-all`}>
                <div
                    ref={searchBarRef}
                    className={`relative flex items-center flex-1 rounded-lg ${
                        isOpen
                            ? `bg-white px-1 ${
                                  results !== "" ? "rounded-b-[0]" : ""
                              }`
                            : ""
                    }`}>
                    <div
                        className={`search-icon rounded-lg z-1 ${
                            isOpen ? "" : "bg-white"
                        }`}
                        onClick={() => setIsOpen(true)}></div>

                    <input
                        ref={inputRef}
                        type="text"
                        className={`transition-all h-full ${
                            isOpen ? "w-full pl-1" : "w-0"
                        }`}
                        onChange={(e) => getResults(e.target.value)}
                    />

                    <div
                        className="cross-icon"
                        onClick={() => setIsOpen(false)}></div>

                    {results && (
                        <div
                            className={`fixed z-[1] top-[3.25em] right-0 bg-purple-600 h-fit max-h-96 w-full max-w-xl overflow-auto p-2 flex flex-col gap-2 shadow-lg rounded-b-lg`}>
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
                                            {results.map(
                                                (singleResult, index) => (
                                                    <Link
                                                        href={`/${singleResult.cardId}`}
                                                        key={index}>
                                                        <div
                                                            className="w-full p-2 text-lg text-white transition-all bg-purple-500 bg-opacity-25 border-2 rounded-md cursor-pointer md:text-xl hover:border-purple-800 hover:bg-purple-800 hover:shadow-lg"
                                                            onClick={() =>
                                                                startLoading(
                                                                    true
                                                                )
                                                            }>
                                                            {
                                                                singleResult.cardName
                                                            }
                                                        </div>
                                                    </Link>
                                                )
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div
                    ref={buttonRef}
                    onClick={() => setExact(!exact)}
                    className={`text-sm sm:text-xl ${
                        exact
                            ? "bg-white text-dark-violet"
                            : "bg-transparent text-white"
                    } select-none cursor-pointer hover:brightness-150 font-bold px-2 py-1 rounded-md border-2 transition-all grid place-items-center`}>
                    EXACT
                </div>
            </div>
        </>
    );
}
