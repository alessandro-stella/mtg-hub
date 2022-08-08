import Legalities from "./Legalities";
import SymbolContainer from "./SymbolContainer";

export default function CardInfo({ data, legalities }) {
    return (
        <div className="w-2/3 m-auto flex flex-col gap-2 font-mplantin">
            {data.map((dataSection, index) => (
                <div key={index} className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <div>{dataSection.name}</div>
                        <SymbolContainer symbols={dataSection.manaCost} />
                    </div>
                    <div>{dataSection.typeLine}</div>
                    <div>{dataSection.effect}</div>
                    {dataSection.flavorText && (
                        <div className="italic">{dataSection.flavorText}</div>
                    )}
                    {dataSection.power && (
                        <div>
                            {dataSection.power}/{dataSection.toughness}
                        </div>
                    )}
                </div>
            ))}

            <Legalities data={legalities} />
        </div>
    );
}