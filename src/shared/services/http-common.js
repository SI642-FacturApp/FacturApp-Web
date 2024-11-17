import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost:3000/api/v1",
});

http.defaults.headers.common['Content-Type'] = 'application/json';
http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default http;