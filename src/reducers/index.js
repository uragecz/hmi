import { combineReducers } from 'redux';

import history from './historyReducer';
import faultReport from './faultReportReducer';
import language from './languageReducer';
import productSetting from './productSettingReducer';
import message from './messageReducer';
import user from './userReducer';
import toolbar from './toolbarReducer';
import qmSetting from './qmSettingReducer';

export default combineReducers({
    history,
    faultReport,
    language,
    productSetting,
    message,
    user,
    toolbar,
    qmSetting
})