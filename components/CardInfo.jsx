import Legalities from "./Legalities";
import SymbolContainer from "./SymbolContainer";

export default function CardInfo({ data, legalities }) {
    console.log(data);

    return (
        <div className="w-2/3 m-auto flex flex-col gap-2">
            {data.map((dataSection, index) => (
                <div key={index} className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <div>{dataSection.name}</div>
                        {dataSection.manaCost && <SymbolContainer symbols={dataSection.manaCost} />}
                    </div>
                    <div>{dataSection.typeLine}</div>
                    {dataSection.effect && <div>{dataSection.effect}</div>}
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
