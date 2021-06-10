// 上次启动时的用户信息
let userInfoHistory = uni.getStorageSync('loginUser');
console.info(userInfoHistory);
export default {
	namespaced: true,
	state: {
		//是否已经登录
		hasLogin: Boolean(userInfoHistory),
		//用户信息
		loginUser: userInfoHistory
	},
	getters: {
		getLoginUser: (state) => (id) => {
			return state.loginUser;
		},
	},
	mutations: {
		// 设置登录用户信息
		LOGIN (state, {uid, token, tokenExpired, userInfo}) { //登录成功后的操作
			console.info('running login');
			//原有的结合传来的参数
			let _info = state.loginUser;
			state.loginUser = Object.assign({}, _info, userInfo);
			//设置为已经登录
			state.hasLogin = true;
			//存储最新的用户数据到本地持久化存储
			uni.setStorageSync('loginUser', state.loginUser);
			uni.setStorageSync('uni_id_uid', uid)
			uni.setStorageSync('uni_id_token', token);
			uni.setStorageSync('uni_id_token_expired', tokenExpired)
		},
		// 移除登录信息
		LOGOUT (state) {
			// console.info('running logout')
			state.loginUser = null;
			state.hasLogin = false;
			uni.setStorageSync('loginUser', null);
			uni.setStorageSync('uni_id_uid', null)
			uni.setStorageSync('uni_id_token', null);
			uni.setStorageSync('uni_id_token_expired', null)
		},
		// 更新本地用户信息
		UPDATE_USER_INFO (state, userInfo) {
			console.info(userInfo);
			//原有的结合传来的参数
			let _info = state.loginUser;
			state.loginUser = Object.assign({}, _info, userInfo);
			//存储最新的用户数据到本地持久化存储
			uni.setStorageSync('loginUser', state.loginUser);
		}
	},
	actions: {}
}
