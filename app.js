import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/pnl-data', (req, res) => {
    // This is where you would fetch data from your database or other data source
    const pnlData = [
        { value: 100, date: '2023-05-01', status: 'Profit' },
        { value: -50, date: '2023-05-02', status: 'Loss' },
        // ... more data ...
    ];
    res.json(pnlData);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});