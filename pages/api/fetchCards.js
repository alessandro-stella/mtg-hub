export default async function fetchCards(req, res) {
    const cardId = req.headers.cardid;

    let fetchResponse = await fetch(
        `https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${cardId}&unique=prints`
    );

    fetchResponse = await fetchResponse.json();

    if (!fetchResponse) {
        return res.status(fetchResponse.status ?? 200).json({
            data: "not-found",
        });
    }

    let proxyCard = fetchResponse.data[0];

    let cardData = {
        name: proxyCard.name,
        prints: fetchResponse.data.map((singleCard) => {
            console.log(singleCard.image_uris);

            return {
                set: singleCard.set_name,
                setCode: singleCard.set,
                collectorNumber: parseCollectorNumber(
                    singleCard.collector_number
                ),
                image: singleCard.image_uris
                    ? singleCard.image_uris.normal
                    : singleCard.card_faces[0].image_uris.normal,
            };
        }),
    };

    return res.status(fetchResponse.status ?? 200).json({
        data: fetchResponse.status === 404 ? "not-found" : cardData,
    });
}

function parseCollectorNumber(collectorNumber) {
    if (collectorNumber.charAt(collectorNumber.length - 1) === "★") {
        collectorNumber = collectorNumber.slice(0, -1) + "-star";
    }

    return collectorNumber;
}
