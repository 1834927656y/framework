<template>
  <div style="width: 100%;height: 100%;display: flex; flex-direction: column; gap: 16px;">
    <div class="app-container" :style="{backgroundColor: backgroundColor}">
      <div class="app-icon">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
    <div class="app-title">
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  appNumber: number,
  title: string,
  backgroundColor?: string

}>()
const canvasRef = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

const draw1 = () => {
  // 先绘制六边形
  const coordinate = ref([])
  for (let i = 0; i < 6; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 3 
    const x = canvasRef.value.width/2 + canvasRef.value.width/2 * Math.cos(angle)
    const y = canvasRef.value.height/2 + canvasRef.value.height/2 * Math.sin(angle)
    coordinate.value.push({ x, y })
  }
  
  // 绘制六边形
  ctx.value.fillStyle = 'rgba(255, 255, 255, 1)'
  ctx.value.beginPath()
  ctx.value.moveTo(coordinate.value[0].x, coordinate.value[0].y)
  for (let i = 1; i < coordinate.value.length; i++) {
    ctx.value.lineTo(coordinate.value[i].x, coordinate.value[i].y)
  }
  ctx.value.closePath()
  ctx.value.fill()

  // 绘制带缺口的圆形
  const centerX = canvasRef.value.width / 2
  const centerY = canvasRef.value.height / 2
  const radius = canvasRef.value.width / 4  // 画布宽度的四分之一
  ctx.value.strokeStyle = '#000'
  ctx.value.fillStyle = 'rgba(1, 87, 155, 1)'
  ctx.value.lineWidth = 2
  ctx.value.beginPath()
  ctx.value.moveTo(centerX+radius, centerY+radius*1.2)
  ctx.value.arc(centerX, centerY, radius, 0, -Math.PI*1.6,true)
  ctx.value.closePath()
  ctx.value.fill()

  //绘制内部小圆
  ctx.value.strokeStyle = '#000'
  ctx.value.fillStyle = 'rgba(255, 255, 255, 1)'
  ctx.value.beginPath()
  ctx.value.arc(centerX, centerY, radius/6, 0, 2*Math.PI,true)
  ctx.value.arc(centerX-3*radius/6, centerY, radius/6, 0, 2*Math.PI,true)
  ctx.value.arc(centerX+3*radius/6, centerY, radius/6, 0, 2*Math.PI,true)
  ctx.value.closePath()
  ctx.value.fill()

}
const draw2 = () => {
  const { width, height } = canvasRef.value.getBoundingClientRect() 
  const x1 = width/4
  const y1 = height/2
  const x2 = width/2
  const y2 = height/2
  const x3 = width/4*3
  const y3 = height/2
  const radius = width/4
  
  // 清除画布
  ctx.value.clearRect(0, 0, width, height)
  
  // 定义三个圆的渐变
  const blueGradient = ctx.value.createLinearGradient(
   x1,y1+radius,x1,y1-radius
  )
  blueGradient.addColorStop(0, 'rgba(67, 189, 244, 0.7)')    // 亮蓝色
  blueGradient.addColorStop(1, 'rgba(134, 64, 165, 0.7)')    // 深蓝色
  
  const purpleGradient = ctx.value.createLinearGradient(
    x2+radius,y2+radius,x2,y2-radius
  )
  purpleGradient.addColorStop(0, 'rgba(134, 64, 165, 0.7)')  
  purpleGradient.addColorStop(1, 'rgba(171, 42, 48, 0.7)') 
  
  const orangeGradient = ctx.value.createLinearGradient(
    x3,y3+radius,x3,y3-radius
  )
  orangeGradient.addColorStop(0, 'rgba(233, 197, 183, 0.7)') 
  orangeGradient.addColorStop(1, 'rgba(244, 168, 88, 0.7)')  
  
  // 绘制三个圆
  // 左上圆（蓝色）
  ctx.value.beginPath()
  ctx.value.fillStyle = blueGradient
  ctx.value.arc(x1, y1, radius, 0, Math.PI * 2)
  ctx.value.fill()
  
  // 右上圆（紫色）
  ctx.value.beginPath()
  ctx.value.fillStyle = purpleGradient
  ctx.value.arc(x2, y2, radius, 0, Math.PI * 2)
  ctx.value.fill()
  
  // 下方圆（橙色）
  ctx.value.beginPath()
  ctx.value.fillStyle = orangeGradient
  ctx.value.arc(x3, y3, radius, 0, Math.PI * 2)
  ctx.value.fill()
  


}
const draw3 = () => {
  const { width, height } = canvasRef.value.getBoundingClientRect() 
  // 设置文字样式
  ctx.value.font = 'bold 46px PingFang SC'  // 字体大小和字体族
  // ctx.value.textAlign = 'center'            // 文字水平对齐方式
  ctx.value.textBaseline = 'top'         // 文字垂直对齐方式
  ctx.value.fillStyle = '#ffffff'           // 文字颜色
  // 方法1：普通文字
  ctx.value.fillText('ZPT', 10, 42)
}
const draw4 = () => {
  const x = canvasRef.value.width/2
  const y = canvasRef.value.height/2*3
  const radius = canvasRef.value.width/3*3
  ctx.value.strokeStyle = 'rgba(0,0,0, 1)'
  ctx.value.beginPath()
  ctx.value.arc(x,y,radius,0,Math.PI*2)
  ctx.value.stroke()
  ctx.value.closePath()
  ctx.value.font = 'bold 36px PingFang SC'  // 字体大小和字体族
  ctx.value.textBaseline = 'top' 
  ctx.value.fillStyle = 'rgba(0,0,0, 1)'           // 文字颜色
  ctx.value.fillText('ZPT', 20, 68)
}
const draw5 = () => {
  const x = canvasRef.value.width/2
  const y = canvasRef.value.height/3
  const radius = canvasRef.value.width/4
  ctx.value.lineWidth = 4                   // 线条宽度
  ctx.value.strokeStyle = '#1890ff'          // 线条颜色
  ctx.value.lineJoin = 'round'  
  ctx.value.fillStyle = 'rgba(2, 155, 227, 1)'
  ctx.value.beginPath()
  ctx.value.arc(x,y,radius,Math.PI/7,Math.PI*7/8,true)
  ctx.value.lineTo(x,y*2.8)
  ctx.value.closePath()
  ctx.value.stroke()
  // ctx.value.fill()
}
const draw6 = () => {
  const gradient = ctx.value.createLinearGradient(0,0,canvasRef.value.width,canvasRef.value.height)
  gradient.addColorStop(0, 'rgba(91, 36, 122, 0.6)')
  gradient.addColorStop(1, 'rgba(27, 206, 223, 0.6)')
  ctx.value.fillStyle = gradient
  ctx.value.beginPath()
  ctx.value.fillRect(0,0,canvasRef.value.width*3/4,canvasRef.value.height*3/4)
  ctx.value.fillRect(canvasRef.value.width*1/4,canvasRef.value.width*1/4,canvasRef.value.width*2/3,canvasRef.value.height*2/3)
  ctx.value.fillRect(canvasRef.value.width*5/9,canvasRef.value.width*5/9,canvasRef.value.width/2,canvasRef.value.height/2)
  ctx.value.fill()
}
// 在 drawTitle 对象中添加新的绘制函数
const drawTitle = ref({
  1: draw1,
  2: draw2,  // 三圆图标
  3: draw3,  // 文字图标
  4: draw4,  // 圆环图标
  5: draw5,  // 圆弧图标
  6: draw6,  // 渐变图标
})

watchEffect(()=>{
  if(canvasRef.value && props.appNumber ){
    ctx.value = canvasRef.value.getContext('2d')
    const {width,height} = canvasRef.value.getBoundingClientRect()   
    canvasRef.value.width = width
    canvasRef.value.height = height
    drawTitle.value[props.appNumber]()
  }
})
</script>

<style scoped lang="scss">
.app-container{
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 20%;
  position: relative;
  cursor: pointer;
  
  // 基础阴影效果
  box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
  
  // 添加过渡效果
  transition: all 0.3s ease;
  
  // 鼠标悬停效果
  &:hover {
    // 阴影加深
    box-shadow: 0 8px 24px rgba(0, 0, 0, 1);
    // 向上偏移
    transform: translateY(-4px);
    // 可选：轻微放大
    // transform: translateY(-4px) scale(1.02);
  }
  
  // 点击效果
  &:active {
    // 阴影减小
    box-shadow: 0 2px 6px rgba(0, 0, 0, 1);
    // 向下偏移
    transform: translateY(2px);
  }

  &:active::after {
    opacity: 1;
  }

  // 可选：添加点击时的缩放效果
  &:active {
    transform: translateY(2px) scale(0.98);
  }

  .app-icon{
    position: absolute;
    inset: 10%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    
    canvas{
      width: 100%;
      height: 100%;
    }

    // 添加 ZPT 文字样式
    .zpt-text {
      font-size: 46px;
      color: #ffffff;
      // 可选：添加悬停效果
     
    }
  }
}

.app-title{
  width: 100%;
  height: 8%;
  color: #070604;
  font-family: 'PingFang SC';
  font-size: 22px;
  text-align: center;
}

</style>
