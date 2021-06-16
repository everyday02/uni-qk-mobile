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
					板块一
				</swiper-item>
				<swiper-item class="swiper-item">
					板块二
				</swiper-item>
				<swiper-item class="swiper-item">
					板块三
				</swiper-item>
				<swiper-item class="swiper-item">
					板块四
				</swiper-item>
			</swiper>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 1,
				tabNames: ['推荐', '模块一', '模块二', '模块三'],
				statusBarHeight: uni.getSystemInfoSync()['statusBarHeight'],
				swiper_height: uni.getSystemInfoSync().windowHeight,
			}
		},
		async mounted () {
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
