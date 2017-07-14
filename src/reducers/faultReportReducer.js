export default function reducer(state={
    cuts: {
        "SUM": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "N": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "S": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "L": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "T": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "SL+": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "SL-": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "C+": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "C-": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "MO": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "P+": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "P-": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        }
    },
    qualityValues:{
        "CVopt":{

        },
        "RV":{

        },
        "IPI nepis":{

        },
        "IPI thick":{

        },
        "IPI thin":{

        },
    },
    qAlarms:{
        "SUM":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "CVopt-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "IPI-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        }
    },
    yAlarms:{
        "SUM":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "NSLT-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "SL-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "MO-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        }
    },
    techAlarms:{
        "Ref-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
    }
}, action) {
    switch(action.type){
        case "SET_CUTS" :{
            return { ...state, cuts: action.payload}
        }
        case "SET_Q_ALARMS" :{
            return { ...state, qAlarms: action.payload}
        }
        case "SET_Y_ALARMS" :{
            return { ...state, yAlarms: action.payload}
        }
        case "SET_QUALITY_VALUES" :{
            return { ...state, qualityValues: action.payload}
        }
        case "SET_TECH_ALARMS" :{
            return { ...state, techAlarms: action.payload}
        }
        default:
            break;
    }
    return state;
}