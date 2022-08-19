export default function BuyLinks({ data }) {
    console.log(data);

    return (
        <div className=" flex-1 px-8 pt-0">
            <div className="text-xl font-semibold pb-2">Buy this card</div>

            <div className="flex flex-col gap-2">
                {data.map((singleLink, index) => {
                    let possibleLinks = {
                        tcgplayer: "tcg",
                        cardmarket: "mkm",
                        cardhoarder: "ch",
                    };

                    let formattedNames = {
                        tcgplayer: "TCGPlayer",
                        cardmarket: "Cardmarket",
                        cardhoarder: "Cardhoarder",
                    };

                    return (
                        <a
                            href={singleLink.link}
                            rel="noreferrer noopener"
                            target="_blank"
                            key={index}
                            className={`bg-white min-w-[15em] max-w-[70%] shadow-lg rounded-md link-container flex items-center gap-2 border-2 py-2 px-1 ${
                                possibleLinks[singleLink.site]
                            }-color font-semibold`}>
                            <div
                                className={`${
                                    possibleLinks[singleLink.site]
                                }-icon`}></div>
                            <div>Buy on {formattedNames[singleLink.site]}</div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
