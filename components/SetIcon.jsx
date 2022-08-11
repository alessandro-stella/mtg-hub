export default function SetIcon({ setCode }) {
    const special = ["hbg", "sld"];

    const iconLink = `https://c2.scryfall.com/file/scryfall-symbols/sets/${
        !special.includes(setCode) ? setCode : "star"
    }.svg?1659931200`;

    return (
        <div
            className="relative h-4 bg-red-700 aspect-square bg-icon"
            style={{ backgroundImage: `url(${iconLink})` }}></div>
    );
}
