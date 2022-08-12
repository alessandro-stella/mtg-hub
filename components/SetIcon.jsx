import setIcons from "../assets/setIcons.json";

export default function SetIcon({ setCode }) {
    const iconLink = `https://c2.scryfall.com/file/scryfall-symbols/sets/${
        setIcons[setCode] ?? setCode
    }.svg?1659931200`;

    return (
        <div
            className="relative h-4 bg-red-700 aspect-square bg-icon"
            style={{ backgroundImage: `url(${iconLink})` }}></div>
    );
}
