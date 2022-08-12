import Link from "next/link";
import SetIcon from "./SetIcon";

export default function AllPrints({
    prints,
    currentPrint,
    oracleId,
    rarity,
    startLoading,
}) {
    function formatStar(collectorNumber) {
        if (isNaN(collectorNumber)) {
            return collectorNumber.slice(0, -5) + "★";
        }

        return collectorNumber;
    }

    return (
        <div className="flex flex-col m-auto w-full min-w-[24em] max-w-[32em] shadow-lg lg:flex-1">
            <div className="flex items-center gap-2 p-1 text-white border-b-2 border-white bg-gradient-to-r from-dark-violet to-violet-700">
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
                <div className="p-2 text-lg text-white bg-gradient-to-r from-dark-violet to-violet-700 ">
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
                                        className={`hover:bg-violet-200 transition-all flex items-center gap-2 hover:cursor-pointer p-2 ${
                                            currentPrint.image ===
                                            singlePrint.image
                                                ? "pointer-events-none bg-violet-300"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            startLoading(true);
                                        }}>
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
                                    </div>
                                </Link>
                            );
                    })}
                    <Link href={`/${oracleId}`}>
                        <div className="p-2 text-base font-semibold transition-all border-b-2 hover:bg-violet-300 hover:cursor-pointer border-violet-700">
                            View all prints &rarr;
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
