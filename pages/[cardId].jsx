import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import CustomImage from "../components/CustomImage";
import { server } from "../config";

export default function SingleCard({ cardData }) {
    const isDoubleFaced = cardData.prints[0].image.hasOwnProperty("front");

    return (
        <>
            <Head>
                <title>MTG Hub - {cardData.name}</title>
            </Head>

            <div className="flex flex-col min-h-screen gap-1 h-fit bg-gradient-to-b from-dark-violet to-purple-600">
                <div className="m-auto reduced-width">
                    <div className="text-4xl font-bold">{cardData.name}</div>

                    <div className="grid gap-2 p-2 bg-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {cardData.prints.map((singlePrint, index) => (
                            <Link
                                key={index}
                                href={`/card/${singlePrint.setCode}-${singlePrint.collectorNumber}`}>
                                <div className="flex flex-col gap-2 bg-red-500 cursor-pointer select-none ">
                                    <div className="relative aspect-card">
                                        <CustomImage
                                            cardName={cardData.name}
                                            imageData={singlePrint.image}
                                        />
                                    </div>

                                    <div>{singlePrint.set}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
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
        props: { cardData: cardData.data },
    };
}
