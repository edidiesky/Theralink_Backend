import { Request, Response } from "express";
import prisma from "../config/database";
import { IIntakeForm } from "../interfaces/intakeform.interfaces";
import { IUser } from "src/interfaces/auth.interfaces";

export class IntakeFormController {
  async createIntakeForm(req: Request<{}, {}, IIntakeForm>, res: Response) {
    try {
      const user = req.user as IUser | undefined;

      const newIntakeForm = await prisma.intakeForm.create({
        data: {
          ...req.body,
          patient: {
            connect: { id: user?.id },
          },
        },
      });

      return res.status(201).json({
        message: "IntakeForm created successfully",
        IntakeForm: newIntakeForm,
      });
    } catch (error) {
      console.error("Create IntakeForm error:", error);
      return res.status(500).json({ error: "Failed to create IntakeForm" });
    }
  }

  async getIntakeForms(req: Request, res: Response) {
    const user = req.user as IUser | undefined;
    try {
      const IntakeForms = await prisma.intakeForm.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          patientId: user?.id,
        },
      });
      return res.status(200).json({ IntakeForms });
    } catch (error) {
      console.error("Get IntakeForms error:", error);
      return res.status(500).json({ error: "Failed to fetch IntakeForms" });
    }
  }

  async getIntakeFormById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const IntakeForm = await prisma.intakeForm.findUnique({
        where: { id },
      });

      if (!IntakeForm) {
        return res.status(404).json({ error: "IntakeForm not found" });
      }

      return res.status(200).json({ IntakeForm });
    } catch (error) {
      console.error("Get IntakeForm error:", error);
      return res.status(500).json({ error: "Failed to fetch IntakeForm" });
    }
  }

  async updateIntakeForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { dateOfBirth, ...rest } = req.body;
      const user = req.user as IUser | undefined;
      const IntakeForm = await prisma.intakeForm.update({
        where: { id, patientId: user?.id },
        data: {
          ...rest,
          dateOfBirth: new Date(dateOfBirth),
        },
      });

      return res.status(200).json({
        message: "IntakeForm updated successfully",
        IntakeForm,
      });
    } catch (error) {
      console.error("Update IntakeForm error:", error);
      return res.status(500).json({ error: "Failed to update IntakeForm" });
    }
  }

  async deleteIntakeForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.intakeForm.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "IntakeForm deleted successfully",
      });
    } catch (error) {
      console.error("Delete IntakeForm error:", error);
      return res.status(500).json({ error: "Failed to delete IntakeForm" });
    }
  }
}
