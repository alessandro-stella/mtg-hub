import Head from "next/head";
import { useState } from "react";
import CardInfo from "../../components/CardInfo";
import CustomImage from "../../components/CustomImage";
import DoubleFacedImage from "../../components/DoubleFacedImage";
import NavBar from "../../components/NavBar";
import TransformButton from "../../components/TransformButton";
import { server } from "../../config";

export default function SingleCard({ cardData, rotate = false }) {
    const isDoubleFaced = cardData.images.hasOwnProperty("front");
    const [isRotated, setIsRotated] = useState(false);

    const rotateImage = () => {
        setIsRotated(!isRotated);
    };

    return (
        <>
            <Head>
                <title>{`MTG Hub - ${cardData.name}`}</title>
            </Head>

            <NavBar />

            <div className="min-h-screen bg-neutral-200">
                <div className="min-h-screen m-auto bg-white reduced-width">
                    <div className="flex flex-col items-center">
                        <div className="relative w-full min-h-[30em]">
                            {isDoubleFaced ? (
                                <DoubleFacedImage
                                    cardName={cardData.name}
                                    images={cardData.images}
                                    isRotated={isRotated}
                                />
                            ) : (
                                <CustomImage
                                    cardName={cardData.name}
                                    imageData={cardData.images}
                                    large={true}
                                    rotate={rotate}
                                    isRotated={isRotated}
                                />
                            )}
                        </div>

                        {rotate && (
                            <TransformButton
                                buttonLabel={rotate}
                                rotate={rotateImage}
                                isRotated={isRotated}
                            />
                        )}
                    </div>

                    <CardInfo
                        data={cardData.cardInfo}
                        legalities={cardData.legalities}
                    />
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
