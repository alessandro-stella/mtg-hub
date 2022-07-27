export default async function fetchCard(req, res) {
    const cardId = req.headers.cardid;

    let fetchResponse = await fetch(
        `https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${cardId}&unique=prints`
    );

    fetchResponse = await fetchResponse.json();

    return res
        .status(200)
        .json(fetchResponse.status === 404 ? "not-found" : fetchResponse);
}
