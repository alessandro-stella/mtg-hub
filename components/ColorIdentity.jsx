import Symbol from "./Symbol";

export default function ColorIdentity({ identity }) {
    return (
        <div className="relative flex flex-wrap items-center gap-1 h-max">
            <div className="mr-2 text-2xl">Color identity:</div>
            {identity.length !== 0 ? (
                <>
                    {identity.map((symbol, index) => (
                        <Symbol symbol={`{${symbol}}`} key={index}/>
                    ))}
                </>
            ) : (
                <div className="text-2xl">NONE</div>
            )}
        </div>
    );
}
