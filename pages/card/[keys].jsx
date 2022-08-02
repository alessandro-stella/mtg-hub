import { server } from "../../config";

export default function SingleCard({ cardData }) {
    return (
        <h1 className="bg-gradient-to-b from-indigo-900 to-purple-600">
            {cardData.name}
        </h1>
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
            cardData: cardData.data,
        },
    };
}
