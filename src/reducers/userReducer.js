export default function reducer (state ={
    loggedUser: null
}, action){
    switch(action.type){
        case "LOGIN" :{
            return { ...state, loggedUser: action.payload}
        }
        case "LOGOUT" :{
            return { ...state, loggedUser: null}
        }
        default:
            break;
    }
    return state;
}