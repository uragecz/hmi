export default function reducer(state = {
    isShiftActive: true,
    group: 0,
    unit: 1,
    shift: 0,
    article: 0,
    minUnit: 0,
    maxUnit: 0,
    unitStep: 0,
    activeItem: "group",
    groupList: ["PB1","PB2","PB3"],
    shiftList:[["1","Smena1","7:00","15:30","27.7"],["2","Smena2","15:30","21:30","27.7"]],
    articleList:["Perla a.s CZ, Bavlna, 22Text, 5,5Tex", "Article2 CZ UNO","Article3 EN UNO"]
}, action){
    switch(action.type){
        case "SWICH_GROUP" :{
            return { ...state, group: (state.group < 0) || (state.group >= state.groupList.length) ? store.group : action.payload}
        }
        case "SWITCH_UNIT" :{
            return { ...state, unit: action.payload}
        }
        case "SWITCH_SHIFT" :{
            return { ...state, shift: (state.shift < 0) || (state.shift >= state.shiftList.length) ? store.shift : action.payload}
        }
        case "SWITCH_ARTICLE" :{
            return { ...state, article: (state.article < 0) || (state.article >= state.articleList.length) ? store.article : action.payload} 
        }
        case "SET_GROUPS" :{
            return { ...state, groupList: action.payload }
        }
        case "SET_SHIFTS" :{
            return { ...state, shiftList: action.payload}
        }
        case "SET_ARTICLES" :{
            return { ...state, articleList: action.payload}
        }
        case "SET_ACTIVE_ITEM" :{
            return { ...state, activeItem: action.payload}
        }
        case "SET_SHIFT_ACTIVE" :{
            return { ...state, isShiftActive: !state.isShiftActive}
        }
        default:
            break;
    }
    return state;
}