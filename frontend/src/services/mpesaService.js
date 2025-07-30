// src/services/mpesaService.js
import axios from "axios";
import { API_URL } from "../config";

export const initiateStkPush = async ({ phone, amount }) => {
    const res = await axios.post(`${API_URL}/mpesa/stk`,
        { phone, amount },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    return res.data;
};
