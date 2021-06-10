<template>
<view class="qk-statusbar-block" :style="{height: `${statusBarHeight}px`}">
</view>
</template>

<script>
export default {
	data () {
		return {
			// 导航栏高度
			statusBarHeight: uni.getSystemInfoSync()['statusBarHeight']
		}
	}
}
</script>

<style lang="scss">
.qk-statusbar-block {
}
</style>
