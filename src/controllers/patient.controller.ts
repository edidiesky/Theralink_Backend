import { Request, Response } from "express";
import prisma from "../config/database";
import { IPatient } from "../interfaces/patient.interfaces";

export class PatientController {
  async createPatient(req: Request<{}, {}, IPatient>, res: Response) {
    try {
      const { email, dateOfBirth, ...rest } = req.body;
   
      const newPatient = await prisma.patient.create({
        data: {
          ...rest,
          email,
          dateOfBirth: new Date(dateOfBirth),
        },
      });

      return res.status(201).json({
        message: "Patient created successfully",
        patient: newPatient,
      });
    } catch (error) {
      console.error("Create patient error:", error);
      return res.status(500).json({ error: "Failed to create patient" });
    }
  }

  async getPatients(_req: Request, res: Response) {
    try {
      const patients = await prisma.patient.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ patients });
    } catch (error) {
      console.error("Get patients error:", error);
      return res.status(500).json({ error: "Failed to fetch patients" });
    }
  }

  async getPatientById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const patient = await prisma.patient.findUnique({
        where: { id },
      });

      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      return res.status(200).json({ patient });
    } catch (error) {
      console.error("Get patient error:", error);
      return res.status(500).json({ error: "Failed to fetch patient" });
    }
  }

  async updatePatient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { dateOfBirth, ...rest } = req.body;

      const patient = await prisma.patient.update({
        where: { id },
        data: {
          ...rest,
          dateOfBirth: new Date(dateOfBirth),
        },
      });

      return res.status(200).json({
        message: "Patient updated successfully",
        patient,
      });
    } catch (error) {
      console.error("Update patient error:", error);
      return res.status(500).json({ error: "Failed to update patient" });
    }
  }

  async deletePatient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.patient.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Patient deleted successfully",
      });
    } catch (error) {
      console.error("Delete patient error:", error);
      return res.status(500).json({ error: "Failed to delete patient" });
    }
  }
}
