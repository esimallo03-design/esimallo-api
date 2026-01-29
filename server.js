import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("eSIMAllo API is running"));
app.get("/health", (req, res) => res.json({ ok: true }));

// Test eSIM Access balance (set ESIMACCESS_ACCESS_CODE in Render)
app.get("/debug/esimaccess/balance", async (req, res) => {
  try {
    const r = await axios.post(
      "https://api.esimaccess.com/api/v1/open/balance",
      "",
      { headers: { "RT-AccessCode": process.env.ESIMACCESS_ACCESS_CODE } }
    );
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: e.response?.data || e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on", port));
