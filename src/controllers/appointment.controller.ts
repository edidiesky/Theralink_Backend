import { Request, Response } from "express";
import prisma from "../config/database";
import { IAppointment } from "../interfaces/appointment.interfaces";
import { IUser } from "src/interfaces/auth.interfaces";

export class AppointmentController {
  async createAppointment(req: Request<{}, {}, IAppointment>, res: Response) {
    try {
      const { date, status, patientid, ...rest } = req.body;
      const user = req.user as IUser | undefined;

      // Checking if there's an existing appointment at the same time for the same healthcare provider
      const conflictingAppointment = await prisma.appointment.findFirst({
        where: {
          healthcareProviderId: user?.id,
          date: date,
        },
      });

      if (conflictingAppointment) {
        return res.status(400).json({
          error:
            "The healthcare provider is already booked at this time. Please choose another time.",
        });
      }

      const newAppointment = await prisma.appointment.create({
        data: {
          ...rest,
          date,
          status,
          patient: {
            connect: { id: patientid },
          },
          healthcareProvider: {
            connect: { id: user?.id },
          },
        },
      });

      return res.status(201).json({
        message: "Appointment created successfully",
        appointment: newAppointment,
      });
    } catch (error) {
      console.error("Create Appointment error:", error);
      return res.status(500).json({ error: "Failed to create Appointment" });
    }
  }

  async getAppointments(req: Request, res: Response) {
    const user = req.user as IUser | undefined;
    const { page = "1", limit = "10" } = req.query;

    const parsedPage = Math.max(1, parseInt(page as string, 10));
    const parsedLimit = Math.max(1, parseInt(limit as string, 10));
    try {
      const Appointments = await prisma.appointment.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          healthcareProviderId: user?.id,
        },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });
      const totalCount = await prisma.appointment.count({
        where: { healthcareProviderId: user?.id },
      });
      return res
        .status(200)
        .json({
          totalCount,
          totalPages: Math.ceil(totalCount / parsedLimit),
          currentPage: parsedPage,
          Appointments,
        });
    } catch (error) {
      console.error("Get Appointments error:", error);
      return res.status(500).json({ error: "Failed to fetch Appointments" });
    }
  }

  async getAppointmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const Appointment = await prisma.appointment.findUnique({
        where: { id },
      });

      if (!Appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      return res.status(200).json({ Appointment });
    } catch (error) {
      console.error("Get Appointment error:", error);
      return res.status(500).json({ error: "Failed to fetch Appointment" });
    }
  }

  async updateAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { dateOfBirth, ...rest } = req.body;
      const user = req.user as IUser | undefined;
      const Appointment = await prisma.appointment.update({
        where: { id, healthcareProviderId: user?.id },
        data: {
          ...rest,
          dateOfBirth: new Date(dateOfBirth),
        },
      });

      return res.status(200).json({
        message: "Appointment updated successfully",
        Appointment,
      });
    } catch (error) {
      console.error("Update Appointment error:", error);
      return res.status(500).json({ error: "Failed to update Appointment" });
    }
  }

  async deleteAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.appointment.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      console.error("Delete Appointment error:", error);
      return res.status(500).json({ error: "Failed to delete Appointment" });
    }
  }
}
