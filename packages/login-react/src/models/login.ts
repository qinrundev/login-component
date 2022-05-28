import type { Effect, Reducer } from 'umi';
import type { ResponseError } from 'umi-request';
import { message } from 'antd';
import { login, appLogin, getState, createIdentityForUser, getAppIdList } from '@/services/auth';
import  {queryCurrentUser} from '@/services/user';
import type { RelationIdentityUser, GetAppIdResp } from '@/types/user';

export interface LoginModelState {
  wxState: string;
  relation: RelationIdentityUser;
  appIdList: GetAppIdResp[];
}

export interface LoginModelType {
  namespace: string;
  state: LoginModelState;
  effects: {
    login: Effect;
    appLogin: Effect;
    getState: Effect;
    createIdentityForUser: Effect;
    getAppIdList: Effect;
  };
  reducers: {
    saveState: Reducer;
    saveAppIds: Reducer;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    wxState: '',
    relation: {},
    appIdList: [],
  },
  effects: {
    *login({ payload }, { call }) {
      const { params, onSuccess, onError } = payload;
      const getUserInfo = async (params:any): Promise<any> => {
        try  {
          const loginInfo = await login(params);
          if(loginInfo){
            const userInfo = await queryCurrentUser();
            return {loginInfo,userInfo};
          }else {
            return undefined;
          }

        } catch (e) {
          return undefined;
        }
      };
      try {
        const data = yield call(getUserInfo, params);
        onSuccess(data);

        //message.success('登录成功');
        // window.location.href = '/';
      } catch (e) {
        const { data, response } = e as ResponseError;

        onError(data.message, data.data, response.status);
        //console.log(response.status);
        console.log(data.message);
      }
    },
    *appLogin({ payload }, { call }) {
      const { params, appId, onSuccess, onError } = payload;
      try {
        yield call(appLogin, appId, params);
        onSuccess();
        //message.success('登录成功');
        // window.location.href = '/';
      } catch (e) {
        const { data, response } = e as ResponseError;

        onError(data.message, data.data, response.status);
        //console.log(response.status);
        console.log(data.message);
      }
    },
    *getState(_, { call, put }) {
      try {
        const data = yield call(getState);
        if (data) {
          yield put({
            type: 'saveState',
            payload: data,
          });
        }
      } catch (e) {
        const { data } = e as ResponseError;
        message.error(data.message);
      }
    },
    *createIdentityForUser({ payload }, { call }) {
      const { params, domainId, onSuccess, onError } = payload;
      try {
        yield call(createIdentityForUser, domainId, params);
        onSuccess();
        //message.success('登录成功');
        // window.location.href = '/';
      } catch (e) {
        const { data, response } = e as ResponseError;
        onError(data.message, response.status);
        //console.log(response.status);
        // message.error(data.message);
      }
    },
    *getAppIdList({ payload }, { call, put }) {
      const { appId } = payload;
      try {
        const data = yield call(getAppIdList, appId);
        if (data) {
          yield put({
            type: 'saveAppIds',
            payload: data,
          });
        }
      } catch (e) {
        const { data } = e as ResponseError;
        message.error(data.message);
      }
    },
  },
  reducers: {
    saveState(state: LoginModelState, action) {
      return {
        ...state,
        wxState: action.payload,
      };
    },
    saveAppIds(state: LoginModelState, action) {
      return {
        ...state,
        appIdList: action.payload,
      };
    },
  },
};

export default LoginModel;
