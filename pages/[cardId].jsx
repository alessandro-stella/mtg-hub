import { server } from "../config";
import CustomImage from "../components/CustomImage";

export default function SingleCard({ cardData }) {
    console.table(cardData);

    return (
        <div className="flex flex-col h-screen gap-4 p-4">
            <div className="text-4xl">{cardData[0].name}</div>

            <div className="flex flex-wrap h-full gap-4">
                {cardData.map((singleCard) => (
                    <div key={singleCard.id}>
                        <div className="pb-2">{singleCard.set}</div>
                        <div className="relative w-60 h-80">
                            <CustomImage imageData={singleCard} />
                        </div>
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
