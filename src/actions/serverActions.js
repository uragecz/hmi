/**
 * Created by urunzl on 20.1.2017.
 */
import axios from 'axios';

const ERR_MESSAGE = 'CANNOT CONTACT SERVER';

const URL = "http://localhost:59297/api/";
const CONFIG = {
  headers: {
    'Accept': 'application/json', 
    'Access-Control-Allow-Origin':'*', 
     },
     'timeout': 3000
};

export function sendData(data){
    return dispatch => {
        return axios.post(URL + par, data, CONFIG)
            .then((response) => {
                return disaptch({type: ""})
            })
            .catch((err) => {
                return dispatch({type: "SHOW_MESSAGE", payload: ERR_MESSAGE})
            })
    }
}

export function getData(){
    return dispatch => {
        return axios.get(URL + par, CONFIG)
            .then((response) => {
                return dispatch({type: ""})
            })
            .catch((err) => {
                return dispatch({type: "SHOW_MESSAGE", payload: ERR_MESSAGE})
            })
    }
}

