export default async function fetchCard(req, res) {
    const cardName = req.headers.cardname;

    let fetchResponse = await fetch(
        `https://api.scryfall.com/cards/named?exact=${cardName}`
    );

    fetchResponse = await fetchResponse.json();

    return res
        .status(200)
        .json(fetchResponse.status === 404 ? "not-found" : fetchResponse);
}
