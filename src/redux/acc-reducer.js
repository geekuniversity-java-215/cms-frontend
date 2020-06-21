const SET_TRANSFER = 'SET_TRANSFER';

let initialState = {
    currentAccount: 100,
    freezeAccount: 0,
    transferAccount: 0,
    loginPayPal: null,
    transactions: [
        {
            id: 0,
            createdDate: "05-05-2020-13:00:54",
            executionDate: "15-05-2020-13:00:54",
            amount: "500 р.",
            type: "Пополнение"
        }, {
            id: 1,
            createdDate: "06-05-2020-13:00:54",
            executionDate: "15-05-2020-13:00:55",
            amount: "800 р.",
            type: "Пополнение"
        }, {
            id: 2,
            createdDate: "07-05-2020-13:00:54",
            executionDate: "15-05-2020-13:00:55",
            amount: "1300 р.",
            type: "Вывод"
        }, {
            id: 3,
            createdDate: "08-05-2020-13:00:54",
            executionDate: "15-05-2020-13:00:56",
            amount: "100 р.",
            type: "Вывод"
        }]
};

const accReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSFER:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const setTransfer = (transfer, loginPayPal) => (dispatch) => {
    dispatch(setTransferAccount(transfer, loginPayPal))
    //api_wrapper('accountAPI.takeMoney', {transfer, loginPayPal})
};

const setTransferAccount = (transferAccount, loginPayPal) => ({
    type: SET_TRANSFER, payload:
        {transferAccount, loginPayPal}
});


export default accReducer;