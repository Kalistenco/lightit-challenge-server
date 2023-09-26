export const QUERY = {
    SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY created_at DESC LIMIT 50',
    CREATE_PATIENT: 'INSERT INTO patients (name, email, address, phone) VALUES(?, ?, ?, ?)'
}