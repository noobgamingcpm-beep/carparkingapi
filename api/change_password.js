export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { idToken, password } = req.body;
  if (!idToken || !password) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const r = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          password,
          returnSecureToken: true
        })
      }
    );

    const data = await r.json();
    if (!r.ok) {
      return res.status(400).json({ error: data.error?.message });
    }

    res.status(200).json(data);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
