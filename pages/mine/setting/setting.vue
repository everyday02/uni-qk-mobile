<template>
	<view v-if="loginUser" class="mine-setting-container" :style="{height: `${windowHeight}px`}" >
		<tui-list-view class="mine-menu-list"  unlined="all">
			<tui-list-cell :arrow="true" >
				<view class="tui-item-box align-center" @click="setAvatar">
					<view class="tui-list-cell_name">头像</view>
					<view class="tui-right">
						<image v-if="loginUser.avatar" class="cu-avatar lg round" :src="loginUser.avatar" 
							mode="widthFix">
						</image>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" @click="handleShowModal(0)">
				<view class="tui-item-box">
					<view class="tui-list-cell_name">昵称</view>
					<view class="tui-right">{{loginUser.nickname}}</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" @click="handleShowModal(2)"  >
				<view class="tui-item-box">
					<view class="tui-list-cell_name" >性别</view>
					<view class="tui-right">
						{{renderGener()}}
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" @click="handleShowModal(1)" >
				<view class="tui-item-box">
					<view class="tui-list-cell_name" >个人简介</view>
					<view class="tui-right">{{loginUser.comment || '这个人很神秘，什么都没写'}}</view>
				</view>
			</tui-list-cell>
		</tui-list-view>
		
		<tui-list-view class="mine-menu-list" marginTop="15px" unlined="all">
			<tui-list-cell >
				<view class="tui-item-box">
					<view class="tui-list-cell_name">邮箱</view>
					<view class="tui-right">{{loginUser.email || '暂无'}}</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" @click="handleBindMobile">
				<view class="tui-item-box">
					<view class="tui-list-cell_name">手机号</view>
					<view class="tui-right">{{loginUser.mobile || '暂无'}}</view>
				</view>
			</tui-list-cell>
			<tui-list-cell >
				<view class="tui-item-box">
					<view class="tui-list-cell_name">UID</view>
					<view class="tui-right">
						{{loginUser.user_no}}
					</view>
				</view>
			</tui-list-cell>
		</tui-list-view>
		<tui-list-view class="mine-menu-list" marginTop="15px" unlined="all">
			<tui-list-cell :arrow="true" @click="handleToRepassword" >
				<view class="tui-item-box">
					<view class="tui-list-cell_name">重置密码</view>
					<view class="tui-right">前往</view>
				</view>
			</tui-list-cell>
		</tui-list-view>
		<view class="cu-list menu" style="margin-top: 15px" >
			<view class="cu-item" >
				<view class="content text-center" @click="handleLogout">
					<text class="text-black">退出登录</text>
				</view>
			</view>
		</view>
		<tui-modal :show="modal1" :custom="true" @cancel="modal1 = !modal1" fadeIn >
			<view class="tui-modal-custom">
				<!-- <view class="tui-prompt-title">请输入昵称</view> -->
				<input v-show="currentEdit === 0" placeholder="请输入新昵称" class="tui-modal-input" 
					:class="{'tui-hidden-input':!modal1}"  
					v-model="updateForm.nickname" />
				<input v-show="currentEdit === 1" placeholder="请编辑简介" class="tui-modal-input"
					:class="{'tui-hidden-input':!modal1}"  
					v-model="updateForm.comment" />
				<view v-if="currentEdit === 2" class="gender-content flex">
					<view :class="updateForm.gender === 1 ? 'active': ''" 
						@click="updateForm.gender = 1"
						class="cu-tag lg line-grey radius">男</view>
					<view :class="updateForm.gender === 2 ? 'active': ''" 
						@click="updateForm.gender = 2"
						class="cu-tag lg line-grey radius">女</view>
					<view :class="updateForm.gender === 0 ? 'active': ''"
						@click="updateForm.gender = 0"
						class="cu-tag lg line-grey radius">保密</view>
				</view>
				<tui-button height="72rpx" :size="28" shape="circle" @click="updateUserInfo">立即提交</tui-button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	import {mapState, mapMutations,  mapGetters} from 'vuex';
	const db = uniCloud.database();
	const usersTable = db.collection('uni-id-users')
	export default {
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync()['statusBarHeight'],
				windowHeight: uni.getSystemInfoSync().windowHeight,
				modal1: false,
				currentEdit: 0,
				updateForm: {
					nickname: '',
					gender: '',
					comment: ''
				}
			}
		},
		computed: {
			...mapState('user', ['loginUser'])
		},
		mounted () {
			this.updateForm.gender = this.loginUser.gender;
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/UPDATE_USER_INFO',
				logout: 'user/LOGOUT'
			}),
			handleToRepassword () {
				uni.navigateTo({url: `/pages/login/pwd-retrieve/pwd-retrieve?phoneNumber=${this.loginUser.mobile}` })
			},
			handleShowModal (index) {
				this.currentEdit = index
				this.modal1 = true;
			},
			updateUserInfo() {
				let updates = {};
				if (this.updateForm.nickname) updates.nickname = this.updateForm.nickname;
				if (this.updateForm.gender ||this.updateForm.gender === 0) updates.gender = this.updateForm.gender;
				if (this.updateForm.comment) updates.comment = this.updateForm.comment;
				usersTable.where('_id==$env.uid').update(updates).then(e => {
					if (e.result.updated) {
						uni.showToast({ title: '更新成功', icon: 'none' });
						this.setUserInfo(updates);
					} else {
						uni.showToast({ title: '没有变化', icon: 'none' });
					}
				})
				this.modal1 = false;
			},
			handleLogout () {
				uni.showModal({
				    title: '提示',
				    content: '确定退出登录吗？',
				    success: (res) => {
				        if (res.confirm) {
							 this.logout();
							 uni.reLaunch({ url: '/pages/mine/mine' })
				        }
				    }
				});
			},
			renderGener () {
				if (!this.loginUser) return '保密';
				if (this.loginUser.gender === 0) return '保密';
				if (this.loginUser.gender === 1) return '男';
				if (this.loginUser.gender === 2) return '女';
				return '保密';
			},
			// 绑定手机号
			handleBindMobile () {
				uni.navigateTo({
					url: `/pages/mine/setting/bind-mobile/bind-mobile?mobile=${this.loginUser.mobile}`
				})
			},
			// 更换头像
			setAvatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						// 头像剪裁尺寸
						let options = {
							width: 600,
							height: 600
						}
						// 剪裁并上传头像
						uni.navigateTo({
							url: '/pages/mine/setting/cutImage?path=' +
								res.tempFilePaths[0] +
								`&options=${JSON.stringify(options)}`,
							animationType: "fade-in",
							events: {
								uploadAvatarAfter: ({
									url
								}) => {
									console.log(url);
									// 使用 clientDB 提交数据
									usersTable.where('_id==$env.uid').update({
										avatar: url
									}).then((res) => {
										console.log(res);
										uni.showToast({
											icon: 'none',
											title: '修改成功'
										})
										this.setUserInfo({
											avatar: url
										});
									}).catch((err) => {
										uni.showModal({
											content: err.message ||
												'请求服务失败',
											showCancel: false
										})
									}).finally(() => {
										uni.hideLoading()
									})
								}
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
uni-page-wrapper {
	background-color: #f5f6f7;
}
.mine-setting-container {
	width: 100%;
	background-color: #f5f6f7;
	.mine-menu-list {
		margin-top: 15px;
		border-radius: 8px;
		.tui-item-box {
			width: 100%;
			display: flex;
			align-items: center;
			.tui-list-cell_name {
				padding-left: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			.tui-ml-auto {
				margin-left: auto;
			}
			
			.menu-icon {
				color: #007AFF;
				font-size: 16px;
				margin-right: 5px;
			}
			.tui-right {
				margin-left: auto;
				margin-right: 34rpx;
				font-size: 26rpx;
				color: #999;
			}
		}
	}
	
	.tui-modal-custom {
		.tui-modal-input {
			height: 44px;
			border-bottom: 1px solid #ccc;
			margin: 20px 10px;
		}
		.gender-content {
			margin: 20px 0px;
			.cu-tag {
				padding: 15px 20px;
				margin: 0px 10px;
				&.active {
					background-color: #007AFF;
					color: white;
				}
			}
		}
	}
}
</style>
