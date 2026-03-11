export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { wallet, before } = req.query;
  if (!wallet) return res.status(400).json({ error: 'wallet required' });

  const key = process.env.HELIUS_API_KEY;
  if (!key) return res.status(500).json({ error: 'API key not configured' });

  let url = `https://api.helius.xyz/v0/addresses/${wallet}/transactions?api-key=${key}&limit=25`;
  if (before) url += `&before=${before}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
