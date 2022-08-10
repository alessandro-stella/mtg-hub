import Head from "next/head";
import Link from "next/link";
import CustomImage from "../components/CustomImage";
import NavBar from "../components/NavBar";
import { server } from "../config";

export default function SingleCard({ cardData }) {
    return (
        <>
            <Head>
                <title>MTG Hub - {cardData.name}</title>
            </Head>

            <NavBar />

            <div className="flex flex-col gap-1 h-fit ">
                <div className="mx-auto  reduced-width">
                    <div className="grid grid-cols-1 gap-2 p-2 bg-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {cardData.prints.map((singlePrint, index) => (
                            <Link
                                key={index}
                                href={`/card/${singlePrint.setCode}-${singlePrint.collectorNumber}`}>
                                <div className="flex flex-col justify-between gap-1 transition-all cursor-pointer select-none hover:cursor-pointer hover:border-2 hover:border-dark-violet hover:p-2 hover:rounded-md hover:font-semibold">
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
