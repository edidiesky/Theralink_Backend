import { Request, Response } from "express";
import prisma from "../config/database";

export class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      // pagination
      //   request queries
      const { username, limit = "9", page = "1" } = req.query;

      const parsedLimit = Number(limit) || 9;
      const parsedPage = Number(page) || 1;
      const usernameFilter =
        typeof username === "string" ? { username } : undefined;
      //   queryObject
      const queryObject = {
        ...usernameFilter,
      };
      const user = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        where: queryObject,
        skip: (parsedPage - 1) * parsedLimit,
      });
      return res.status(200).json({ user });
    } catch (error) {
      console.error("Get Users error:", error);
      return res.status(500).json({ error: "Failed to fetch Users" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error("Get user error:", error);
      return res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userExist = await prisma.user.findUnique({
        where: { id },
      });

      if (!userExist) {
        return res.status(404).json({ error: "User not found" });
      }
      const user = await prisma.user.update({
        where: { id },
        data: {
          ...req.body,
        },
      });

      return res.status(200).json({
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      console.error("Update User error:", error);
      return res.status(500).json({ error: "Failed to update User" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      //   fimd the user
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await prisma.user.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      return res.status(500).json({ error: "Failed to delete user" });
    }
  }
}
