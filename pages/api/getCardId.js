export default async function getCardId(req, res) {
    const cardName = req.headers.cardname;

    let fetchedCard = await fetch(
        `https://api.scryfall.com/cards/named?exact=${cardName}`
    );

    fetchedCard = await fetchedCard.json();

    let cardId = fetchedCard.oracle_id;

    return res.status(200).json({
        cardId: cardId || "not-found",
    });
}
