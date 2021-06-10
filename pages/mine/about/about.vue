<template>
	<view class="vili-about-content">
		<img class="vili-logo" :src="logo"
			mode="aspectFit"></img>
		<view>{{name}}</view>
		<tui-list-view class="mine-menu-list" marginTop="15px" unlined="all">
			<!-- #ifdef APP-VUE -->
			<tui-list-cell :arrow="true" @click="handleOpenStore">
				<view class="tui-item-box">
					<view class="tui-list-cell_name">为我们打call</view>
					<view class="tui-right">
						真诚的感谢您
					</view>
				</view>
			</tui-list-cell>
			<!-- #endif -->
			<tui-list-cell :arrow="true" @click="handleToH5">
				<view class="tui-item-box">
					<view class="tui-list-cell_name">官方网站</view>
					<view class="tui-right">
						{{site}}
						<!-- 前往 -->
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell>
				<view class="tui-item-box">
					<view class="tui-list-cell_name">客服QQ：{{qq}}</view>
					<view class="tui-right">
						<!-- 前往 -->
					</view>
				</view>
			</tui-list-cell>
		</tui-list-view>
		<view class="vili-version text-grey margin-top lg">
			版本号（{{version}}）
		</view>
	</view>
</template>

<script>
import qkConfig from '@/qk.config.js';
export default {
	data() {
		return {
			name: qkConfig.appInfo.appName,
			qq: qkConfig.appInfo.QQ,
			version: '1.0.0',
			site: qkConfig.appInfo.site_url,
			logo: qkConfig.appInfo.logo
		}
	},
	onLoad () {
		// #ifdef APP-PLUS
		this.version = plus.runtime.version
		// #endif
	},
	methods: {
		// 打开官网地址
		handleToH5 () {
			plus.runtime.openURL(this.site);
		},
		// 跳转应用市场
		handleOpenStore () {
			if (plus.os.name == "Android") {
				uni.showToast({ title: '糟糕，该模块还未建设完成~', icon: 'none' })
				// 自行补充，跳转安卓应用市场地址
				return false;
			}
			plus.runtime.openURL('itms-apps://itunes.apple.com/us/app/%E6%8F%92%E7%94%BB%E4%B8%96%E7%95%8C/id1561620000');
		}
	}
}
</script>

<style lang="scss">
.vili-about-content {
	text-align: center;
	width: 100%;

	.vili-logo {
		width: 160rpx;
		border-radius: 8px;
		background: white;
		margin-top: 15%;
		margin-bottom: 20px;
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
	.vili-version  {
		margin-top: 20%;
	}
}
</style>
