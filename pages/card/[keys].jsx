import Head from "next/head";
import { useEffect, useState } from "react";
import AllPrints from "../../components/AllPrints";
import CardInfo from "../../components/CardInfo";
import CustomImage from "../../components/CustomImage";
import DoubleFacedImage from "../../components/DoubleFacedImage";
import Loader from "../../components/Loader";
import NavBar from "../../components/NavBar";
import TransformButton from "../../components/TransformButton";
import { server } from "../../config";

export default function SingleCard({ cardData, rotate = false }) {
    const isDoubleFaced = cardData.images.hasOwnProperty("front");

    const [isRotated, setIsRotated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading) return;

        document.body.classList.add("disable-scroll");

        return () => {
            document.body.classList.remove("disable-scroll");
        };
    }, [isLoading]);

    const rotateImage = () => {
        setIsRotated(!isRotated);
    };

    return (
        <>
            <Head>
                <title>{`MTG Hub - ${cardData.name}`}</title>
            </Head>

            <div
                className={`${
                    isLoading ? "fixed" : "hidden"
                } z-10 w-screen h-screen bg-black bg-opacity-50 grid place-content-center top-0`}>
                <Loader />
            </div>

            <NavBar />

            <div>
                <div className="flex flex-col gap-2 p-2 m-auto reduced-width lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:flex-[2]">
                        <div className="flex flex-col items-center lg:flex-1 lg:translate-x-2">
                            <div className="relative w-full min-h-[30em]">
                                {isDoubleFaced ? (
                                    <DoubleFacedImage
                                        cardName={cardData.name}
                                        images={cardData.images}
                                        isRotated={isRotated}
                                        hasLoaded={setIsLoading}
                                    />
                                ) : (
                                    <CustomImage
                                        cardName={cardData.name}
                                        imageData={cardData.images}
                                        large={true}
                                        rotate={rotate}
                                        isRotated={isRotated}
                                        hasLoaded={setIsLoading}
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
                            rarity={cardData.rarity}
                        />
                    </div>

                    <AllPrints
                        prints={cardData.prints.printsData}
                        currentPrint={
                            cardData.prints.printsData[
                                cardData.prints.currentPrint
                            ]
                        }
                        oracleId={cardData.prints.oracleId}
                        rarity={cardData.rarity}
                        startLoading={setIsLoading}
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
