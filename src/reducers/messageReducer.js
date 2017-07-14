export default function reducer(state = {
    message: '',
    error: false
}, action){
    switch(action.type){
        case "SHOW_MESSAGE":{
            return {...state, message: action.payload, error: true}
        }
        case "HIDE_MESSAGE":{
            return {...state, error: false}
        }
        default:
            break;
    }
    return state;
}