import "dotenv/config";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";
import pool from "../src/config/db.js";

const rl = readline.createInterface({ input: stdin, output: stdout });

function readHiddenPassword(prompt) {
    return new Promise((resolve) => {
        stdout.write(prompt);
        if (stdin.isTTY && typeof stdin.setRawMode === "function") {
            stdin.setRawMode(true);
            let password = "";

            const onData = (chunk) => {
                for (const char of chunk.toString()) {
                    if (char === "\u0003") {
                        stdin.setRawMode(false);
                        stdin.off("data", onData);
                        stdout.write("\n");
                        process.exit(130);
                    } else if (char === "\r" || char === "\n") {
                        stdin.setRawMode(false);
                        stdin.off("data", onData);
                        stdout.write("\n");
                        resolve(password);
                    } else if (char === "\u007f" || char === "\b") {
                        password = password.slice(0, -1);
                    } else {
                        password += char;
                    }
                }
            };
            stdin.on("data", onData);
            stdin.resume();
        } else {
            rl.question("").then(resolve);
        }
    });
}

async function main() {
    const name = (await rl.question("Admin name: ")).trim();
    const email = (await rl.question("Admin college email: "))
        .trim()
        .toLowerCase();
    const allowedEmailPattern =
        /^[a-zA-Z0-9._%+-]+\.(24|25)@bitmesra\.ac\.in$/i;
    if (!name || !allowedEmailPattern.test(email)) {
        throw new Error(
            "Enter a name and an approved BIT Mesra email ending in .24@bitmesra.ac.in or .25@bitmesra.ac.in"
        );
    }
    const existing = await pool.query(
        "SELECT 1 FROM public.admins WHERE college_email = $1",
        [email]
    );
    if (existing.rowCount > 0) {
        console.log("This email already exists. No changes made.");
        return;
    }
    const password = await readHiddenPassword("Admin password (hidden): ");
    if (password.length < 12) {
        throw new Error("Password must be at least 12 characters.");
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(
        `INSERT INTO public.admins
       (name, college_email, password_hash, role, is_active)
     VALUES ($1, $2, $3, 'admin', TRUE)
     ON CONFLICT (college_email) DO NOTHING
     RETURNING id, name, college_email, role, is_active`,
        [name, email, passwordHash]
    );
    if (result.rowCount === 0) {
        console.log("This email already exists. No changes made.");
    } else {
        console.log("Admin created successfully:", result.rows[0]);
    }
}
try {
    await main();
} catch (error) {
    console.error("Admin seeding failed:", error.message);
    process.exitCode = 1;
} finally {
    rl.close();
    await pool.end();
}
