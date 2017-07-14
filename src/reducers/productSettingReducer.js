export default function reducer(state ={
    totalSpeed: {
        alfaTex:        {value: 0, unit: "alfa-tex"},
        twist:          {value: 0, unit: "T/m"},
        deliverySpeed:  {value: 0, unit: "m/min"},
        draft:          {value: 0, unit: "-"},
        feedingSpeed:   {value: 0, unit: "m/min"},
        rotorSpeed:     {value: 0, unit: "1/min"},
        openningRoller: {value: 0, unit: ""},
        speed:          {value: 0, unit: "1/min"}
    },
    package: {
        targetLength:           {value: 0, unit: "m"},
        targetWeight:           {value: 0, unit: "kg"},
        deltaLength:            {value: 0, unit: "m"},
        lengthCorrectionFactor: {value: 0, unit: "-"},
        numberOfCuts:           {value: 0, unit: ""},
        tensionDraft:           {value: 0, unit: "-"},
        WindingHelixAlfa:       {value: 0, unit: "Grad"},
        WindingWidth:           {value: 0, unit: "m"}
    },
    AMISpin: {
        piercingInDuration:     {value: 0, unit: "ms"},
        feedDuration:           {value: 0, unit: "ms"},
        yarnReturn:             {value: 0, unit: "ms"},
        compensatorTime:        {value: 0, unit: "s"},
        compensatorTimeDoffing: {value: 0, unit: "s"},
        yarnReserve:            {value: 0, unit: "mm"},
        yarnLength:             {value: 0, unit: "mm"}
    },
    silverFeedLength: {
        "VP1":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        },
        "VP2":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        },
        "VP3":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        },
        "VP4":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        },
        "VP5":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        }
    },
    rotor: {
        type:           {value: "", unit:"string"},
        maxSpeed:       {value:0 , unit:"1/min"},
        diameter:       {value:0 , unit:"mm"},
        circumFerence:  {value:0 , unit:"mm"},
        axisdiameter:   {value:0 , unit:"mm"}
    },
    air:{
        spinningVacuum: {value: 0, unit:""},
        a:              {value: 0, unit:""},
        trashRemoval:   {value: 0, unit:""},
        b:              {value: 0, unit:""}
    },
    qsi:{
        enable: false,
        vacuumSettings: {
            QSIVacuum:  {value: 0, unit: "mbar"}
        },
        settingsQSI:{
            sectionDellay:          {value: 0, unit: "s"},
            fibreFringePreparation: {enable: false},
            rotor:                  {value: 0, unit: "s"}
        }
    },
    fsi:{
        enable: false,
        afterMachineStop: {
            liftDelay:          {value: 0, unit: "ms"},
            trailingRunFeeding: {value: 0, unit: "ms"},
            compensator:        {value: 0, unit: ""}
        },
        afterQualityCut:{
            liftDelay:          {value: 0, unit: "ms"},
            trailingRunFeeding: {value: 0, unit: "ms"},
            compensator:        {value: 0, unit: ""}
        }
    },
    asi: {
        enable: false,
        yarnAndPreparationParameters: {
            yarnAndPreparation: {enable: false},
            duration:           {value: 0, unit: "s"},
            vacuum:             {value: 0, unit: "mbar"},
            length:             {value: 0, unit: "mm"},
            yarnLengthReserve:  {enable: false},
            duration1:          {value: 0, unit: ""},
            s1:                 {value: 0, unit: ""},
            s2:                 {value: 0, unit: ""},
            s3:                 {value: 0, unit: ""}
        },
        ASIparameters: {
            rotorSpeedLevenWhenStarting: {value: 0, unit: "%"},
            ASIYarnReturn:               {value: 0, unit: "ms"},
            ASIFeedingDuration:          {value: 0, unit: "ms"}
        },
        controlledStopParameters: {
            rotorSpeedLevelWhenStopping:       {value: 0, unit: "%"},
            packageBrakingTime:                {value: 0, unit: "ms"},
            yarnEndReturnLength:               {value: 0, unit: "mm"},
            machineStopDelayAfterPowerFailure: {value: 0, unit: "%"}
        }
    }
}, action){
    switch(action.type){
        case "SET_PRODUCT_PACKAGE" :{
            return { ...state, package: action.payload}
        }
        case "SET_PRODUCT_SPEED" :{
            return { ...state, speed: action.payload}
        }
        case "SET_PRODUCT_QSI" :{
            return { ...state, qsi: action.payload}
        }
        case "SET_PRODUCT_FSI_AFTERstop" :{
            return { ...state, fsi: { ...state.fsi, afterMachineStop: action.payload}}
        }
        case "SET_PRODUCT_FSI_AFTERcut" :{
            return { ...state, fsi: { ...state.fsi, afterQualityCut: action.payload}}
        }
        case "SET_PRODUCT_ASI" :{
            return { ...state, asi: action.payload}
        }
        case "SET_PRODUCT_AMISpin" :{
            return { ...state, AMISpin: action.payload}
        }
        case "SET_PRODUCT_ROTOR" :{
            return { ...state, rotor: action.payload}
        }
        case "SET_PRODUCT_AIR" :{
            return { ...state, air: action.payload}
        }
        case "SET_PRODUCT_SVL" :{
            return { ...state, silverFeedLength: action.payload}
        }
        default:
            break;
    }
    return state;
}