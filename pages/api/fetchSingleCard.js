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
        meld: fetchResponse.hasOwnProperty("all_parts") && "flip",
        double_faced_token: "flip",
        art_series: "flip",
    };

    const rotate = specialCardTypes[fetchResponse.layout];

    let cardData = {
        name: fetchResponse.name,
        manaCost: fetchResponse.mana_cost,
        cmc: fetchResponse.cmc,
        colorIdentity: fetchResponse.color_identity,
        rarity: fetchResponse.rarity,
        power: fetchResponse.power,
        toughness: fetchResponse.toughness,
        typeLine: fetchResponse.typeLine,
        effect: fetchResponse.oracle_text,
        prices: formatPrices(fetchResponse.prices),
        legalities: formatLegalities(fetchResponse.legalities),
        purchase: formatPurchase(fetchResponse.purchase_uris),
    };

    cardData.images = await formatImages(fetchResponse, rotate);

    /* Needed data:
    images
    Link to reprints
    */

    return res.status(200).json({
        data:
            fetchResponse.status === 404
                ? "not-found"
                : {
                      cardData,
                      /* fetchResponse, */
                      ...(rotate !== false && { rotate }),
                  },
    });
}

async function getMeldBack(allParts) {
    for (const part of allParts) {
        if (part.component === "meld_result") {
            let backFetchResult = await fetch(part.uri);
            backFetchResult = await backFetchResult.json();

            return backFetchResult.image_uris;
        }
    }

    return false;
}

async function formatImages(cardData, rotate) {
    console.log(rotate);

    let images;

    if (rotate !== "flip") {
        return cardData.image_uris;
    }

    if (cardData.hasOwnProperty("all_parts")) {
        images = {
            front: cardData.image_uris,
            back: await getMeldBack(cardData.all_parts),
        };

        return images;
    }

    const [front, back] = cardData.card_faces;
    return { front: front.image_uris, back: back.image_uris };
}

function formatPrices(pricesArray) {
    let prices = [];

    for (const [key, value] of Object.entries(pricesArray))
        if (value) prices.push({ version: key, price: value });

    return prices;
}

function formatLegalities(legalitiesArray) {
    let legalities = [];

    for (const [key, value] of Object.entries(legalitiesArray))
        if (value === "legal") legalities.push(key);

    return legalities;
}

function formatPurchase(purchaseArray) {
    let purchase = [];

    for (const [key, value] of Object.entries(purchaseArray))
        purchase.push({ site: key, link: value });

    return purchase;
}
