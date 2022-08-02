export default async function fetchCards(req, res) {
    const cardId = req.headers.cardid;

    let fetchResponse = await fetch(
        `https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${cardId}&unique=prints`
    );

    fetchResponse = await fetchResponse.json();

    if (!fetchResponse) {
        return res.status(200).json({
            data: "not-found",
        });
    }

    let proxyCard = fetchResponse.data[0];

    let cardData = {
        name: proxyCard.name,
        images: proxyCard.image_uris
            ? proxyCard.image_uris
            : {
                  front: proxyCard.card_faces[0].image_uris,
                  back: proxyCard.card_faces[1].image_uris,
              },

        manaCost: proxyCard.mana_cost,
        cmc: proxyCard.cmc,
        identity: proxyCard.color_identity,
        legalities: Object.keys(proxyCard.legalities)
            .map((key) =>
                proxyCard.legalities[key] !== "not_legal"
                    ? capitalizeFirstLetter(key)
                    : null
            )
            .filter((l) => l),
        price: filterPrice(proxyCard.prices),
        reserved: proxyCard.reserved,
        reprints: fetchResponse.data.map((singleCard) => {
            return {
                set: singleCard.set_name,
                setCode: singleCard.set,
                collectorNumber: singleCard.collector_number,
                image: singleCard.image_uris
                    ? singleCard.image_uris.small
                    : {
                          front: singleCard.card_faces[0].image_uris.small,
                          back: singleCard.card_faces[1].image_uris.small,
                      },
            };
        }),
    };

    return res.status(200).json({
        data: fetchResponse.status === 404 ? "not-found" : cardData,
    });
}

function filterPrice(prices) {
    let priceArray = {};

    Object.keys(prices).map((key) =>
        prices[key] ? (priceArray[key] = prices[key]) : null
    );

    return priceArray;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
