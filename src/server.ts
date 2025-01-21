import { app } from './app';
import { BackupService } from './services/backup.service'

const backupService = new BackupService()

const PORT = process.env.PORT || 3000;

// Daily backup
setInterval(() => {
    backupService.createBackup()
}, 24 * 60 * 60 * 1000)

// Backup on startup
backupService.createBackup()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






