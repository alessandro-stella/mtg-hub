export default function Prices({ data }) {
    return (
        <div className="flex-1 lg:px-8 pt-0 min-w-[32em] lg:min-w-[initial]">
            <div className="pb-2 text-xl font-semibold">Average prices</div>

            <div className="rounded-md bg-white flex flex-col divide-y-[1px] divide-[#aaa] border-2 border-[#aaa]">
                {data.map((singlePrice, index) => (
                    <div
                        key={index}
                        className={`flex gap-2 divide-x-[1px] divide-[#aaa] ${
                            index % 2 === 0 ? "bg-violet-100" : ""
                        }`}>
                        <div className="flex-1 px-2 py-1 font-semibold">
                            {singlePrice.version}
                        </div>
                        <div className="flex-1 px-2 py-1">
                            {singlePrice.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
