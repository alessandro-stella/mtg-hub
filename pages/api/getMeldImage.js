export default async function getMeldImage(req, res) {
    let cardId = req.headers.cardid;

    let fetchResponse = await fetch(`https://api.scryfall.com/cards/${cardId}`);
    fetchResponse = await fetchResponse.json();

    return res.status(200).json({ imageUrl: fetchResponse.image_uris.png });
}
