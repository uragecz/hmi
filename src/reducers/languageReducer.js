export default function reducer(state ={
    data: content.filter(obj => obj.lang === 'eng')[0]
}, action) {
    switch(action.type){
        case "SWITCH_LANGUAGE" :{
            return { ...state, data: action.payload }
        }
        default:
            break;
    }
    return state;
}