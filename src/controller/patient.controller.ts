import { Request, Response } from "express"
import { Patient } from "../interface/patient"
import { connection } from "../config/mysql.config"
import { QUERY } from "../query/patient.query"
import { Code } from "../enum/code.enum"
import { HttpResponse } from "../domain/response"
import { Status } from "../enum/status.enum"
import { FieldPacket, OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";

type ResultSet = [OkPacket | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket, FieldPacket[]];

export const getPatients = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`)
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_PATIENTS);  
        return res
            .status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Patients retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error)
        return res
            .status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}

export const createPatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`)
    let patient: Patient = { ...req.body }
    try {
        const pool = await connection();    
        const result: ResultSet = await pool.query(QUERY.CREATE_PATIENT, Object.values(patient));
        patient = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res
            .status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Patient created', patient));
    } catch (error: unknown) {
        console.error(error)
        return res
            .status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}