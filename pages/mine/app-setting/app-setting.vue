<template>
	<view class="app-setting-container" :style="{height: `${windowHeight}px`}" >
		<tui-list-view class="app-menu-list padding-top" >
			<!-- #ifdef APP-PLUS -->
			<tui-list-cell :arrow="true" @click="handleCleanTmp">
				<view class="tui-item-box">
					<view class="tui-list-cell_name">清除缓存</view>
					<view class="tui-right"></view>
				</view>
			</tui-list-cell>
			<!-- #endif -->
			<tui-list-cell :arrow="true" >
				<view class="tui-item-box">
					<view class="tui-list-cell_name">夜间模式</view>
					<view class="tui-right"></view>
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
		
	</view>
</template>

<script>
	import {mapState, mapMutations,  mapGetters} from 'vuex';
	export default {
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync()['statusBarHeight'],
				windowHeight: uni.getSystemInfoSync().windowHeight,
			}
		},
		methods: {
			...mapMutations({
				logout: 'user/LOGOUT'
			}),
			handleCleanTmp () {
				uni.showLoading({
					title: '清除中',
					mask: true
				});
				/*
				任何临时存储或删除不直接影响程序运行逻辑（清除缓存必定造成业务逻辑的变化，如：打开页面的图片不从缓存中读取而从网络请求）的内容都可以视为缓存。主要有storage、和file写入。
				缓存分为三部分		
					原生层（如：webview、x5播放器的、第三方sdk的、地图组件等）
					前端框架（重启就会自动清除）
					开发者自己的逻辑（如：
						本示例的 检测更新功能下载了apk安装包，
						其他逻辑需要根据开发者自己的业务设计
						比如：有聊天功能的应用，聊天记录是否视为缓存，还是单独提供清除聊天记录的功能由开发者自己设计
					）
				*/
				uni.getSavedFileList({
					success:res=>{
						if (res.fileList.length > 0) {
							uni.removeSavedFile({
								filePath: res.fileList[0].filePath,
								complete:res=>{
									console.log(res);
									uni.hideLoading()
									uni.showToast({
										title: '清除成功',
										icon: 'none'
									});
								}
							});
						}else{
							uni.hideLoading()
							uni.showToast({
								title: '清除成功',
								icon: 'none'
							});
						}
					},
					complete:e=>{
						console.log(e);
					}
				});
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
			}
		}
	}
</script>

<style lang="scss" scoped>

.app-setting-container {
	width: 100%;
	background-color: #f5f6f7;
	.app-menu-list {
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
</style>
