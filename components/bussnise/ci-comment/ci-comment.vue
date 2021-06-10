<template>
<view class="ci-comment-container">
	<view class="comments">
		<view class="comment-item" 
			:key="index"
			v-for="(item, index) in datas">
			<view class="comment-header flex justify-between align-center">
				<view class="flex-sub flex align-center">
					<view class="cu-avatar bg-grey round"
						:style="{backgroundImage:`url(${item.avatar})`}">
					</view>
					<view class="margin-left">
						<view class="user_name">
							{{item.user_name}}
						</view>
						<view class="time text-grey2 font-11">
							{{item.time}}
						</view>
					</view>
				</view>
				<view class="flex-sub text-right">
					<tui-rate :current="item.rate" :size="18" hollow active="#E86E1B" disabled>
					</tui-rate>
				</view>
			</view>
			<view class="title">
				{{item.title}}
			</view>
			<view class="desc">
				{{item.desc}}
			</view>
			<view class="footer flex justify-between">
				<view class="flex-sub city text-grey2">
					{{item.from}}
				</view>
				<view class="action">
					<view class="good cuIcon-appreciate text-grey1"></view>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
export default {
	data () {
		return {
			datas: [
				{
					title: "总体一般吧",
					desc: "白毛的游戏下载以后好多显示的都是旧安卓系统，不能玩什么的，太难了",
					rate: 4,
					from: "来自武汉",
					user_name: "Philzhu",
					avatar: "http://img.vilipix.com/picture/logo/2021/01/14/18/27/19584193_a04c8fff7691481790e49876dfdb6d82_170.png",
					time: "7小时前",
					
				}, {
					title: "总体一般吧",
					desc: "白毛的游戏下载以后好多显示的都是旧安卓系统，不能玩什么的，太难了",
					rate: 4,
					from: "来自武汉",
					user_name: "Philzhu",
					avatar: "http://img.vilipix.com/picture/logo/2021/01/14/18/27/19584193_a04c8fff7691481790e49876dfdb6d82_170.png",
					time: "7小时前",
					
				}, {
					title: "总体一般吧",
					desc: "白毛的游戏下载以后好多显示的都是旧安卓系统，不能玩什么的，太难了",
					rate: 4,
					from: "来自武汉",
					user_name: "Philzhu",
					avatar: "http://img.vilipix.com/picture/logo/2021/01/14/18/27/19584193_a04c8fff7691481790e49876dfdb6d82_170.png",
					time: "7小时前",
					
				}
			]
		}
	}
}
</script>

<style lang="scss">
.ci-comment-container {
	.comment-item {
		background: #f5f6f7;
		padding: 15px;
		border-radius: 4px;
		margin-bottom: 10px;
		.comment-header {
			.user_name {
				font-weight: bold;
				margin-bottom: 1px;
			}
			.cu-avatar {
				width: 40px;
				height: 40px;
				font-size: 1em;
			}
		}
		.title {
			margin: 10px 0px;
			font-size: 14px;
			font-weight: bold;
		}
		.desc {
			line-height: 24px;
			font-size: 13px;
			font-weight: 1.1px;
		}
		.footer {
			margin-top: 10px;
			font-size: 11px;
			.good {
				font-size: 16px;
				
			}
		}
	}
}
</style>
