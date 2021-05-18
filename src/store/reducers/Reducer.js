import * as acctionType from '../actions/Actions';
import authServices from '../../Services/AuthServices';

const inicialState = {
    languaje: 1,
    rol: 0,
    user:"",    
}

const auth = new authServices();
const reducer = (state = inicialState, action) => {
    switch (action.type) {
        case acctionType.INITIAL_LANG:
            return {
                ...state,
                languaje: auth.getProfile().idioma*1
            }
        case acctionType.CHANGE_LANGUAJE:
            return {
                ...state,
                languaje: action.languje
            };
        case acctionType.SET_ROL:
            return {
                ...state,
                rol: action.rol
            };
        case acctionType.SET_USERNAME:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}

export default reducer;