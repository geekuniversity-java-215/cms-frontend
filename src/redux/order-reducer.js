import {orderAPI} from "../api/api";
import React from "react";
import {ordersAPI} from "../api/apiJRPC";
import {api_wrapper} from "../api/api_wrapper";

const SET_CURRENT_COSTS = 'SET_CURRENT_COSTS';
const SET_CURRENT_PARAMETERS = 'SET_CURRENT_PARAMETERS';

const getCurrentParameters = () => {
    if (localStorage.getItem('params') === null) {
        return {
            Mass: null,
            Length: null,
            Width: null,
            Height: null,
            RegionA: null,
            CityA: null,
            StreetA: null,
            BuildingA: null,
            BlockA: null,
            FlatA: null,
            FloorA: null,
            IntercomA: null,
            RegionB: null,
            CityB: null,
            StreetB: null,
            BuildingB: null,
            BlockB: null,
            FlatB: null,
            FloorB: null,
            IntercomB: null,
            Phone: null,
            Comments: null
        }
    } else {
        return JSON.parse(localStorage.getItem('params'));
    }
};


let initialState = {
        baseCost: null,
        fragile: null,
        urgent: null,
        full: null,
        params: getCurrentParameters()

    };

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_COSTS:
            return {
                ...state,
                ...action.payload,
            };
        case SET_CURRENT_PARAMETERS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};


export const order = (params) => (dispatch) => {
    let promise = new Promise((resolve) => {
        resolve(localStorage.setItem('params', JSON.stringify(params)))}
    );
    return promise
        // .then(ordersAPI.saveOrder(params)
        .then(()=>api_wrapper('ordersAPI.saveOrder',{params}))
        .then(response => {
                let {baseCost, fragile, urgent, full} = response.data;
                dispatch(setCurrentPrices(baseCost, fragile, urgent, full))

        })
};


export const setCurrentPrices = (baseCost, fragile, urgent, full) => ({
    type: SET_CURRENT_COSTS, payload:
        {baseCost, fragile, urgent, full}
});

export const confirmOrder = (isFragile, isUrgent, finalCost) => {
    orderAPI.confirm(isFragile, isUrgent, finalCost)
        .then(response => {
            if (response.status === 200) {
                console.log(response.data);
            }
        });

};


export default orderReducer;