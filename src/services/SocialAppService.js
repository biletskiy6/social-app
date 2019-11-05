import React from 'react';
import axios from 'axios';

class SocialAppService {
    _apiBase = "http://localhost:5000/social-app-a755b/europe-west1/api";

    getResource = async (url) => {
        const response = await axios.get(`${this._apiBase}${url}`);
        if (response.status !== 200) {
            throw new Error(`Erorr: ${response.statusText}`);
        }
        return response.data;
    }
    postRequest = async (url, data) => {
        return axios.post(`${this._apiBase}${url}`, data);
    }

    getPosts = async () => {
        return this.getResource("/posts");
    }

    userLogin = (data) => {
        return this.postRequest('/login', data);
    };

    userSignup = (data) => {
        return this.postRequest('/signup', data);
    };

    getUserData = () => {
        return this.getResource('/user');
    }

    uploadImage = (data) => {
        return this.postRequest('/user/image', data);
    }

    updateUserData = (data) => {
        return this.postRequest('/user', data);
    }

    likePost = (postId) => {
        return this.getResource(`/post/${postId}/like`);
    }

    unlikePost = (postId) => {
        return this.getResource(`/post/${postId}/unlike`);
    }

}

export default SocialAppService;
