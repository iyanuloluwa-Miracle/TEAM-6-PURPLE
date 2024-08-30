const axios = require('axios');
const env = require('dotenv').config()

/* const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow': '*',
    'Authorizaton': `Bearer ${process.env.API_KEY}`
}; */
const headers = {
    'Content-Type': 'application/json',
};
const payload = {
    username: process.env.API_USER,
    password: process.env.API_PASSWORD
};
let makcorpsUrl = `https://api.makcorps.com/free` // 
let url = `https://api.makcorps.com/auth`;

const get = async () => {
    try {
        const response = await axios.post(url, payload, { headers: headers })
        console.log(response, 'response:');
        return response;

    } catch (e) {
        console.log(e, 'error returns:');
    }
}

module.exports = {
    get
}