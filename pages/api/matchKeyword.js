export default async function matchKeyword(req, res) {
    const { keyword, exact } = req.headers;

    let fetchedResults = await fetch(
        `https://api.scryfall.com/cards/${
            exact === "true" ? "named?exact=" : "autocomplete?q="
        }${keyword}`
    );

    fetchedResults = await fetchedResults.json();

    return res.status(200).json({
        possibleCards:
            exact === "true"
                ? fetchedResults.name
                    ? [fetchedResults.name]
                    : "not-found"
                : fetchedResults.data.length !== 0
                ? fetchedResults.data
                : "not-found",
    });
}
