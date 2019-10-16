import React from 'react';
import axios from 'axios';

class SocialAppService {
    _apiBase = "https://jsonplaceholder.typicode.com";

    getResource = async (url) => {
        const response = await axios.get(`${this._apiBase}${url}`);
        if (response.status !== 200) {
            throw new Error(`Erorr: ${response.statusText}`);
        }
        return response.data;
    }

    getPosts = async () => {
        return this.getResource("/posts");
    }

}

export default SocialAppService;