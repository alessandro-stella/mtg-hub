import Head from "next/head";
import { useState } from "react";
import TransformButton from "../../components/TransformButton";
import { server } from "../../config";

export default function SingleCard({ cardData, rotate = false }) {
    /* const [isRotated, setIsRotated] = useState(rotate); */
    console.log(cardData);

    return (
        <>
            <Head>
                <title>{`MTG Hub - ${cardData.name}`}</title>
            </Head>

            <h1 className="bg-gradient-to-b from-dark-violet to-purple-600">
                {cardData.name}
            </h1>

            {rotate && <TransformButton buttonLabel={rotate} />}
        </>
    );
}

export async function getServerSideProps(context) {
    const [setCode, collectorNumber, star] = context.query.keys.split("-");

    let cardData = await fetch(`${server}/api/fetchSingleCard`, {
        headers: { setCode, collectorNumber, star: star ? true : false },
    });

    cardData = await cardData.json();

    if (cardData.data === "not-found") {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        };
    }

    return {
        props: {
            cardData: cardData.data.cardData,
            rotate: cardData.data?.rotate ?? false,
        },
    };
}
