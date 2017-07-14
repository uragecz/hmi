export default function reducer(state= {
    visitedLinks: []
}, action){
    switch (action.type) {
        case "ADD_LINK" :{
            return {
                ...state,
                visitedLinks: [action.payload, ...state.visitedLinks.filter(l => l.name !== action.payload.name)].slice(0,5),
            }
        }
        default :
            break;
        }
    return state;
}