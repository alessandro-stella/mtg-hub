import allSymbols from "../assets/symbols.json";
import Image from "next/image";

export default function Symbol({ symbol }) {
    return (
        <div className="relative aspect-square h-8">
            <Image src={allSymbols[symbol]} layout="fill" alt={symbol} />
        </div>
    );
}
