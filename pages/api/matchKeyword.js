export default async function matchKeyword(req, res) {
    const { keyword, exact } = req.headers;

    let fetchedResults = await fetch(
        `https://api.scryfall.com/cards/${
            exact === "true" ? "named?exact=" : "autocomplete?q="
        }${keyword}`
    );

    fetchedResults = await fetchedResults.json();

    const possibleCardsName =
        exact === "true"
            ? fetchedResults.name
                ? [fetchedResults.name]
                : "not-found"
            : fetchedResults.data.length !== 0
            ? fetchedResults.data
            : "not-found";

    if (possibleCardsName === "not-found") {
        return res.status(400).json({ possibleCards: "not-found" });
    }

    const possibleCards = await Promise.all(
        possibleCardsName.map(async (singleName) => {
            let fetchedCard = await fetch(
                `https://api.scryfall.com/cards/named?exact=${singleName}`
            );

            fetchedCard = await fetchedCard.json();

            return {
                cardName: singleName,
                cardId: fetchedCard.oracle_id,
            };
        })
    );

    return res.status(200).json({ possibleCards });
}
