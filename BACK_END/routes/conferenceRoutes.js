const express = require("express");
const router = express.Router();
const Conference = require("../models/conference");

// GET all conferences
router.get("/conferences", async (req, res) => {
  const conferences = await Conference.findAll();
  res.json(conferences);
});

// POST create conference
router.post("/conferences", async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;

    const conf = await Conference.create({
      name,
      description,
      startDate,
      endDate
    });

    res.status(201).json(conf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create conference" });
  }
});

// PUT update conference
router.put("/conferences/:id", async (req, res) => {
  const { id } = req.params;
  const conf = await Conference.findByPk(id);

  if (!conf) return res.status(404).json({ error: "Not found" });

  await conf.update(req.body);
  res.json(conf);
});

// DELETE conference
router.delete("/conferences/:id", async (req, res) => {
  const { id } = req.params;
  const conf = await Conference.findByPk(id);

  if (!conf) return res.status(404).json({ error: "Not found" });

  await conf.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;