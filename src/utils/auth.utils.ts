import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/auth.interfaces';
import crypto from 'crypto';


export const generateUsername = (email: string): string => {
    const prefix = email.split('@')[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ''); // Remove special characters
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 5);
    return `${prefix}_${timestamp}${random}`;
};

export const generatePassword = (): string => {
    const length = 12;
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const allChars = lowercase + uppercase + numbers + symbols;

    // Ensure at least one of each character type
    let password = 
        lowercase[Math.floor(Math.random() * lowercase.length)] +
        uppercase[Math.floor(Math.random() * uppercase.length)] +
        numbers[Math.floor(Math.random() * numbers.length)] +
        symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    // Shuffle the password
    return password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
};

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(12); // Increased from 10 to 12 for better security
    return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
    password: string, 
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: IUser): string => {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email,
            role: user.role 
        },
        process.env.JWT_SECRET!,
        { 
            expiresIn: '24h',
            algorithm: 'HS256'
        }
    );
};

// Add to existing auth.utils.ts
export const generateResetToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
};
