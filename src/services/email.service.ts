import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Verify connection
        this.transporter.verify((error) => {
            if (error) {
                console.log('SMTP Error:', error);
            } else {
                console.log('SMTP Server ready');
            }
        });
    }

    async sendCredentials(email: string, username: string, password: string): Promise<void> {
        try {
            console.log('Starting email send process...');
            const templatePath = path.join(__dirname, '../templates/credentials.hbs');
            console.log('Template path:', templatePath);
            
            const source = fs.readFileSync(templatePath, 'utf-8');
            const template = handlebars.compile(source);
            
            const html = template({
                username,
                password
            });

            const result = await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: 'Your Theralink Account Credentials',
                html
            });
            
            console.log('Email sent:', result);
        } catch (error) {
            console.error('Email sending failed:', error);
            throw error;
        }
    }

    async sendPasswordReset(email: string, token: string): Promise<void> {
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        
        const templatePath = path.join(__dirname, '../templates/reset-password.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const template = handlebars.compile(source);
        
        const html = template({ resetLink });
    
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Reset Your Theralink Password',
            html
        });
    }

    async sendPasswordChangeConfirmation(email: string): Promise<void> {
        const templatePath = path.join(__dirname, '../templates/password-changed.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const template = handlebars.compile(source);
        
        const html = template({
            supportUrl: `${process.env.FRONTEND_URL}/support`
        });
    
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Your Theralink Password Has Been Changed',
            html
        });
    }
    
    
}
