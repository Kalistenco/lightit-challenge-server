"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY created_at DESC LIMIT 50',
    CREATE_PATIENT: 'INSERT INTO patients (first_name, last_name, email, address, phone, image_url) VALUES(?, ?, ?, ?, ?, ?)'
};
