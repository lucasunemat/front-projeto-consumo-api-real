import * as types from '../types';
import axios from '../../../services/axios';
/**
 * A lógica antes envolvia:
 * 1. arquivo index do Store contendo o reducer com o switch
 * 2. Esse arquivo é acionado por qualquer outro arquivo que use o dispatch()
 * 3. useSelector() é usado para pegar o estado atual. Ele foi usado para mostrar
 *    as alternancias entre true e false ao apertar o botao
 */

/**
 * Agora parece que:
 * 1. Temos o store com todos os reducers e ele carrega eles para o Provider lá no APP
 * 2. Dentro do store temos os modules que possuem, cada um, o seu types (com os tipos
 * de ações possíveis de serem disparadas), o reducer com as manipulações de estado e
 * as actions com as funções que disparam as ações
 */

// estado inicial -> é também chamado "estado global da aplicação"
const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      // acessa a action loginSucess, acessa o payload e pega o token e o user
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;

      const newState = { ...initialState };
      return newState; // volta para o estado inicial
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true; // isso permite você disparar o componente Loading
      return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case types.REGISTER_UPDATED_SUCESS: {
      const newState = { ...state };
      newState.user.nome = action.payload.nome;
      newState.user.email = action.payload.email;
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_CREATED_SUCESS: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    default:
      return state;
  }
}
