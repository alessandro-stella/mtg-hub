export default async function fetchSingleCard(req, res) {
    let { setcode, collectornumber } = req.headers;
    let star = req.headers.star === "true";

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
        cardInfo: formatCardInfo(
            fetchResponse.name.indexOf("//") === -1,
            fetchResponse
        ),
        rarity: fetchResponse.rarity,
        prices: formatPrices(fetchResponse.prices),
        legalities: formatLegalities(fetchResponse.legalities),
        purchase: formatPurchase(
            fetchResponse.name,
            fetchResponse.purchase_uris
        ),
        images: await formatImages(fetchResponse, rotate),
        prints: await getAllPrints(fetchResponse.oracle_id, fetchResponse.id),
    };

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

function formatCardInfo(hasMoreFaces, cardData) {
    const returnInfo = hasMoreFaces
        ? [
              {
                  name: cardData.name,
                  typeLine: cardData.type_line,
                  manaCost: cardData.mana_cost ?? undefined,
                  effect: cardData.oracle_text ?? undefined,
                  flavorText: cardData.flavor_text ?? undefined,
                  power: cardData.power ?? undefined,
                  toughness: cardData.toughness ?? undefined,
              },
          ]
        : cardData.card_faces.map((singleFace) => {
              return {
                  name: singleFace.name,
                  typeLine: singleFace.type_line,
                  manaCost: singleFace.mana_cost ?? undefined,
                  effect: singleFace.oracle_text ?? undefined,
                  flavorText: singleFace.flavor_text ?? undefined,
                  power: singleFace.power ?? undefined,
                  toughness: singleFace.toughness ?? undefined,
              };
          });

    const finalOutput = [];

    returnInfo.forEach((section) => {
        let obj = {};

        for (const [key, value] of Object.entries(section)) {
            if (value !== undefined && value !== "") {
                obj[key] = value;
            }
        }

        finalOutput.push(obj);
    });

    return finalOutput;
}

async function getAllPrints(oracleId, currentPrintId) {
    let printsFetchResponse = await fetch(
        `https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${oracleId}&unique=prints`
    );

    printsFetchResponse = await printsFetchResponse.json();

    let returnData = [];
    let currentPrint = 0;
    let index = 0;

    for (const singlePrint of printsFetchResponse.data) {
        if (singlePrint.id === currentPrintId) {
            currentPrint = index;
        }

        returnData.push({
            set: singlePrint.set_name,
            setCode: singlePrint.set,
            collectorNumber: parseCollectorNumber(singlePrint.collector_number),
            image: singlePrint.image_uris
                ? singlePrint.image_uris.small
                : singlePrint.card_faces[0].image_uris.small,
        });

        index++;
    }

    return { printsData: returnData, currentPrint, oracleId };
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

    for (const [key, value] of Object.entries(pricesArray)) {
        let formattedKey,
            formattedValue = value ?? "N/A";

        if (key.indexOf("_") !== -1) {
            formattedKey = key.split("_");
            formattedKey =
                formattedKey[0].toUpperCase() +
                " (" +
                formattedKey[1].charAt(0).toUpperCase() +
                formattedKey[1].slice(1) +
                ")";
        } else {
            formattedKey = key.toUpperCase();
        }

        if (value) {
            switch (true) {
                case key.includes("eur"):
                    formattedValue += " €";
                    break;

                case key.includes("usd"):
                    formattedValue = "$ " + value;
                    break;

                default:
                    break;
            }
        }

        prices.push({
            version: formattedKey,
            price: formattedValue,
        });
    }

    return prices;
}

function formatLegalities(legalitiesArray) {
    const possibleFormats = {
        standard: "Standard",
        historic: "Historic",
        pioneer: "Pioneer",
        explorer: "Explorer",
        modern: "Modern",
        legacy: "Legacy",
        pauper: "Pauper",
        vintage: "Vintage",
        penny: "Penny",
        commander: "Commander",
        brawl: "Brawl",
        alchemy: "Alchemy",
    };

    let legalities = [[], []];

    for (const [key, value] of Object.entries(legalitiesArray))
        if (possibleFormats[key])
            legalities[legalities[0].length < 6 ? 0 : 1].push({
                format: possibleFormats[key],
                legality: value,
            });

    return legalities;
}

function formatPurchase(cardName, purchaseArray = []) {
    let purchase = [];

    for (const [key, value] of Object.entries(purchaseArray)) {
        let tempValue = value;

        if (key === "cardmarket") {
            tempValue = `https://www.cardmarket.com/en/Magic/Products/Search?&searchString=${encodeURIComponent(
                `[${cardName}]`
            )}&exactMatch=on`;
        }

        purchase.push({ site: key, link: tempValue });
    }

    return purchase;
}
