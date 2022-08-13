import CardEffect from "./CardEffect";
import Legalities from "./Legalities";
import SymbolContainer from "./SymbolContainer";

export default function CardInfo({ data, legalities, rarity }) {
    return (
        <div
            className={`custom-border-rarity ${rarity} rounded-lg m-auto max-w-[32em] min-w-[24em] flex flex-col gap-2 py-2 divide-y-[1px] divide-[#aaa] bg-white shadow-lg 
            lg:min-w-[initial] lg:max-w-[initial] lg:m-0 lg:h-fit lg:my-auto lg:flex-1 lg:pl-1`}>
            {data.map((dataSection, index) => (
                <div
                    key={index}
                    className={`flex flex-col gap-2 divide-y-[1px] divide-[#aaa] ${
                        index === 1 ? "pt-2" : ""
                    }`}>
                    <div className="flex gap-2 items-center px-2">
                        <div>{dataSection.name}</div>
                        {dataSection.manaCost && (
                            <SymbolContainer symbols={dataSection.manaCost} />
                        )}
                    </div>
                    <div className="pt-2 px-2">{dataSection.typeLine}</div>
                    {dataSection.effect && (
                        <div className="pt-2 px-2 all-inline-block">
                            <CardEffect data={dataSection.effect} />
                        </div>
                    )}
                    {dataSection.flavorText && (
                        <div className="italic pt-2 px-2">
                            {dataSection.flavorText}
                        </div>
                    )}
                    {dataSection.power && (
                        <div className="pt-2 px-2">
                            {dataSection.power}/{dataSection.toughness}
                        </div>
                    )}
                </div>
            ))}

            <Legalities data={legalities} />
        </div>
    );
}
