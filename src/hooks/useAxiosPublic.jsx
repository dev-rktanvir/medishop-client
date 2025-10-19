import axios from 'axios';
import React from 'react';
const axiosPubic = axios.create({
    baseURL: `https://medishop-server-xi.vercel.app`
})
const useAxiosPublic = () => {
    return axiosPubic;
};

export default useAxiosPublic;