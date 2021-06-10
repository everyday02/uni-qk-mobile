<template>
	<view class="mine-container" :style="{height: `${windowHeight}px`}">
		<!--顶部个人信息栏-->
		<view class="header-section ">
			<view @click="handleToSetting" class="userinfo flex padding align-center justify-between">
				<view class="avatar-content flex align-center">
					<view v-if="!loginUser" class="cu-avatar xl round bg-white">
						<view class="cuIcon-people text-gray"></view>
					</view>
					<image class="cu-avatar xl round" v-if="loginUser" :src="loginUser.avatar" mode="widthFix">
					</image>
					<view v-if="!loginUser" class="login-tip">
						点击登录
					</view>
					<view v-if="loginUser" class="user-info">
						<view class="u_title">
							{{loginUser.nickname}}
						</view>
						<view class="u_id" @click.stop="handleCopeText(loginUser.user_no)" >
							UID：{{loginUser.user_no}} 
							<text class="copy" @click.stop="handleCopeText(loginUser.user_no)">复制</text>
						</view>
					</view>
				</view>
				<view class="setting flex align-center">
					<text>设置</text>
					<view class="cuIcon-right"></view>
				</view>
			</view>
		</view>
		
		<!--内容区-->
		<view class="content-section">
			<view class="mine-actions grid col-4 text-center">
				<view class="action-item" @click="handleBuilding">
					<view class="icon cuIcon-like text-pink"></view>
					<text class="text">我的喜欢</text>
				</view>
				<view class="action-item" @click="handleBuilding">
					<view class="icon cuIcon-favor text-blue"></view>
					<text class="text">我的收藏</text>
				</view>
				<view class="action-item" @click="handleBuilding">
					<view class="icon cuIcon-people text-mauve"></view>
					<text class="text">我的关注</text>
				</view>
				<view class="action-item" @click="handleBuilding">
					<view class="icon cuIcon-activity text-green"></view>
					<text class="text">我的订阅</text>
				</view>
			</view>
			
			<view class="mine-service">
				<view class="service-header solid-bottom">
					<view class="title">
						系统服务
					</view>
				</view>
				
				<view class="service-content grid col-4 text-center">
					<view class="service-item" @click="handleBuilding">
						<view class="icon cuIcon-friendfill"></view>
						<text class="name">交流群</text>
					</view>
					<view class="service-item" @click="handleBuilding">
						<view class="icon cuIcon-service"></view>
						<text class="name">在线客服</text>
					</view>
					<view class="service-item" @click="handleBuilding">
						<view class="icon cuIcon-community"></view>
						<text class="name">反馈社区</text>
					</view>
					<view class="service-item" @click="handleBuilding">
						<view class="icon cuIcon-keyboard"></view>
						<text class="name">点赞我们</text>
					</view>
				</view>
			</view>
			
			<tui-list-view class="mine-menu-list" marginTop="15px" unlined="all">
				<tui-list-cell :arrow="true" @click="handleBuilding">
					<view class="tui-item-box">
						<view class="menu-icon cuIcon-settings"></view>
						<view class="tui-list-cell_name">软件设置</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="true" @click="handleBuilding">
					<view class="tui-item-box">
						<view class="menu-icon cuIcon-share"></view>
						<view class="tui-list-cell_name">分享应用</view>
						<view class="tui-right">v{{version}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="true" @click="handleBuilding">
					<view class="tui-item-box">
						<view class="menu-icon cuIcon-question"></view>
						<view class="tui-list-cell_name">问题反馈</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="true" @click="handleToAbout">
					<view class="tui-item-box">
						<view class="menu-icon cuIcon-info"></view>
						<view class="tui-list-cell_name">关于我们</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync()['statusBarHeight'],
				windowHeight: uni.getSystemInfoSync().windowHeight,
				version: '1.0.0'
			}
		},
		onLoad () {
			// #ifdef APP-PLUS
			this.version = plus.runtime.version
			// #endif
			let userInfo = uniCloud.getCurrentUserInfo();
		},
		computed: {
			...mapState('user', ['loginUser'])
		},
		methods: {
			handleToSetting() {
				if (!this.loginUser) {
					uni.showToast({title: '请先登录', icon: 'none'});
					// this.$G.user.goToLogin();
					uni.navigateTo({ url: '/pages/login/login' })
					return false;
				}
				uni.navigateTo({
					url: '/pages/mine/setting/setting'
				})
			},
			handleToAbout () {
				uni.navigateTo({
					url: '/pages/mine/about/about'
				})
			},
			handleCopeText (user_no) {
				uni.setClipboardData({
					data: user_no,
					success: function () {
					  uni.showToast({title: '复制成功', icon: 'none'});
					}
				});
			},
			handleBuilding () {
				uni.showToast({
					title: '模块建设中~',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
.mine-container {
	width: 100%;
	height: 100%;
	background-color: #f5f6f7;

	.header-section {
		padding: 45px 15px 45px 15px;
		background-color: #3c96f3;
		color: white;

		.login-tip {
			font-size: 18px;
			margin-left: 10px;
		}

		.cu-avatar {
			border: 2px solid #eaeaea;
		}

		.user-info {
			margin-left: 15px;

			.u_title {
				font-size: 18px;
				line-height: 30px;
			}

			.u_id {
				color: #9accff;
				font-size: 13px;
			}
			.copy {
				margin-left: 5px;
				font-size: 11px;
			}
		}
	}

	.content-section {
		position: relative;
		top: -50px;
		
		.mine-actions {
			margin: 15px 15px;
			padding: 20px 0px;
			border-radius: 8px;
			background-color: white;
		
			.action-item {
				.icon {
					font-size: 28px;
				}
		
				.text {
					display: block;
					font-size: 13px;
					margin: 8px 0px;
				}
			}
		}
		
		
		.mine-service {
			padding: 15px 15px 10px 15px;
			margin: 0px 15px;
			border-radius: 8px;
			background-color: white;
		
			.service-header {
				height: 35px;
				line-height: 35px;
				.title {
					font-size: 16px;
				}
				.sub-title {
					font-size: 12px;
					color: #bbb;
				}
			}
		
			.service-content {
				.service-item {
					padding: 20px 0px;
		
					.icon {
						font-size: 28px;
						color: #ff5c91;
					}
		
					.name {
						color: #666;
						font-size: 13px;
						margin-top: 8px;
						display: block;
					}
				}
			}
		}
		
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
		
		
	}
	
	
	
}
</style>
