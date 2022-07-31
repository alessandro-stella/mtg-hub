import { server } from "../config";
import CustomImage from "../components/CustomImage";
import SymbolContainer from "../components/SymbolContainer";
import ColorIdentity from "../components/ColorIdentity";
import Head from "next/head";

export default function SingleCard({ cardData }) {
    return (
        <>
            <Head>
                <title>MTG Hub - {cardData.name}</title>
            </Head>

            <div className="flex flex-col min-h-screen gap-1 p-4 h-fit">
                <div className="text-4xl font-bold">{cardData.name}</div>

                <div className="flex flex-col gap-4 p-2 bg-green-300 border-2 border-green-900 h-1/2">
                    <div className="relative min-h-[30rem]">
                        <CustomImage
                            cardName={cardData.name}
                            imageData={cardData.images}
                            large={true}
                        />
                    </div>

                    <SymbolContainer symbols={cardData.manaCost} />

                    <ColorIdentity identity={cardData.identity} />
                </div>

                <div className="mt-4 text-2xl font-bold">Reprints</div>

                <div className="card-grid">
                    {cardData.reprints.map((singleReprint, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 p-2 bg-blue-300 border-2 border-blue-900 h-fit">
                            <div className="relative w-full min-h-[15em]">
                                <CustomImage
                                    cardName={cardData.name}
                                    imageData={singleReprint.image}
                                />
                            </div>

                            <div className="text-center">
                                {singleReprint.set}
                            </div>
                        </div>
                    ))}
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

    return {
        props: { cardData: cardData.data },
    };
}
