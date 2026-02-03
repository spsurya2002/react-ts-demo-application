import type { Request, Response } from "express";

export async function magicNum(req: Request, res: Response) {
  try {
    const num = Math.floor(Math.random() * 100);
    res.status(200).json({ magicNumber: { num } });
  } catch (error) {
    console.error("Error in generating magic number:", error);
    res.status(500).json({ error: "Failed generating magic number" });
  }
}
