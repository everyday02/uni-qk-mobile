<template>
	<view class="common-detail-container">
		<view class="header flex pd-15">
			<view class="flex-sub text-center">
				<view class="cu-avatar xl bg-grey border radius" 
					style="background-image:url(https://chongai6.oss-cn-beijing.aliyuncs.com/tmp/boqi-logo.png)">
				</view>
			</view>
			<view class="flex-treble">
				<view class="title">
					自来宠宠物领养平台
				</view>
				<view class="rate flex">
					<tui-rate :current="4" :size="15" hollow active="#E86E1B"  disabled>
					</tui-rate>
					<text class="rate-text">5.00分</text>
				</view>
				<view class="footer flex justify-between">
					<view class="tags flex flex-treble">
						<tui-tag
							:key="idx"
							:type="renderTag(tag, idx)"
							v-for="(tag, idx) in tags"
							plain 
							class="tag"
							margin="8"
							padding="6rpx 14rpx"
							size="22rpx" >
							{{tag}}
						</tui-tag>
					</view>
					<view class="views flex-sub text-gray font-11 text-right">
						500人去过
					</view>
				</view>
			</view>
		</view>
		<view class="content padding">
			<view class="introduced">
				<view class="text-bold text-lg padding-bottom">
					简介
				</view>
				<view class="desc text-grey1">
					自来宠是一款为所有爱宠用户提供宠物领养、寻宠的微信小程序，是一个温暖有爱的宠物平台
				</view>
				<tui-divider backgroundColor="#ffffff" class="margin-top mrgin-bottom">
					每一句评价，都将帮助下一个爱宠的ta
				</tui-divider>
				<view class="text-bold text-lg padding-bottom">
					大家评价
				</view>
				<ci-comment></ci-comment>
			</view>
		</view>
		<view class="cu-bar foot input detail-footer">
			<view class="comment-block">
				发表评价...
			</view>
			<view class="action">
				<view class="action-item">
					<view class="icon cuIcon-like"></view>
					<text class="text">收藏</text>
				</view>
				<view class="action-item">
					<view class="cu-btn bg-blue radius">
						立刻前往
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ciComment from '@/components/bussnise/ci-comment/ci-comment.vue';
	export default {
		components: {
			ciComment
		},
		data() {
			return {
				tags: ["抖音", "签协议", "免费"]
			}
		},
		onLoad (event) {
			let params = event;
			uni.setNavigationBarTitle({ title: params.title })
		},
		methods: {
			renderTag (tag, idx) {
				if (idx === 0) return 'primary';
				if (idx === 1) return 'warning';
				if (idx === 2) return 'green';
			}
		}
	}
</script>

<style lang="scss">
.common-detail-container {
	background-color: #f5f6f7;
	padding-bottom: 55px;
	.header {
		background-color: white;
		.title {
			font-size: 18px;
			font-weight: bold;
		}
		.rate {
			margin: 10px 0px;
			.rate-text {
				font-size: 13px;
				margin-left: 10px;
				color: #E86E1B;
			}
		}
		.footer {
			margin-top: 5px;
			margin-bottom: 5px;
			.tag {
				margin-right: 10px;
			}
		}
	}
	.content {
		margin-top: 20px;
		background-color: white;
		.desc {
			letter-spacing: 1.1px;
			line-height: 24px;
		}
	}
	
	.detail-footer {
		.comment-block {
			background-color: #f5f6f7;
			border-radius: 20px;
			margin: 0px 0px 0px 15px;
			padding: 8px 10px;
			font-size: 13px;
			color: #888;
			width: 100%;
		}
		
		.action {
			margin-right: 5px;
			margin-left: 0px;
			.action-item {
				text-align: center;
				margin-left: 22px;
				min-width: 24px;
				.text {
					font-size: 10px;
					color: #aaa;
				}
			}
			.cu-btn {
				min-width: 95px;
			}
		}
	}
}
</style>
