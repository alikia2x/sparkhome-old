import {combineReducers} from 'redux';
import settingsReducer from './settingsReducer'; // 一个或多个Reducer文件

const rootReducer = combineReducers({
    settings: settingsReducer, // 将各个Reducer组合成根Reducer，'settings'是状态对象的一个属性名
    // 可以添加更多的reducer
});

export default rootReducer;