<template>
	<view class="normal-login-container">
		<view class="logo-content align-center justify-center flex">
			<image style="width: 100rpx;height: 100rpx;"
				:src="globalConfig.appInfo.logo" 
				mode="widthFix">
			</image>
			<text class="title">正在登录注册</text>
		</view>
		<view class="login-form-content" >
			<view class="input-item flex align-center">
				<view class="icon cuIcon-people"></view>
				<input v-model="form.account" class="input" type="text" 
				:placeholder="loginType === 'pass' ? '请输入手机号或邮箱' : '请输入手机号'" value="" />
			</view>
			<!--账号密码登录-->
			<view v-if="loginType === 'pass'" class="input-item flex align-center">
				<view class="icon cuIcon-lock"></view>
				<input v-model="form.password" type="password" class="input" placeholder="请输入密码"  />
			</view>
			<!--验证码登录-->
			<view v-if="loginType === 'verify'" class="input-item flex align-center">
				<view class="icon cuIcon-lock"></view>
				<uni-easyinput :focus="form.account.length==11" type="number" class="easyinput" :inputBorder="false"
					v-model="form.code" maxlength="6" placeholder="请输入验证码">
					<template slot="right">
						<qk-send-sms-code ref="shortCode" :phone="form.account"></qk-send-sms-code>
					</template>
				</uni-easyinput>
			</view>
			<view class="register flex justify-between">
				<text @click="handleToggleLoginType">
					{{loginType === 'verify' ? '密码登录' : '短信登录'}}
				</text>
				<text class="margin-left" @click="handleToPwsRetrieve" v-if="loginType === 'pass'">
					忘记密码？
				</text>
			</view>
			<view class="action-btn">
				<button @click="handleLogin" class="login-btn cu-btn block bg-blue margin-tb-sm lg round">
					登录
				</button>
			</view>
		</view>
		
		<view class="xieyi text-center">
			<text class="text-grey1">登录即代表同意</text>
			<text @click="handleUserAgrement" class="text-blue">《用户协议》</text>
			<text @click="handlePrivacy" class="text-blue">《隐私协议》</text>
		</view>
		<view class="three-title">
			第三方账号直接登录
		</view>
		<view class="three-login-actions">
			<view class="three-icon" @click="handleLoginByQQ">
				<view class="iconfont icon-QQ"></view>
			</view>
			<view class="three-icon" @click="handleLoginByWeixin">
				<view class="cuIcon-weixin"></view>
			</view>
			<view class="three-icon" @click="handleLoginByApple">
				<view class="iconfont icon-Apple"></view>
			</view>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				loginType: 'verify', // pass || verify
				globalConfig: getApp().globalData.config,
				form: {
					account: "",
					code: null,
					password: null
				}
			}
		},
		methods: {
			// apple 授权登录
			handleLoginByApple () {
				
			},
			// qq授权登录
			handleLoginByQQ () {
				
			},
			// 微信授权登录
			handleLoginByWeixin () {
				
			},
			// 切换登录方式
			handleToggleLoginType () {
				if (this.loginType === 'verify') {
					this.loginType = 'pass'
				} else {
					this.loginType = 'verify'
				}
			},
			// 发送验证码
			async handleSend() {
			
			
			},
			// 跳转取回密码界面
			handleToPwsRetrieve () {
				uni.navigateTo({
					url: '/pages/login/pwd-retrieve/pwd-retrieve'
				})
			},
			// 隐私协议
			handlePrivacy () {
				let site = this.globalConfig.appInfo.agreements[1];
				uni.navigateTo({
					url: `/pages/common/webview/webview?title=${site.title}&url=${site.url}`
				})
			},
			// 用户协议
			handleUserAgrement() {
				let site = this.globalConfig.appInfo.agreements[0];
				uni.navigateTo({
					url: `/pages/common/webview/webview?title=${site.title}&url=${site.url}`
				})
			},
			async pwdLogin () {
				
				// 下边是可以登录
				uniCloud.callFunction({
					name:'uni-id-cf',
					data:{
						action:'login',
						params:{
							"username": this.form.account,
							"password": this.form.password
						}
					},
					success: ({result}) => {
						console.log(result);
						if (result.code === 0) {
							console.info('登录成功！');
							this.loginSuccess(result)
						} else {
							uni.showModal({
								title: '错误',
								content: result.msg,
								showCancel: false,
								confirmText: '知道了'
							});
						}
					}
				})
			},
			// 短信登录
			async smsLogin () {
				uniCloud.callFunction({
					name:'uni-id-cf',
					data:{
						action:'loginBySms',
						params:{
							"mobile":this.form.account,
							"code":this.form.code
						},
					},
					success: ({result}) => {
						this.loginSuccess(result)
					}
				})
			},
			async handleLogin() {
				if (this.loginType === 'pass') {
					this.pwdLogin();
					return false;
				} else {
					this.smsLogin();
				}
			},
			// 登录成功后，处理函数
			loginSuccess (result) {
				uni.showToast({ title: '登录成功', icon: 'none' });
				console.log('登录成功',result);
				const { uid, token, tokenExpired } = result;
				// 设置用户信息
				this.$store.commit('user/LOGIN', { uid, token, tokenExpired, userInfo: result.userInfo });
				var delta = 0//判断需要返回几层
				let pages = getCurrentPages();
				pages.forEach((page,index)=>{
					// console.log(pages[pages.length-index-1].route.split('/')[2]);
					pages[pages.length-index-1].route.split('/')
					if(pages[pages.length-index-1].route.split('/')[2] == 'login-page'){
						delta ++
					}
				})
				// console.log('判断需要返回几层',delta);
				// uni.navigateBack({delta})
			}
		}
	}
</script>

<style lang="scss">
	.normal-login-container {
		width: 100%;
		.logo-content {
			width: 100%;
			font-size: 21px;
			text-align: center;
			padding-top: 15%;

			image {
				border-radius: 4px;
			}

			.title {
				margin-left: 10px;
			}
		}

		.register {
			text-align: left;
			color: #666;
			margin-left: 10px;
		}

		.login-form-content,
		.register-form-content {
			text-align: center;
			margin: 20px auto;
			margin-top: 15%;
			width: 80%;

			.input-item {
				margin: 20px auto;
				background-color: #f5f6f7;
				height: 45px;
				border-radius: 20px;

				.icon {
					font-size: 38rpx;
					margin-left: 10px;
					color: #999;
				}

				.input {
					width: 100%;
					font-size: 14px;
					line-height: 20px;
					text-align: left;
					padding-left: 15px;
				}

			}

			.login-btn {
				margin-top: 40px;
				height: 45px;
			}

			.xieyi {
				color: #333;
				margin-top: 20px;
			}
		}
		.three-title {
			text-align: center;
			color: #888;
			font-size: 13px;
			margin: 35px 0px 30px 0px;
		}
		
		.three-login-actions {
			padding: 0px 55px;
			display: flex;
			text-align: center;
			align-items: center;
			justify-content: center;
			.three-icon {
				margin: 0px 35px;
				.iconfont {
					font-size: 42px;
				}
				.icon-QQ {
					color: #1c94dc;
				}
				.icon-Apple {
					font-size: 44px;
				}
			}
			
			.cuIcon-weixin {
				font-size: 26px;
				padding: 6px 7px;
				color: #06AD56;
				border-radius: 88px;
				border: 1px solid #06AD56;
			}
		}
		
		.easyinput {
			width: 100%;
		}
	}
</style>
