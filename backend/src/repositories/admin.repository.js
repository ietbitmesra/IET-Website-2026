import pool from "../config/db.js";
export async function findAdminByEmail(email) {
    const result = await pool.query(
        `SELECT id, name, college_email, password_hash, role, is_active
     FROM public.admins
     WHERE LOWER(college_email) = LOWER($1)
     LIMIT 1`,
        [email.trim()]
    );

    return result.rows[0] ?? null;
}

export async function findActiveAdminById(id) {
    const result = await pool.query(
        `SELECT id, name, college_email, role, is_active
     FROM public.admins
     WHERE id = $1 AND is_active = TRUE
     LIMIT 1`,
        [id]
    );

    return result.rows[0] ?? null;
}
