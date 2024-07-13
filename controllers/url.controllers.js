import shortid from "shortid";
import { URL } from "../models/url.models.js";

export async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const shortId = shortid();

    try {
        await URL.create({
            shortId: shortId,
            redirectURL: body.url, // Corrected this line
            visitHistory: []
        });

        return res.json({ id: shortId });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
