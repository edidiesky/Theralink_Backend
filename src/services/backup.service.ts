import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

export class BackupService {
    private prisma: PrismaClient
    private backupDir: string

    constructor() {
        this.prisma = new PrismaClient()
        this.backupDir = path.join(__dirname, '../../backups')
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir)
        }
    }

    async createBackup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        const users = await this.prisma.user.findMany()
        
        const backup = {
            timestamp,
            data: users
        }

        fs.writeFileSync(
            path.join(this.backupDir, `backup-${timestamp}.json`),
            JSON.stringify(backup, null, 2)
        )
    }
}
