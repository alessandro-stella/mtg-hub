import Head from "next/head";
import CardInfo from "../../components/CardInfo";
import TransformButton from "../../components/TransformButton";
import { server } from "../../config";

export default function SingleCard({ cardData, rotate = false }) {
    return (
        <>
            <Head>
                <title>{`MTG Hub - ${cardData.name}`}</title>
            </Head>

            <div className="bg-neutral-200 min-h-screen">
                <div className="reduced-width m-auto bg-white min-h-screen">
                    <CardInfo
                        data={cardData.cardInfo}
                        legalities={cardData.legalities}
                    />
                    {rotate && <TransformButton buttonLabel={rotate} />}
                </div>
            </div>
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
