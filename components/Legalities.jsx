export default function Legalities({ data }) {
    const possibleLegalities = ["Legal", "Not Legal", "Banned", "Restricted"];

    function getBgColor(legality) {
        let colors = {
            legal: "bg-emerald-400",
            not_legal: "bg-neutral-400",
            banned: "bg-red-400",
            restricted: "bg-sky-500",
            Legal: "bg-emerald-400",
            "Not Legal": "bg-neutral-400",
            Banned: "bg-red-400",
            Restricted: "bg-sky-500",
        };

        return colors[legality];
    }

    return (
        <div className="flex gap-2 px-2">
            <div>
                <div className="pb-1 text-xl font-semibold">Legalities</div>
                <div className="flex flex-col gap-2 ">
                    {possibleLegalities.map((legality, index) => (
                        <div key={index}
                            className={`${getBgColor(
                                legality
                            )} text-white p-2 text-center rounded-md `}>
                            {legality}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-2 pt-2">
                {data.map((column, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between gap-2">
                        {column.map((singleLegality, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2">
                                <div
                                    className={`${getBgColor(
                                        singleLegality.legality
                                    )} flex-1 rounded-md text-center px-2 py-1 text-white text-xs`}>
                                    {singleLegality.format}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
