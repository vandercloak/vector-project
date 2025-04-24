import request from "supertest";
import express from "express";
import reportRoutes from "../routes/reports";
import cache from "../services/cache";
import pool from "../services/db";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";

// First, import the type of the mock function

// Then, define the type for the pool.query function
type QueryFunction = (sql: string, params?: any[]) => Promise<any[]>;

// Update the mock with proper types
jest.mock("../services/db", () => ({
  query: jest.fn() as jest.MockedFunction<QueryFunction>,
}));

const app = express();
app.use(express.json());
app.use("/api/reports", reportRoutes);

describe("Reports API", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock console.error to suppress error output during tests
    jest.spyOn(console, "error").mockImplementation(() => {});

    // Mock the cache with an in-memory store for tests
    const mockCacheStore: Record<string, any> = {};
    jest
      .spyOn(cache, "get")
      .mockImplementation((key: string) => mockCacheStore[key] || null);
    jest.spyOn(cache, "set").mockImplementation((key: string, value: any) => {
      mockCacheStore[key] = value;
    });
  });

  describe("GET /api/reports", () => {
    test("should return all reports", async () => {
      const mockReports = [
        {
          id: 1,
          patientName: "John Smith",
          date: "2023-01-15",
          summary: "Patient showing signs of tachycardia",
          hasTachycardia: true,
          hasArrhythmia: false,
        },
        {
          id: 2,
          patientName: "Jane Doe",
          date: "2023-01-16",
          summary: "Normal heart rhythm",
          hasTachycardia: false,
          hasArrhythmia: false,
        },
      ];

      (pool.query as jest.Mock<any>).mockResolvedValue([mockReports]);

      const response = await request(app).get("/api/reports");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReports);
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM reports ORDER BY date DESC",
        []
      );
    });

    test("should filter reports by patient name", async () => {
      const mockReports = [
        {
          id: 1,
          patientName: "John Smith",
          date: "2023-01-15",
          summary: "Patient showing signs of tachycardia",
          hasTachycardia: true,
          hasArrhythmia: false,
        },
      ];

      (pool.query as jest.Mock<any>).mockResolvedValue([mockReports]);

      const response = await request(app).get("/api/reports?patientName=John");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReports);
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM reports WHERE patientName LIKE ? ORDER BY date DESC",
        ["%John%"]
      );
    });

    test("should handle database errors", async () => {
      (pool.query as jest.Mock<any>).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).get("/api/reports");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
    });

    test("should use cached results if available", async () => {
      const mockReports = [
        {
          id: 1,
          patientName: "John Smith",
          date: "2023-01-15",
          summary: "Patient showing signs of tachycardia",
          hasTachycardia: true,
          hasArrhythmia: false,
        },
      ];

      // Set up the cache with data
      cache.set("reports_all", mockReports);

      const response = await request(app).get("/api/reports");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReports);
      // Query should not be called if cache is hit
      expect(pool.query).not.toHaveBeenCalled();
    });
  });

  describe("GET /api/reports/:id", () => {
    test("should return a specific report", async () => {
      const mockReport = {
        id: 1,
        patientName: "John Smith",
        date: "2023-01-15",
        summary: "Patient showing signs of tachycardia",
        hasTachycardia: true,
        hasArrhythmia: false,
      };

      (pool.query as jest.Mock<any>).mockResolvedValue([[mockReport]]);

      const response = await request(app).get("/api/reports/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReport);
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM reports WHERE id = ?",
        ["1"]
      );
    });

    test("should return 404 for non-existent report", async () => {
      (pool.query as jest.Mock<any>).mockResolvedValue([[]]);

      const response = await request(app).get("/api/reports/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Report not found" });
    });

    test("should handle database errors", async () => {
      (pool.query as jest.Mock<any>).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).get("/api/reports/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Internal server error" });
    });

    test("should use cached results if available", async () => {
      const mockReport = {
        id: 1,
        patientName: "John Smith",
        date: "2023-01-15",
        summary: "Patient showing signs of tachycardia",
        hasTachycardia: true,
        hasArrhythmia: false,
      };

      // Set up the cache with data
      cache.set("report_1", mockReport);

      const response = await request(app).get("/api/reports/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReport);
      // Query should not be called if cache is hit
      expect(pool.query).not.toHaveBeenCalled();
    });
  });
});
