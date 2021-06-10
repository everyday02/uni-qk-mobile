<script>
	import qkConfig from './qk.config.js';	// qk全局应用配置文件
	import store from '@/store';

	// #ifdef APP-PLUS
	// 插件来源：https://ext.dcloud.net.cn/plugin?id=4542
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	
	// 插件来源：https://ext.dcloud.net.cn/plugin?id=5095
	import interceptorChooseImage from '@/uni_modules/json-interceptor-chooseImage/js_sdk/main.js';
	// #endif

	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 初始化应用
			this.initApp();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 初始化应用
			initApp () {
				// 监听网络状况
				this.checkNetwork();
				
				// 初始化应用配置
				this.initConfig();
				
				// 初始化云数据库
				this.initDB();
				
				// 函数拦截器，处理登录函数
				this.initCallFunction();
				
				// #ifdef APP-PLUS
				// 应用无访问摄像头/相册权限，引导跳到设置界面。
				interceptorChooseImage()
				
				// app升级更新检测。
				this.checkAppVersion();
				// #endif
			},
			// 初始化云数据库
			initDB () {
				const db = uniCloud.database();
				
				//clientDB异常处理函数
				function onDBError({
					code, // 错误码详见https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=returnvalue
					message
				}) {
					console.log(code,message);
					// 如果为登录失效，则跳转登录界面
					if(['TOKEN_INVALID_INVALID_CLIENTID', 'TOKEN_INVALID', 'TOKEN_INVALID_TOKEN_EXPIRED', 'TOKEN_INVALID_WRONG_TOKEN', 'TOKEN_INVALID_ANONYMOUS_USER',
					].includes(code)){
						uni.navigateTo({ url:'/pages/login/login' });
					}
				}
			},
			initConfig () {
				setTimeout(()=>{
					const app = getApp({allowDefault: true})
					app.globalData.config = qkConfig;
				}, 30);
			},
			// APP升级检测。
			async checkAppVersion () {
				checkUpdate();
			},
			// 登录函数拦截，记录收集设备信息，并处理返回
			initCallFunction () {
				//拦截器封装callFunction
				let callFunctionOption;
				uniCloud.addInterceptor('callFunction', {
					async invoke(option) {
						// #ifdef APP-PLUS
						// 在APP端执行登录函数时，就记录用户的相关设备id
						if (option.name == 'uni-id-cf' && (
								option.data.action == 'register' 
								|| option.data.action.slice(0, 5) == 'login')
							) {
							let oaid = await new Promise((callBack, fail) => {
								if (uni.getSystemInfoSync().platform == "android") {
									plus.device.getOAID({
										success: function(e) {
											callBack(e.oaid)
											console.log('getOAID success: ' + JSON.stringify(e));
										},
										fail: function(e) {
											fail()
											console.log('getOAID failed: ' + JSON.stringify(e));
										}
									});
								} else {
									callBack()
								}
							})
				
							let imei = await new Promise((callBack, fail) => {
								if (uni.getSystemInfoSync().platform == "android") {
									plus.device.getInfo({
										success: function(e) {
											callBack(e.imei)
											console.log('getOAID success: ' + JSON.stringify(e));
										},
										fail: function(e) {
											fail()
											console.log('getOAID failed: ' + JSON.stringify(e));
										}
									});
								} else {
									callBack()
								}
							})
							let deviceInfo = {
								"push_clientid": plus.push.getClientInfo().clientid, // 获取匿名设备标识符
								"imei": imei,
								"oaid": oaid,
								"idfa": plus.storage.getItem('idfa') || '' //idfa有需要的用户在应用首次启动时自己获取存储到storage中
							}
							console.log("重新登陆/注册，获取设备id", deviceInfo);
							option.data.deviceInfo = deviceInfo;
						}
						// #endif
						console.log(JSON.stringify(option));
						callFunctionOption = option
					},
					fail(e) { // 失败回调拦截
						uni.showModal({ content: "系统错误请稍后再试！", showCancel: false, confirmText: "知道了" });
					},
					success: (e) => {
						// 一些异常code处理
						switch (e.result.code) {
							case 403:
								// 无权限模块，引导跳转登录
								uni.showModal({
									content: '该服务需要先登录',
									confirmText: '前往登录',
									showCancel: false,
									success (res) {
										if (res.confirm) {
											uni.navigateTo({ url: '/pages/login/login'})
										}
									}
								});
								break;
							case 50101:
								uni.showToast({
									title: e.result.msg,
									icon: 'none',
									duration: 2000
								});
								break;
							default:
								console.log('code的值是：' + e.result.code, '可以在这里插入，自动处理响应体');
								break;
						}
					}
				})
			},
			// 监听网络状态
			checkNetwork () {
				console.info('checkNetwork');
				let _thiz = this;
				uni.getNetworkType({
					success: function (res) {
						console.info(res);
						if (res.networkType === 'none') {
							// 网络断开连接
							uni.showModal({
								title: '网络异常',
								showCancel: false,
								confirmText: "重新尝试",
								content: '你的网络不太给力，请检查网络',
								success: function (res) {
									if (res.confirm) {
										_thiz.checkNetwork();
									}
								}
							});
						}
					}
				});	
				// 监听网络
				uni.onNetworkStatusChange((res) => {
					_thiz.checkNetwork();
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/index.scss';
	/*每个页面公共css */
</style>
