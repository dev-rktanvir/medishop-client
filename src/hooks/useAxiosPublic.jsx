import axios from 'axios';
import React from 'react';
const axiosPubic = axios.create({
    baseURL: `http://localhost:5000`
})
const useAxiosPublic = () => {
    return axiosPubic;
};

export default useAxiosPublic;