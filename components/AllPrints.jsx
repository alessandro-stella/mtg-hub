import Link from "next/link";
import SetIcon from "./SetIcon";

export default function AllPrints({ prints, currentPrint, oracleId, rarity }) {
    return (
        <div className="flex flex-col gap-2 bg-sky-400">
            <div className="flex gap-2">
                <SetIcon setCode={currentPrint.setCode} />

                <div>{currentPrint.set}</div>
            </div>
            <div className="flex flex-col gap-2 bg-green-400 ">
                {prints.map((singlePrint, index) => {
                    if (index < 10)
                        return (
                            <Link
                                key={index}
                                href={`/card/${singlePrint.setCode}-${singlePrint.collectorNumber}`}>
                                <div className="flex items-center gap-2 hover:bg-green-600 hover:cursor-pointer">
                                    <SetIcon setCode={singlePrint.setCode} />
                                    {singlePrint.set}
                                </div>
                            </Link>
                        );
                })}
            </div>
        </div>
    );
}
