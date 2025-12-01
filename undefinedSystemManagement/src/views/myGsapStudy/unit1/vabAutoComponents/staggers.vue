<template>
  <div class="container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
    const grid = {
        rows: 4,
        cols: 17,
        gutter: 10,
    };
      
    const onCellClick = (cell: any) => {
        console.log(cell)
    }
    
    const buildGrid = ({grid, className, width, parent, onCellClick}: any) => {
        const {rows, cols, gutter} = grid;
        const containerWith = (width - cols * gutter) / cols;
        const containerHeight = containerWith
        const container = document.querySelector(parent);
        const gridContainer = document.createElement("div");
        gridContainer.className = "grid-container";
        gridContainer.style.width = width + "px";
        gridContainer.style.display = "flex";
        gridContainer.style.flexWrap = "wrap";
        gridContainer.style.gap = gutter + "px";
        container.appendChild(gridContainer);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement("div");
                cell.className = className;
                cell.style.width = containerWith + "px";
                cell.style.height = containerHeight + "px";
                cell.style.backgroundColor = "red";
                gridContainer.appendChild(cell);
            }
        }
    }

    const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        yoyo: true,
    });

    const animateGrid = (form,axios,ease) => {
        tl.to('.box', {
            duration: 1, //总运行时间
            scale: 0, //缩放
            y: 60,
            yoyo: true, //是否循环
            repeat: 1, //重复次数
            ease: "power1.inOut", //缓动函数
            stagger: {
                amount: 2,//总运行时间
                // each: 5,//每个元素运行时间
                grid: [grid.rows, grid.cols], //网格大小
                axis: axios, //轴向
                ease: ease, //缓动函数
                from: form //起始位置
            }
        })
    }
  
    onMounted(() => {
        buildGrid({grid: grid, className: "box", width: 1000, parent: ".container", onCellClick: onCellClick});
        animateGrid("random","","power3.inOut");
    })
    

</script>

<style scoped lang="scss">
.ul-container {
  width: 100vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ul-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  list-style: none;
  margin-bottom: 10px;
  li{
    width: 100%;
    height: 100%;
    .svg-list {
        width: 100px;
        height: 100px;
    }
  }
  
}
</style>
