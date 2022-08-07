export default async function matchKeyword(req, res) {
    const { keyword, exact } = req.headers;

    let fetchResponse = await fetch(
        `https://api.scryfall.com/cards/${
            exact === "true" ? "named?exact=" : "autocomplete?q="
        }${keyword}`
    );

    fetchResponse = await fetchResponse.json();

    const possibleCardsName =
        exact === "true"
            ? fetchResponse.name
                ? [fetchResponse.name]
                : "not-found"
            : fetchResponse.data.length !== 0
            ? fetchResponse.data
            : "not-found";

    if (possibleCardsName === "not-found") {
        return res
            .status(fetchResponse.status ?? 200)
            .json({ possibleCards: "not-found" });
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

    return res.status(fetchResponse.status ?? 200).json({ possibleCards });
}
