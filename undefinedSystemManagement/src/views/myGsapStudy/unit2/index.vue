<template>
  <div class="particle-container">
    <canvas ref="canvasRef" id="particleCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  baseSize: number
  color: string
  speed: number
  angle: number
}

const canvasRef = ref<HTMLCanvasElement>()
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let mouseX = 0
let mouseY = 0
let animationId: number | null = null

// 粒子配置
const particleCount = 50
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe']

// 初始化画布
const initCanvas = () => {
  if (!canvasRef.value) return
  
  canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  
  // 设置画布尺寸为窗口大小
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  // 初始化粒子
  initParticles()
  
  // 开始动画
  animate()
}

// 初始化粒子
const initParticles = () => {
  particles = []
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      size: Math.random() * 5 + 2,
      baseSize: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.5 + 0.1,
      angle: Math.random() * Math.PI * 2
    })
  }
  
  // 为每个粒子创建呼吸动画
  particles.forEach((particle) => {
    gsap.to(particle, {
      size: particle.baseSize * 2,
      duration: 1.5 + Math.random() * 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  })
}

// 绘制粒子
const drawParticles = () => {
  if (!ctx) return
  
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  particles.forEach((particle) => {
    // 计算粒子到鼠标的距离
    const dx = mouseX - particle.baseX
    const dy = mouseY - particle.baseY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // 如果鼠标在附近，粒子会被吸引
    const maxDistance = 150
    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance
      const angle = Math.atan2(dy, dx)
      
      particle.x += Math.cos(angle) * force * 5
      particle.y += Math.sin(angle) * force * 5
    } else {
      // 否则粒子缓慢回到基础位置
      particle.x += (particle.baseX - particle.x) * 0.05
      particle.y += (particle.baseY - particle.y) * 0.05
    }
    
    // 绘制粒子
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle = particle.color
    ctx.globalAlpha = 0.8
    ctx.fill()
    
  })
  
  ctx.globalAlpha = 1
}

// 动画循环
const animate = () => {
  drawParticles()
  animationId = requestAnimationFrame(animate)
}

// 鼠标移动事件
const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

// 窗口大小改变事件
const handleResize = () => {
  if (!canvas) return
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  // 重新初始化粒子位置
  particles.forEach((particle) => {
    particle.baseX = Math.random() * canvas.width
    particle.baseY = Math.random() * canvas.height
  })
}

onMounted(() => {
  initCanvas()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
  
  // 清理所有 GSAP 动画
  particles.forEach((particle) => {
    gsap.killTweensOf(particle)
  })
})
</script>

<style scoped lang="scss">
.particle-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

#particleCanvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
