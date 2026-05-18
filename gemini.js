const axios = require("axios");

const explainPath = async (grid, path, start, end) => {
  try {
    const prompt = `
You are an AI that explains pathfinding.

Grid size: ${grid.length} x ${grid[0].length}
Start: ${JSON.stringify(start)}
End: ${JSON.stringify(end)}
Path: ${JSON.stringify(path)}

Explain:
1. How algorithm explored nodes
2. Why this path is optimal
3. Mention obstacles impact
Keep it short and simple.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return text || "No explanation returned";

  } catch (err) {
    console.log("🔥 GEMINI ERROR:", err.response?.data || err.message);
    return "AI explanation unavailable";
  }
};

module.exports = { explainPath };
