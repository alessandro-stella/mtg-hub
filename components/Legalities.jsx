export default function Legalities({ data }) {
    function getBgColor(legality) {
        let colors = {
            Legal: "bg-emerald-400",
            "Not Legal": "bg-neutral-300",
            Banned: "bg-red-400",
            "Restrict.": "bg-sky-500",
        };

        return colors[legality];
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            {data.map((column, index) => (
                <div key={index} className="flex flex-col gap-2">
                    {column.map((singleLegality, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <div
                                className={`${getBgColor(
                                    singleLegality.legality
                                )} flex-1 max-w-[50%] rounded-md text-center px-2 py-1 text-white text-xs`}>
                                {singleLegality.legality}
                            </div>
                            <div className="text-sm">
                                {singleLegality.format}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
