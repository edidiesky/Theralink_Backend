import { Request, Response } from "express";
import prisma from "../config/database";
import { IIAppointment } from "../interfaces/IAppointment.interfaces";

export class IAppointmentController {
  async createIAppointment(req: Request<{}, {}, IIAppointment>, res: Response) {
    try {
      const { email, dateOfBirth, ...rest } = req.body;

      const newIAppointment = await prisma.IAppointment.create({
        data: {
          ...rest,
          email,
          dateOfBirth: new Date(dateOfBirth),
        },
      });

      return res.status(201).json({
        message: "IAppointment created successfully",
        IAppointment: newIAppointment,
      });
    } catch (error) {
      console.error("Create IAppointment error:", error);
      return res.status(500).json({ error: "Failed to create IAppointment" });
    }
  }

  async getIAppointments(_req: Request, res: Response) {
    try {
      const IAppointments = await prisma.IAppointment.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ IAppointments });
    } catch (error) {
      console.error("Get IAppointments error:", error);
      return res.status(500).json({ error: "Failed to fetch IAppointments" });
    }
  }

  async getIAppointmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const IAppointment = await prisma.IAppointment.findUnique({
        where: { id },
      });

      if (!IAppointment) {
        return res.status(404).json({ error: "IAppointment not found" });
      }

      return res.status(200).json({ IAppointment });
    } catch (error) {
      console.error("Get IAppointment error:", error);
      return res.status(500).json({ error: "Failed to fetch IAppointment" });
    }
  }

  async updateIAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { dateOfBirth, ...rest } = req.body;

      const IAppointment = await prisma.IAppointment.update({
        where: { id },
        data: {
          ...rest,
          dateOfBirth: new Date(dateOfBirth),
        },
      });

      return res.status(200).json({
        message: "IAppointment updated successfully",
        IAppointment,
      });
    } catch (error) {
      console.error("Update IAppointment error:", error);
      return res.status(500).json({ error: "Failed to update IAppointment" });
    }
  }

  async deleteIAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.IAppointment.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "IAppointment deleted successfully",
      });
    } catch (error) {
      console.error("Delete IAppointment error:", error);
      return res.status(500).json({ error: "Failed to delete IAppointment" });
    }
  }
}
