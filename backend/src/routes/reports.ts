import express from "express";
import pool from "../services/db";
import cache from "../services/cache";

const router = express.Router();

// GET all reports with optional filtering
router.get("/", async (req, res) => {
  try {
    const patientName = req.query.patientName as string | undefined;

    // Create cache key based on query parameters
    const cacheKey = `reports_${patientName || "all"}`;

    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      res.setHeader("Cache-Control", "public, max-age=60");
      return res.json(cachedData);
    }

    // Build query based on filters
    let query = "SELECT * FROM reports";
    const params: any[] = [];

    if (patientName) {
      query += " WHERE patientName LIKE ?";
      params.push(`%${patientName}%`);
    }

    query += " ORDER BY date DESC";

    // Execute query
    const [rows] = await pool.query(query, params);

    // Cache results
    cache.set(cacheKey, rows);

    // Set cache headers
    res.setHeader("Cache-Control", "public, max-age=60");

    res.json(rows);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET a specific report by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check cache first
    const cacheKey = `report_${id}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      res.setHeader("Cache-Control", "public, max-age=60");
      return res.json(cachedData);
    }

    // Execute query
    const [rows]: any = await pool.query("SELECT * FROM reports WHERE id = ?", [
      id,
    ]);

    if (!rows.length) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Cache result
    cache.set(cacheKey, rows[0]);

    // Set cache headers
    res.setHeader("Cache-Control", "public, max-age=60");

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
