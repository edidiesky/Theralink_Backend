import { Request, Response } from "express";
import prisma from "../config/database";
import { IAppointment } from "../interfaces/appointment.interfaces";

export class IAppointmentController {
  async createIAppointment(req: Request<{}, {}, IAppointment>, res: Response) {
    try {
      const { date, status, ...rest } = req.body;

      const newIAppointment = await prisma.appointment.create({
        data: {
          ...rest,
          date,
          status
        },
      });

      return res.status(201).json({
        message: "Appointment created successfully",
        appointment: newIAppointment,
      });
    } catch (error) {
      console.error("Create IAppointment error:", error);
      return res.status(500).json({ error: "Failed to create IAppointment" });
    }
  }

  async getIAppointments(_req: Request, res: Response) {
    try {
      const IAppointments = await prisma.appointment.findMany({
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
      const IAppointment = await prisma.appointment.findUnique({
        where: { id },
      });

      if (!IAppointment) {
        return res.status(404).json({ error: "Appointment not found" });
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

      const IAppointment = await prisma.appointment.update({
        where: { id },
        data: {
          ...rest,
          dateOfBirth: new Date(dateOfBirth),
        },
      });

      return res.status(200).json({
        message: "Appointment updated successfully",
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
      await prisma.appointment.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      console.error("Delete IAppointment error:", error);
      return res.status(500).json({ error: "Failed to delete IAppointment" });
    }
  }
}
