<template>
	<view class="content" >
		<limeClipper :width="options.width" 
			:scale-ratio="2" 
			:is-lock-width="false" 
			:is-lock-height="false" 
			:height="options.height" 
			:image-url="path"  
			@success="successFn" @cancel="cancel" />
	</view>
</template>
<script>
import limeClipper from './limeClipper/limeClipper.vue';
export default {
	components: {limeClipper},
	data() {return {path: '',options:{"width":600,"height":600}}},
	onLoad({path,options}) {
		this.path = path
		console.log('path-path-path-path',path);
		if(options){
			this.options = JSON.parse(options)
		}
	},
	methods:{
		successFn(e){
			this.uploadImgToUnicloud(e.url,(url)=>{
				this.getOpenerEventChannel().emit('uploadAvatarAfter', {url})
				uni.navigateBack()
			})
		},
		uploadImgToUnicloud(url,callback){
			uni.showLoading()
			uniCloud.uploadFile({
				cloudPath:Math.ceil((Math.random()+Math.random()+Math.random()+1)*1000000)+Date.now()+".png",
				filePath:url
			})
			.then(res=>{
				console.log(res);
				callback(res.fileID)
				uni.hideLoading()
			})
		},
		cancel(){
			uni.navigateBack()
		}
	}
}
</script>

<style>
	.box{
		width: 400rpx;
	}
	.mt{
		margin-top: -10px;
	}
</style>