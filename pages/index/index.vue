<template>
	<view class="index-container">
		<qk-statusbar-block></qk-statusbar-block>
		<view class="text-center" >
			<tui-tab :tabs="tabNames"
				selectedColor="#333"
				sliderHeight="3px"
				sliderRadius="3px"
				sliderBgColor="#1d90eb" 
				bold :size="30" 
				scroll 
				:current="tabIndex" 
				@change="ontabtap">
			</tui-tab>	
			<swiper :style="{height: `${swiper_height - 45 - statusBarHeight}px`}"
				@change="ontabchange"
				:current="tabIndex" 
				class="index-swiper-box" 
				style="flex: 1;" 
				:duration="300"  >
				<swiper-item class="swiper-item">
					推荐内容
				</swiper-item>
				<swiper-item class="swiper-item">
					<adopt :height="swiper_height - 45 - statusBarHeight" />
				</swiper-item>
				<swiper-item class="swiper-item">
					猫舍推荐
				</swiper-item>
				<swiper-item class="swiper-item">
					平台推荐
				</swiper-item>
			</swiper>	
		</view>
	</view>
</template>

<script>
	import adopt from '@/pages/index/adopt/adopt.vue';
	export default {
		components: {
			adopt	
		},
		data() {
			return {
				tabIndex: 1,
				tabNames: ['推荐', '领养', '猫舍', '平台'],
				statusBarHeight: uni.getSystemInfoSync()['statusBarHeight'],
				swiper_height: uni.getSystemInfoSync().windowHeight,
			}
		},
		async mounted () {
			// 使用 uniCloud 访问
			// let res = await uniCloud.callFunction({
			//   name: 'chongai-api', // 要调用的云函数名称
			//   data: { action: 'hello/sayHello' }
			// })	
			// console.info(res);
		},
		methods: {
			async ontabtap(e) {
				let index = e.index;
				this.switchTab(index);
			},
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.tabIndex === index) return;
				this.tabIndex = index;
			}
		}
	}
</script>

<style lang="scss">
.index-container {
	.index-swiper-box {
		background-color: #f5f6f7;
	}
}
</style>
