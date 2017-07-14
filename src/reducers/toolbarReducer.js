export default function reducer(state= {
    activeTab: 0,
    openTabs: []
}, action){
    switch(action.type){
        case "ADD_TAB" :{
            return {
                ...state,
                openTabs: [...state.openTabs, action.payload],
                activeTab: state.openTabs.length -1
            }
        }
        case "CLOSE_TAB" :{
            return{
                ...state,
                openTabs: openTabs.filter((t, index) => index !== action.payload),
                activeTab: state.activeTab === action.payload ? state.activeTab : (state.activeTab - 1) < 0 ? 0 : state.activeTab -1 
            }
        }
        case "CHANGE_TAB" :{
            return{
                ...state,
                openTabs: state.openTabs.map((t, index) => {index === state.activeTab ? action.payload: t})
            }
        }
        case "CHANGE_ACTIVE_TAB" :{
            return { 
                ...state,
                 activeTab: action.payload
            }
        }
    }
    return state;
}