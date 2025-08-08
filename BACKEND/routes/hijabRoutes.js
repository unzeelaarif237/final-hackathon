import express from "express";
import HijabStyle from "../models/HijabStyle.js";

const router = express.Router();

// Get all hijab styles
router.get("/", async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>>> get routes , ., ");
    
    const hijabs = await HijabStyle.find().sort({ createdAt: -1 });
    res.json(hijabs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single hijab by ID
router.get('/hijabs/:id', async (req, res) => {
  try {
    const hijab = await HijabStyle.findById(req.params.id);
    if (!hijab) {
      return res.status(404).json({ message: 'Hijab not found' });
    }
    res.json(hijab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new hijab style
router.post('/hijabs', async (req, res) => {
  try {
    const hijab = new HijabStyle(req.body);
    const savedHijab = await hijab.save();
    res.status(201).json(savedHijab);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update hijab style
router.put('/hijabs/:id', async (req, res) => {
  try {
    const hijab = await HijabStyle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!hijab) {
      return res.status(404).json({ message: 'Hijab not found' });
    }
    res.json(hijab);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete hijab style
router.delete('/hijabs/:id', async (req, res) => {
  try {
    const hijab = await HijabStyle.findByIdAndDelete(req.params.id);
    if (!hijab) {
      return res.status(404).json({ message: 'Hijab not found' });
    }
    res.json({ message: 'Hijab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
