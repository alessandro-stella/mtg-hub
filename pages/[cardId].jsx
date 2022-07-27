import { server } from "../config";

export default function SingleCard({ cardData }) {
    console.log(cardData);

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="text-4xl">{cardData[0].name}</div>

            <div className="flex flex-wrap gap-4">
                {cardData.map((singleCard) => (
                    <div>
                        <div className="pb-2">{singleCard.set_name}</div>
                        <img src={singleCard.image_uris.png} className="h-96" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { cardId } = context.query;

    let cardData = await fetch(`${server}/api/fetchCard`, {
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

    return {
        props: { cardData: cardData.data },
    };
}
