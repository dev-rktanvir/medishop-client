import axios from 'axios';
import React from 'react';
const axiousSecure = axios.create({
    baseURL: `https://medishop-server-xi.vercel.app`
})
const useAxiosSecure = () => {
    return axiousSecure;
};

export default useAxiosSecure;