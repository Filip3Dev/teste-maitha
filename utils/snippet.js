const axios = require('axios').default;

const KEY_ACESS = 'f2e25c3a';

const BASE_URL = `https://api.hgbrasil.com/weather?key=${KEY_ACESS}&city_name=`;

exports.get = async (payload) => {
    try {
        const response = await axios.get(`${BASE_URL}${payload}`);
        return response.data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
}