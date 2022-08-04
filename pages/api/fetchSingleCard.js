export default async function fetchSingleCard(req, res) {
    let { setcode, collectornumber } = req.headers;
    let star = !req.headers.star;

    if (star) {
        collectornumber += "★";
    }

    let fetchResponse = await fetch(
        `https://api.scryfall.com/cards/${setcode}/${collectornumber}`
    );

    fetchResponse = await fetchResponse.json();

    const specialCardTypes = {
        split: fetchResponse.keywords.includes("Aftermath")
            ? "rotate90a"
            : "rotate90c",
        flip: "rotate180",
        transform: "rotate180",
        modal_dfc: "rotate180",
        meld: fetchResponse.keywords.includes("Meld") && "rotate180",
        double_faced_token: "rotate180",
        art_series: "rotate180",
    };

    const rotate = specialCardTypes[fetchResponse.layout];

    return res.status(200).json({
        data:
            fetchResponse.status === 404
                ? "not-found"
                : {
                      cardData: fetchResponse,
                      ...(rotate !== false && { rotate }),
                  },
    });
}
