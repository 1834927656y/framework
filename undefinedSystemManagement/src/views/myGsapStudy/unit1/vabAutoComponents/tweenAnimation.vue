<template>
  <form>
    <label>
      <input type="radio" id="to" name="method" value="to" checked>
      to</label>
    <label>
      <input type="radio" id="from" name="method" value="from">
      from</label>
    <label>
      <input type="radio" id="fromTo" name="method" value="fromTo">
      fromTo</label>
    <label>
      <input type="radio" id="set" name="method" value="set">
      set</label>
  </form>

  <svg viewBox="0 0 100 20">
    <circle class="outline from-outline" stroke="grey" fill="none" stroke-dasharray='1.2' stroke-width="0.3" cx="10" cy="10" r="9.7" />
    <circle class="outline center-outline" stroke="grey" fill="none" stroke-dasharray='1.2' stroke-width="0.3" cx="50" cy="10" r="9.7" />
    <circle class="outline to-outline" stroke="grey" fill="none" stroke-dasharray='1.2' stroke-width="0.3" cx="90" cy="10" r="9.7" />
    <circle class="circle" stroke-width="0.3" fill="#0ae448" cx="50" cy="10" r="10" />
  </svg>
<div class="code-container">
  
    <code class="code-to language-js">
      gsap.to(".circle", {
      x: 40,
      fill: 'blue',
      });
      指定目标地点
    </code>

    <code class="code-from language-js">
      gsap.from(".circle", {
      x: -40,
      fill: 'blue',
      });
      指定从何处而来
    </code>

    <code class="code-fromTo language-js">
      gsap.fromTo( ".circle",{
      x: -40,
      fill: 'blue',
      },
      {
      x: 40,
      fill: 'green'
      });
      从何处去何处
    </code>
  
  <code class="code-set language-js">
      gsap.set(".circle", {
      x: 40,
      fill: 'blue',
      });
      直接定位到某处，相当于没有设置duration时间的to
    </code>
  </div>
</template>

<script setup lang="ts">
let tl = gsap.timeline();

onMounted(() => {
  // 在组件挂载后执行 DOM 操作
  gsap.set(".outline, code", { autoAlpha: 0 });
  gsap.set(".code-to", {
    autoAlpha: 1
  })

  var form = document.querySelector("form");
  if (form) {  // 添加安全检查
    form.addEventListener("change", function () {
      let type = (document.querySelector('input[name="method"]:checked') as HTMLInputElement)?.value;

      gsap.set(".circle", { clearProps: "all" });
      gsap.set(".outline, code", { autoAlpha: 0 });

      tl.clear();
      switch (type) {
        case "to":
          tl.set(".code-to", {
            autoAlpha: 1
          })
          .to(".to-outline", {
            autoAlpha: 1
          }).to(".circle", {
            duration: 1.1,
            ease: "none",
            x: 40,
            fill: "#00bae2"
          });
          break;
        case "set":
          tl.set(".code-set", {
            autoAlpha: 1
          }).set(".circle", {
            x: 40,
            fill: "#00bae2"
          }, "+=0.5");
          break;
        case "from":
          tl.set(".code-from", {
            autoAlpha: 1
          })
          .to(".from-outline", {
            autoAlpha: 1
          }).from(".circle", {
            duration: 1.1,
            ease: "none",
            x: -40,
            fill: "#00bae2"
          });
          break;
        case "fromTo":
          tl.set(".code-fromTo", {
            autoAlpha: 1
          })
            .to([".from-outline", ".to-outline"], {
              autoAlpha: 1,
              stagger: 0.25
            })
            .fromTo(
              ".circle",
              {
                x: -40,
                fill: "#00bae2"
              },
              {
                duration: 1.5,
                ease: "none",
                x: 40,
                fill: "#0ae448"
              }
            );
      }
    });
  }
});

</script>

<style scoped lang="scss">
/* Global styles come from external css https://codepen.io/GreenSock/pen/gOWxmWG */

body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #0e100f;
}

.token.function {
  color: #93c763;
}

main > * + * {
  margin-top: 1rem;
}

.box {
  display: block;
}

form {
  display: flex;
  font-size: 1.3rem;
}

form > * + * {
  margin-left: 0.5rem;
}

svg {
  /*   height: 100vh; */
  max-width: 50vw;
  overflow: visible;
}

code {
  padding: 1rem !important;
}

.outline {
  visibility: hidden;
}

.code-container {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

code {
  position: absolute;
}
</style>
