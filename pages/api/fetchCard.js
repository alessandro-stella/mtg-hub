export default async function fetchCard(req, res) {
    const cardId = req.headers.cardid;

    let fetchResponse = await fetch(
        `https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${cardId}&unique=prints`
    );

    fetchResponse = await fetchResponse.json();

    let cardData = fetchResponse.data.map((singleCard) => {
        return {
            id: singleCard.id,
            name: singleCard.name,
            images: singleCard.image_uris,
            set: singleCard.set_name,
        };
    });

    return res.status(200).json({
        data:
            fetchResponse.status === 404
                ? "not-found"
                : cardData,
    });
}
