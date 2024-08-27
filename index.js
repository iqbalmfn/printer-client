const Pusher = require('pusher-js');

// Konfigurasi Pusher
const pusher = new Pusher('42e50566de314da758c1', {
    cluster: 'ap1',
    forceTLS: true
});

// Buat channel dan bind event
const channel = pusher.subscribe('siolin');
channel.bind('print-antrian', (data) => {
    console.log(`Received event with data:`, data);
    
    const { url } = data;
    if (url) {
        runElectron(url);
    }
});

// Path ke direktori proyek Electron
const projectPath = 'D:/JAVASCRIPT/electron-printer';

// Fungsi untuk menjalankan perintah Electron
const runElectron = (url) => {
    const { exec } = require('child_process');
    const command = `cd /d "${projectPath}" && electron . "${url}" 2>&1`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting Electron: ${stderr}`);
            return;
        }
        console.log(`Electron started with URL: ${url}`);
        console.log(`Output: ${stdout}`);
    });
};

console.log('Listening for Pusher events...');
