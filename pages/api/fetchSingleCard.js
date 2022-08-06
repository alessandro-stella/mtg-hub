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
        transform: "flip",
        modal_dfc: "flip",
        meld: fetchResponse.keywords.includes("Meld") && "flip",
        double_faced_token: "flip",
        art_series: "flip",
    };

    const rotate = specialCardTypes[fetchResponse.layout];

    /* Get meld card back if needed
    Look for the element in "all_parts" array with "meld_result" property and get the id
    [{"component": "meld_part",},{"component": "meld_result"}] */

    console.log("AAAAAAAAAA");
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
