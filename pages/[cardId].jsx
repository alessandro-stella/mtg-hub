import CustomImage from "components/CustomImage";
import Loader from "components/Loader";
import NavBar from "components/NavBar";
import { server } from "config";
import crypto from "crypto";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SingleCard({ cardData, navigationKey }) {
    const [pastKey, setPastKey] = useState(navigationKey);

    const [isLoading, setIsLoading] = useState(false);
    const [itemsShown, setItemsShown] = useState(10);

    useEffect(() => {
        if (!isLoading) return;

        document.body.classList.add("disable-scroll");

        return () => {
            document.body.classList.remove("disable-scroll");
        };
    }, [isLoading]);

    useEffect(() => {
        if (pastKey !== navigationKey) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    });

    return (
        <>
            <Head>
                <title>{`MTG Hub - ${cardData.name}`}</title>
            </Head>

            <div
                className={`${
                    isLoading ? "fixed" : "hidden"
                } z-10 w-screen h-screen bg-black bg-opacity-50 grid place-content-center top-0`}>
                <Loader />
            </div>

            <NavBar startLoading={setIsLoading} />

            <div className="flex flex-col gap-1 h-fit">
                <div className="mx-auto mb-2 reduced-width">
                    <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {cardData.prints.map((singlePrint, index) => {
                            if (index < itemsShown)
                                return (
                                    <Link
                                        key={index}
                                        href={`/card/${singlePrint.setCode}-${singlePrint.collectorNumber}`}>
                                        <div
                                            className="flex flex-col justify-between gap-1 p-2 transition-all bg-white rounded-md shadow-lg cursor-pointer select-none hover:cursor-pointer hover:border-2 hover:border-dark-violet hover:font-semibold"
                                            onClick={() => {
                                                setIsLoading(true);
                                            }}>
                                            <div className="relative aspect-card">
                                                <CustomImage
                                                    cardName={cardData.name}
                                                    imageData={
                                                        singlePrint.image
                                                    }
                                                />
                                            </div>

                                            <div>{singlePrint.set}</div>
                                        </div>
                                    </Link>
                                );
                        })}
                    </div>

                    {cardData.prints.length - itemsShown > 0 && (
                        <>
                            <div
                                className="px-4 py-1 m-auto text-center transition-all bg-white border-2 rounded-md shadow-lg select-none border-dark-violet text-dark-violet hover:brightness-90 w-fit hover:cursor-pointer"
                                onClick={() => {
                                    setItemsShown(
                                        (itemsShown) => itemsShown + 10
                                    );
                                }}>
                                <div className="text-lg">SHOW MORE</div>
                                <div>
                                    {cardData.prints.length - itemsShown} left
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { cardId } = context.query;

    let cardData = await fetch(`${server}/api/fetchCards`, {
        headers: { cardId },
    });

    cardData = await cardData.json();

    if (cardData === "not-found") {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        };
    }

    if (cardData.data.prints.length === 1) {
        return {
            redirect: {
                permanent: false,
                destination: `/card/${cardData.data.prints[0].setCode}-${cardData.data.prints[0].collectorNumber}`,
            },
            props: {},
        };
    }

    return {
        props: {
            cardData: cardData.data,
            navigationKey: crypto.randomBytes(8).toString("hex"),
        },
    };
}
