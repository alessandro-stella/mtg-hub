import Symbol from "./Symbol";

export default function SymbolContainer({ symbols }) {
    const singleSymbols = symbols.match(/[^\}]+\}?|\//g);

    return (
        <div className="relative flex flex-wrap items-center gap-1 h-fit">
            <div className="mr-2 text-2xl">Mana cost:</div>
            {singleSymbols.map((symbol, index) => (
                <Symbol symbol={symbol} key={index} />
            ))}
        </div>
    );
}
