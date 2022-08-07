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
        ...(fetchResponse.name.indexOf("//") === -1
            ? {
                  name: fetchResponse.name,
                  manaCost: fetchResponse.mana_cost,
                  effect: fetchResponse.oracle_text,
                  typeLine: fetchResponse.type_line,
                  ...(fetchResponse.flavor_text && {
                      flavorText: fetchResponse.flavor_text,
                  }),
              }
            : {
                  name: fetchResponse.name,
                  parts: fetchResponse.card_faces.map((singleFace) => {
                      return {
                          name: singleFace.name,
                          ...(singleFace.mana_cost && {
                              manaCost: singleFace.mana_cost,
                          }),
                          effect: singleFace.oracle_text,
                          typeLine: singleFace.type_line,
                          ...(singleFace.power && {
                              power: singleFace.power,
                          }),
                          ...(singleFace.toughness && {
                              toughness: singleFace.toughness,
                          }),
                          ...(singleFace.flavor_text && {
                              flavorText: singleFace.flavor_text,
                          }),
                      };
                  }),
              }),
        rarity: fetchResponse.rarity,
        ...(fetchResponse.power && { power: fetchResponse.power }),
        ...(fetchResponse.toughness && { toughness: fetchResponse.toughness }),

        prices: formatPrices(fetchResponse.prices),
        legalities: formatLegalities(fetchResponse.legalities),
        purchase: formatPurchase(fetchResponse.purchase_uris),
    };

    cardData.images = await formatImages(fetchResponse, rotate);

    cardData.prints = [];

    let printsFetchResponse = await fetch(
        `https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${fetchResponse.oracle_id}&unique=prints`
    );

    printsFetchResponse = await printsFetchResponse.json();

    cardData.prints = printsFetchResponse.data.map((singlePrint) => {
        return {
            set: singlePrint.set_name,
            setCode: singlePrint.set,
            collectorNumber: parseCollectorNumber(singlePrint.collector_number),
        };
    });

    return res.status(fetchResponse.status ?? 200).json({
        data:
            fetchResponse.status === 404
                ? "not-found"
                : {
                      cardData,
                      ...(rotate !== false && { rotate }),
                  },
    });
}

function parseCollectorNumber(collectorNumber) {
    if (collectorNumber.charAt(collectorNumber.length - 1) === "★") {
        collectorNumber = collectorNumber.slice(0, -1) + "-star";
    }

    return collectorNumber;
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

    for (const [key, value] of Object.entries(legalitiesArray)) {
        let obj = {};
        obj[key] = value;

        legalities.push(value);
    }

    return legalities;
}

function formatPurchase(purchaseArray) {
    let purchase = [];

    for (const [key, value] of Object.entries(purchaseArray))
        purchase.push({ site: key, link: value });

    return purchase;
}
