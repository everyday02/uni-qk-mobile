<template>
	<view class="pwd-retrieve-container">
		<!-- 顶部文字 -->
		<!-- 登录框 (选择手机号所属国家和地区需要另行实现) -->
		<uni-forms ref="form" :value="formData" :rules="rules">
			<uni-forms-item name="phone">
				<!-- focus规则如果上一页携带来“手机号码”数据就focus验证码输入框，否则focus手机号码输入框 -->
				<uni-easyinput :disabled="lock" 
					:focus="formData.phone.length!=11" 
					type="number" 
					class="easyinput"
					:inputBorder="false" v-model="formData.phone" maxlength="11" placeholder="请输入手机号">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="code">
				<uni-easyinput :focus="formData.phone.length==11" type="number" class="easyinput" :inputBorder="false"
					v-model="formData.code" maxlength="6" placeholder="请输入验证码">
					<template slot="right">
						<qk-send-sms-code ref="shortCode" :phone="formData.phone"></qk-send-sms-code>
					</template>
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="pwd">
				<uni-easyinput type="password" class="easyinput" :inputBorder="false" v-model="formData.pwd"
					placeholder="请输入新密码"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="pwd2">
				<uni-easyinput type="password" class="easyinput" :inputBorder="false" v-model="formData.pwd2"
					placeholder="请确认新密码"></uni-easyinput>
			</uni-forms-item>
			<button class="send-btn-box" :disabled="!canSubmit" :type="canSubmit?'primary':'default'" @click="submit">完成
			</button>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lock: false,
				formData: {
					"phone": "",
					'pwd': '',
					'pwd2': ''
				},
				rules: {
					phone: {
						rules: [{
								required: true,
								errorMessage: '请输入手机号',
							},
							{
								pattern: /^1\d{10}$/,
								errorMessage: '手机号格式不正确',
							}
						]
					},
					code: {
						rules: [{
								required: true,
								errorMessage: '请输入验证码',
							},
							{
								pattern: /^.{6}$/,
								errorMessage: '请输入6位验证码',
							}
						]
					},
					pwd: {
						rules: [{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								pattern: /^.{6,20}$/,
								errorMessage: '密码应为6到20位',
							}
						]
					},
					pwd2: {
						rules: [{
								required: true,
								errorMessage: '请确认密码',
							},
							{
								pattern: /^.{6,20}$/,
								errorMessage: '密码应为6到20位',
							},
							{
								validateFunction: function(rule, value, data, callback) {
									// console.log(value);
									if (value != data.pwd) {
										callback('两次输入密码不一致')
									};
									return true
								}
							}
						]
					}
				}
			}
		},
		computed: {
			canSubmit() {
				return this.isPhone && this.isPwd && this.isCode;
			},
			isPhone() {
				let reg_phone = /^1\d{10}$/;
				let isPhone = reg_phone.test(this.formData.phone);
				return isPhone;
			},
			isPwd() {
				let reg_pwd = /^.{6,20}$/;
				let isPwd = reg_pwd.test(this.formData.pwd);
				return isPwd;
			},
			isCode() {
				let reg_code = /^\d{6}$/;
				let isCode = reg_code.test(this.formData.code);
				return isCode;
			}
		},
		onLoad(event) {
			if (event && event.phoneNumber) {
				this.formData.phone = event.phoneNumber;
				this.lock = true
			}
		},
		onReady() {
			if (this.formData.phone) {
				this.$refs.shortCode.start();
			}
		},
		methods: {
			/**
			 * 完成并提交
			 */
			submit() {
				this.$refs.form.submit()
					.then(res => {
						uniCloud.callFunction({
							name: 'uni-id-cf',
							data: {
								action: 'resetPwdBySmsCode',
								params: {
									"mobile": this.formData.phone,
									"code": this.formData.code,
									"password": this.formData.pwd
								},
							},
							success: ({
								result
							}) => {
								console.log(result);
								uni.showToast({
									title: result.msg,
									icon: 'none'
								});
								if (result.code === 0) {
									setTimeout(() => {
										uni.navigateBack()
									}, 1500)
								}
							}
						})
					})
			}
		}
	}
</script>

<style lang="scss">
.pwd-retrieve-container {
	padding-top: 36rpx;
	padding: 15px;
	
	.content{
		padding:0 50rpx;
		width: 750rpx;
		flex: 1;
	}
	
	/* #ifdef MP */
	.uni-forms-item__label {
		display: none!important;
	}
	
	.uni-forms-item__content {
		background-color: #F8F8F8;
		border-radius: 6rpx;
		min-height: 42px;
	}

	/* #endif */
	
	.uni-easyinput__content {
		min-height: 45px!important;
	}
	
	.input-box{
		padding:0 15px;
		margin-top: 15px;
		background-color: #F8F8F8;
		border-radius: 6px;
		font-size: 28rpx;
	}
	.get-code{
		margin: 0;
		margin-top:15px;
		background-color: #007aff;
		color: #FFFFFF;
	}
	.input-box,.get-code{
		height: 50px;
		line-height: 50px;
	}
	.title{
		text-align: center;
		padding-bottom: 5px;
	}
	.tip{
		color: #666666;
		font-size: 26rpx;
		margin: 6px 0;
	}
	.easyinput{
		background-color: #F8F8F8;
		border-radius: 6rpx;
	}
	.send-btn{
		width: 100%;
		margin-top:15px;
		border-radius: 6rpx;
	}
	.link{
		color: #04498c;
	}
}
</style>
