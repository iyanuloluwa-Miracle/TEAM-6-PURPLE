const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './blackList.json');

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}