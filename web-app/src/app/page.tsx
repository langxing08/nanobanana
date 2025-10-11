export default function Page() {
  return (
    <main className="w-full">
      {/* 首屏品牌 Hero */}
      <section className="section pt-20 pb-16">
        <div className="section-inner text-center">
          <div className="inline-flex items-center gap-2 rounded-pill border border-banana-200 bg-banana-50 px-6 py-2 text-[14px] text-banana-600 shadow-soft">
            <span className="text-[18px]">🍌</span>
            <span>超越 Flux Kontext 的 AI 模型</span>
            <a className="ml-2 font-semibold text-banana-600 hover:text-banana-500 transition-colors" href="#">
              立即试用 →
            </a>
          </div>
          <h1 className="mt-10 text-[60px] font-extrabold text-banana-500 tracking-[1px]">Nano Banana</h1>
          <p className="mt-4 text-[16px] leading-8 text-[#485268]">
            用简单的文字提示变换任何图像。Nano Banana的先进模型提供超越 Flux Kontext 的一致性角色编辑和场景保留。体验 AI 图像编辑的未来。
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              className="inline-flex items-center gap-2 rounded-pill bg-banana-400 px-8 py-3 text-[16px] font-semibold text-white shadow-soft hover:bg-banana-500 transition-colors"
              href="#"
            >
              开始编辑
              <span className="text-[18px]">🍌</span>
            </a>
            <a
              className="inline-flex items-center justify-center rounded-pill border border-banana-300 bg-white px-8 py-3 text-[16px] font-semibold text-banana-600 shadow-soft hover:border-banana-400 hover:text-banana-500 transition-colors"
              href="#"
            >
              查看示例
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-[13px] text-[#4b5563]">
            <div className="flex items-center gap-2">
              <span className="text-[20px]">🛠️</span>
              <span>一键编辑</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[20px]">🔁</span>
              <span>多图支持</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[20px]">🗣️</span>
              <span>自然语言</span>
            </div>
          </div>
        </div>
      </section>

      {/* 试用编辑器 区域标题 */}
      <section className="section mt-16">
        <div className="section-inner">
          <div className="text-center">
            <p className="text-[12px] text-banana-500 font-bold">开始使用</p>
            <h2 className="text-[22px] font-semibold mt-2">试用 AI 编辑器</h2>
            <p className="text-[12px] text-[#8a8a8a] mt-1">体验自然语言图像编辑能力。用简单的文字命令变换任何图片。</p>
          </div>
        </div>
      </section>

      {/* 编辑器卡片（静态 mock） */}
      <section className="section mt-6">
        <div className="section-inner">
          <div className="card p-3">
            <div className="panel-yellow rounded-xl p-2 text-[12px] text-[#7a5600] font-semibold flex items-center">
              <div className="w-full bg-banana-100 rounded-full h-[18px] relative">
                <div className="absolute left-0 top-0 h-full bg-banana-300 rounded-full" style={{width:'68%'}} />
              </div>
              <div className="ml-2">67.9%</div>
              <button className="ml-auto text-xs capsule-yellow px-3 py-1">保存</button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="card-soft p-3">
                <p className="text-[12px] text-[#7a7a7a] mb-2">上传图片</p>
                <div className="border border-[#f0ead9] rounded-xl h-[220px] grid place-items-center text-[#b6b6b6]">
                  <div className="text-center text-[12px]">
                    <div className="text-[20px]">🖼️</div>
                    <div>点击上传</div>
                  </div>
                </div>
              </div>
              <div className="card-soft p-3">
                <p className="text-[12px] text-[#7a7a7a] mb-2">编辑指令</p>
                <textarea className="w-full h-[220px] rounded-xl border border-[#f0ead9] p-3 outline-none" placeholder="例如：把人物换到海边，保持服装风格一致" />
              </div>
            </div>

            <div className="mt-3 h-[280px] border border-[#f0ead9] rounded-xl grid place-items-center text-[#a0a0a0] bg-[#fcfcfc]">
              <div className="text-center text-[12px]">
                <div className="text-[22px]">🖼️</div>
                <div>生成效果预览</div>
                <div className="text-[#c0c0c0]">拖入图片以开始</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么选择 */}
      <section className="section mt-16">
        <div className="section-inner text-center">
          <p className="text-[12px] text-banana-500 font-bold">为什么</p>
          <h2 className="text-[20px] font-semibold mt-2">为什么选择Nano Banana?</h2>
          <p className="text-[12px] text-[#8a8a8a] mt-1">从一致性角色编辑到场景保留，打造可靠且易用的 AI 编辑体验</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {Array.from({length:4}).map((_,i)=> (
              <div key={i} className="card-soft p-4 text-left">
                <div className="text-[20px] mb-2">🍋</div>
                <h3 className="font-semibold mb-1">优势点 {i+1}</h3>
                <p className="text-[12px] text-[#777]">简短描述，解释该优势如何提升编辑质量与效率。</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 闪电般的 AI 创作（示例卡） */}
      <section className="section mt-16">
        <div className="section-inner text-center">
          <p className="text-[12px] text-banana-500 font-bold">常用模版</p>
          <h2 className="text-[20px] font-semibold mt-2">闪电般的 AI 创作</h2>
          <p className="text-[12px] text-[#8a8a8a] mt-1">只需几步即可完成</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {Array.from({length:4}).map((_,i)=> (
              <div key={i} className="card-soft p-4 h-[180px] text-left grid">
                <div className="justify-self-end text-[10px] text-white bg-banana-400 rounded-pill px-2 py-0.5">{i%2? '人像增强': '风格转换'}</div>
                <div className="self-end">
                  <h3 className="font-semibold mb-1">模版 {i+1}</h3>
                  <p className="text-[12px] text-[#777]">放入图片，点击开始即可</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6"><a className="rounded-pill bg-banana-300 text-ink h-[36px] inline-flex items-center px-4 shadow-soft" href="#">开始使用</a></div>
        </div>
      </section>

      {/* 创作者的声音 */}
      <section className="section mt-16">
        <div className="section-inner">
          <p className="text-[12px] text-banana-500 font-bold text-center">评价</p>
          <h2 className="text-[20px] font-semibold mt-2 text-center">创作者的声音</h2>
          <div className="mt-4 grid gap-3">
            {['@sashimi', '@generate', '@theo'].map((name, i)=> (
              <div key={i} className="card p-4 flex items-center gap-3 bg-gradient-to-r from-white to-[#fff6e9]">
                <div className="w-7 h-7 rounded-full bg-banana-300" />
                <div className="text-[12px] flex-1">
                  <div className="font-semibold">{name}</div>
                  <div className="text-[#777]">非常流畅的体验，角色一致性处理得很好，推荐！</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section mt-16 mb-24">
        <div className="section-inner">
          <p className="text-[12px] text-banana-500 font-bold text-center">常见问题</p>
          <h2 className="text-[20px] font-semibold mt-2 text-center">常见问题解答</h2>
          <div className="mt-4 grid gap-3">
            {Array.from({length:5}).map((_,i)=> (
              <details key={i} className="group rounded-xl overflow-hidden border border-[#efe9d8] bg-white shadow-soft">
                <summary className="list-none cursor-pointer select-none px-4 py-3 text-[14px] font-medium flex items-center justify-between">
                  <span>问题 {i+1}</span>
                  <span className="text-[#a8a8a8]">▾</span>
                </summary>
                <div className="px-4 pb-3 text-[13px] text-[#666]">这里是回答内容的占位，说明如何使用与限制等。</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚极浅渐变 */}
      <div className="h-24 bg-gradient-to-b from-transparent to-banana-50" />
    </main>
  )
}
