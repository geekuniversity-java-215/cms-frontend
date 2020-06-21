import * as axios from "axios";


let request = (id, method, params) => {
    return {
        jsonrpc: "2.0",
        id: id,
        method: method,
        params
    }
};

const instance = axios.create({
    baseURL: "http://31.210.208.189:8080/api/1.0/"
});

export const ordersAPI = {
    saveOrder(id, localParams) {
        let params = {
            id: null,
            enabled: null,
            created: null,
            updated: null,
            client:{
                id:1,
                enabled:true,
                created:"2020-06-03T18:59:09.276Z",
                updated:"2020-06-03T18:59:09.276Z",
                user:{
                    id:5,
                    enabled:true,
                    created:"2020-06-03T18:59:09.170Z",
                    updated:"2020-06-03T18:59:09.170Z",
                    username:"client",
                    password:"{bcrypt}$2a$10$NcoVN2x6yImgnFOGvwoOBOwfEppUJFzqWkdm6upZ1VKgyacq4gIHq",
                    roles:[{
                        id:7,
                        enabled:true,
                        created:"2020-06-03T18:29:16.974Z",
                        updated:"2020-06-03T18:29:16.974Z",
                        name:"ROLE_CLIENT"

                    },
                        {
                            id:2,
                            enabled:true,
                            created:"2020-06-03T18:29:16.969Z",
                            updated:"2020-06-03T18:29:16.969Z",
                            name:"ROLE_USER"

                        }
                    ],
                    firstName:"Клиент",
                    lastName:"Клиентович",
                    email:"client@mail.ru",
                    phoneNumber:"4358789567568",
                    payPalEmail:null,
                    account:null,
                    client:null,
                    courier:null
                },
                clientSpecificData:"Client-Client-Client"
            },
            courier: null,
            from:{
                id:null,
                enabled:null,
                created:null,
                updated: null,
                city: localParams.CityA,
                street: localParams.StreetA,
                house: localParams.BuildingA,
                building: localParams.BlockA,
                flat: localParams.FlatA,
                longitude: null,
                latitude: null
            },
            to:{
                id:null,
                enabled:null,
                created:null,
                updated: null,
                city: localParams.CityB,
                street: localParams.StreetB,
                house: localParams.BuildingB,
                building: localParams.BlockB,
                flat: localParams.FlatB,
                longitude: null,
                latitude: null
            },
            status: "NEW"
        };
        return instance.post('', request(id, 'cmsapp.core.order.client.save', {params}), {})
    },

    // create(Mass, Length, Width, Height,
    //        RegionA, CityA, StreetA, BuildingA,
    //        BlockA, FlatA, FloorA, IntercomA,
    //        RegionB, CityB, StreetB, BuildingB,
    //        BlockB, FlatB, FloorB, IntercomB,
    //        Phone, Comments) {
    //     return instance.post('order', {
    //         Mass, Length, Width, Height,
    //         RegionA, CityA, StreetA, BuildingA,
    //         BlockA, FlatA, FloorA, IntercomA,
    //         RegionB, CityB, StreetB, BuildingB,
    //         BlockB, FlatB, FloorB, IntercomB,
    //         Phone, Comments
    //     })
    // },
    confirm(isFragile, isUrgent, finalCost) {
        return instance.post('order_confirm', {
            isFragile, isUrgent, finalCost
        })
    }
};

export const accountAPI = {
    takeMoney(transferAccount, loginPayPal) {
        return instance.post('', {transferAccount, loginPayPal}, {})
    }
};

export const usersAPI = {
   getCurrentUser(id, accessToken){
       let auth = 'Bearer ' + accessToken;
       return instance.post(null, request(id, 'cmsapp.core.user.getCurrent', null), {headers: {Authorization: auth}})
   },
    makeClient(id, accessToken) {
        let auth = 'Bearer ' + accessToken;
        return instance.post(null, request(id, 'cmsapp.core.user.makeClient', null), {headers: {Authorization: auth}})
    },
    makeCourier(id, accessToken) {
        let auth = 'Bearer ' + accessToken;
        return instance.post(null, request(id, 'cmsapp.core.user.makeCourier', null), {headers: {Authorization: auth}})
    }
};