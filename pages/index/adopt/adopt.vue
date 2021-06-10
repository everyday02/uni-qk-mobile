<template>
	<view class="adopt-list-container" :style="{height: `${height}px`}">
		<view class="flex adopt-card align-center"  
			:key="index"
			@click="handleToDetail(item)"
			v-for="(item, index) in datas">
			<view class="flex-sub logo-content">
				<image class="logo" :src="item.logo" mode="widthFix"></image>
			</view>
			<view class="flex-treble content">
				<view class="title">
					{{item.title}}
				</view>
				<view class="rate flex">
					<tui-rate :current="item.rate" :size="14" hollow 
						active="#E86E1B"  disabled>
					</tui-rate>
					<view class="rate-people">
						50人评价过
					</view>
				</view>
				<view class="desc">
					<tui-overflow-hidden :lineClamp="2" size="26" color="#555">
						{{item.desc}}
					</tui-overflow-hidden>
				</view>
				<view class="footer flex align-center justify-between">
					<view class="tags flex">
						<tui-tag 
							:key="idx"
							:type="renderTag(tag, idx)"
							class="tag"
							margin="8"
							padding="8rpx 14rpx"
							size="24rpx"
							plain v-for="(tag, idx) in item.tags" >
							{{tag}}
						</tui-tag>
					</view>
					<view class="views">
						100人看过
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			height: {
				type: Number
			}
		},
		data() {
			return {
				datas: [
					{
						title: "自来宠宠物领养平台", 
						desc: "自来宠是一款为所有爱宠用户提供宠物领养、寻宠的微信小程序，是一个温暖有爱的宠...",
						tags: ['微信', "签协议", "免费"],
						views: 200,
						comments: 123,
						logo: "https://chongai6.oss-cn-beijing.aliyuncs.com/tmp/boqi-logo.png",
						rate: 4,
						link: ""
					}, {
						title: "二姨宠物圈", 
						desc: "一个有温度有态度的养宠社区，是领养宠物和已养宠物者的聚集地，在平台用文字记录养...",
						tags: ["抖音", "签协议", "免费"],
						views: 4312,
						comments: 436,
						logo: "https://chongai6.oss-cn-beijing.aliyuncs.com/tmp/boqi-logo.png",
						rate: 5,
						link: ""
					}
				]
			}
		},
		methods: {
			handleToDetail (item) {
				uni.navigateTo({
					title: item.title,
					url: `/pages/index/detail/detail?title=${item.title}`
				})
			},
			renderTag (tag, idx) {
				if (idx === 0) return 'primary';
				if (idx === 1) return 'warning';
				if (idx === 2) return 'green';
			}
		}
	}
</script>

<style lang="scss">
.adopt-list-container {
	background-color: #f5f6f7;
	padding: 15px 0px;
	.adopt-card {
		padding: 10px;
		border-radius: 4px;
		background-color: white;
		margin: 0px 10px 10px 10px;
		.logo-content {
			// padding: 5px;
			.logo {
				width: 90%;
			}
		}
		.content {
			text-align: left;
			.title {
				font-size: 16px;
				font-weight: bold;
				// margin-bottom: 10px;
			}
			.desc {
				color: #6b6b6b;
				font-size: 13px;
				letter-spacing: 1.1px;
			}
			.rate-people {
				font-size: 12px;
				color: #aaa;
				margin: 5px 10px;
			}
			.tags {
				margin: 10px 0px;
				.tag {
					margin-right: 5px;
				}
			}
			
			.views {
				font-size: 12px;
				color: #aaa;
				text-align: right;
			}
		}
	}
}
</style>
