import allSymbols from "assets/symbols.json";
import Image from "next/image";

export default function Symbol({ symbol }) {
    return (
        <div className="relative aspect-square h-5 rounded-full shadow-sm shadow-black symbol">
            <Image src={allSymbols[symbol]} layout="fill" alt={symbol} />
        </div>
    );
}
