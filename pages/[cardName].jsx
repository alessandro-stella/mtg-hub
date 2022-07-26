import { server } from "../config";

export default function SingleCard({ cardData }) {
    console.log(cardData);

    return <h1>EHI</h1>;
}

export async function getServerSideProps(context) {
    const { cardName } = context.query;

    let cardData = await fetch(`${server}/api/fetchCard`, {
        headers: { cardName },
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

    return {
        props: { cardData },
    };
}
