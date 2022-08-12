import setIcons from "../assets/setIcons.json";

export default function SetIcon({ setCode, invert = false }) {
    const iconLink = `https://c2.scryfall.com/file/scryfall-symbols/sets/${
        setIcons[setCode] ?? setCode
    }.svg?1659931200`;

    return (
        <div
            className={`relative h-full aspect-square bg-icon ${invert ? "[filter:invert()]" : ""}`}
            style={{ backgroundImage: `url(${iconLink})` }}></div>
    );
}
