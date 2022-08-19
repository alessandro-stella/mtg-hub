import Link from "next/link";
import { useState } from "react";
import CustomImage from "./CustomImage";
import SetIcon from "./SetIcon";

export default function AllPrints({
    cardName,
    prints,
    currentPrint,
    oracleId,
    rarity,
    startLoading,
}) {
    const [shownImage, setShownImage] = useState(false);

    function formatStar(collectorNumber) {
        const regex = /[0-9]/g;

        if (isNaN(collectorNumber)) {
            return collectorNumber.match(regex).join("") + "★";
        }

        return collectorNumber;
    }

    return (
        <div className="flex flex-col m-auto w-full min-w-[24em] lg:min-w-[initial] max-w-[32em] shadow-lg lg:flex-1 lg:m-0">
            <div className="flex items-center gap-2 p-2 text-white border-b-2 border-white bg-gradient-to-r from-dark-violet to-violet-700">
                <div className="h-12 aspect-square">
                    <SetIcon setCode={currentPrint.setCode} invert={true} />
                </div>

                <div>
                    <div className="font-semibold text-md ">
                        {currentPrint.set} ({currentPrint.setCode.toUpperCase()}
                        )
                    </div>
                    <div className="text-sm">
                        {"#" + formatStar(currentPrint.collectorNumber)} -{" "}
                        {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-white">
                <div className="p-2 text-lg font-semibold text-white bg-gradient-to-r from-dark-violet to-violet-700 ">
                    Prints
                </div>

                <div className="divide-y-[1px] divide-[#aaa]">
                    {prints.map((singlePrint, index) => {
                        if (index < 10)
                            return (
                                <Link
                                    key={index}
                                    href={`/card/${singlePrint.setCode}-${singlePrint.collectorNumber}`}>
                                    <div
                                        className={`relative hover:bg-violet-200 transition-all flex items-center gap-2 hover:cursor-pointer p-2 ${
                                            currentPrint.image ===
                                            singlePrint.image
                                                ? "pointer-events-none bg-violet-300"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            startLoading(true);
                                        }}
                                        onMouseOver={() => setShownImage(index)}
                                        onMouseLeave={() =>
                                            setShownImage(false)
                                        }>
                                        <div className="h-6">
                                            <SetIcon
                                                setCode={singlePrint.setCode}
                                            />
                                        </div>
                                        {singlePrint.set} -{" "}
                                        {"#" +
                                            formatStar(
                                                singlePrint.collectorNumber
                                            )}
                                        {shownImage !== false &&
                                            shownImage === index && (
                                                <div className="absolute right-0 z-[2] w-1/4 aspect-card shadow-lg pointer-events-none">
                                                    <CustomImage
                                                        cardName={cardName}
                                                        imageData={
                                                            singlePrint.image
                                                        }
                                                    />
                                                </div>
                                            )}
                                    </div>
                                </Link>
                            );
                    })}
                </div>

                {prints.length !== 1 && (
                    <Link href={`/${oracleId}`}>
                        <div className="p-2 text-base font-semibold transition-all border-t-2 border-b-2 hover:text-white border-violet-700 hover:bg-violet-400 hover:cursor-pointer">
                            View all prints &rarr;
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}
