const os = require('os');
const { exec } = require('child_process');

function getCpuLoad() {
    const cpus = os.cpus();
    let idle = 0, total = 0;

    cpus.forEach(cpu => {
        for (let type in cpu.times) total += cpu.times[type];
        idle += cpu.times.idle;
    });

    return 1 - idle / total;
}

setInterval(() => {
    const usage = getCpuLoad();
    if (usage > 0.7) {
        console.log('High CPU detected. Restarting...');
        exec('pm2 restart app');
    }
}, 10000);
