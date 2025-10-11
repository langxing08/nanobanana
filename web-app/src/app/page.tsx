'use client';

import { useState } from 'react';

export default function Page() {
  type EditorTab = 'image' | 'text';
  const [activeTab, setActiveTab] = useState<EditorTab>('image');
  const tabs: { id: EditorTab; label: string; icon: string }[] = [
    { id: 'image', label: '图生图', icon: '🖼️' },
    { id: 'text', label: '文生图', icon: '📝' },
  ];

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

      {/* 试用 AI 编辑器 */}
      <section className="section mt-16">
        <div className="section-inner">
          <div className="text-center">
            <p className="text-[12px] font-bold text-banana-500">开始使用</p>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[0.5px]">试用 AI 编辑器</h2>
            <p className="mt-2 text-[12px] text-[#8a8a8a]">体验 Nano Banana 的自然语言图像编辑能力，用简单的文字命令变换任何图片。</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="rounded-[30px] border border-[#f6e8c9] bg-gradient-to-br from-[#fffef9] via-[#fff9e7] to-[#fff4d8] p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-banana-300 text-lg text-white">✏️</div>
                <div>
                  <div className="text-[14px] font-semibold text-[#a67200]">提示引擎</div>
                  <p className="mt-1 text-[12px] text-[#ba8600]">
                    {activeTab === 'image' ? '用 AI 技术编辑变换您的图像' : '描述您的愿景，瞬间变为现实'}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-full border border-[#fce6af] bg-white/80 p-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 rounded-full px-4 py-2 text-[12px] font-semibold transition-colors duration-200 flex items-center justify-center gap-1 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#ffc76b] via-[#ffb447] to-[#ff9c35] text-white shadow-soft'
                          : 'text-[#caa24a] hover:text-[#a47c1b]'
                      }`}
                    >
                      <span className="text-[14px]">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                {activeTab === 'image' ? (
                  <>
                    <div className="rounded-2xl border border-[#f7e3b6] bg-[#fff6e3] p-3">
                      <div className="flex items-center gap-2 text-[12px] text-[#c08c1c]">
                        <span className="rounded-pill bg-banana-400 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">Pro</span>
                        <span className="font-semibold">批量生成</span>
                        <span className="text-[#d0aa58]">可同时运行多个任务，生成多张输出图片</span>
                      </div>
                      <button className="ml-auto mt-3 inline-flex items-center gap-1 rounded-full border border-[#f7d58f] px-3 py-1 text-[11px] font-semibold text-[#b27c05] transition-colors hover:text-[#8f6100]">
                        升级
                        <span className="text-[13px]">⚡</span>
                      </button>
                    </div>

                    <div className="mt-5 space-y-5 text-[12px] text-[#a37b16]">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-semibold">
                            <span className="text-[16px]">🖼️</span>
                            <span>参考图像</span>
                          </div>
                          <span className="text-[#caa24a]">0/9</span>
                        </div>
                        <div className="mt-2 grid h-[140px] place-items-center rounded-2xl border border-dashed border-[#f3d69c] bg-[#fffcf3] text-[#d0b367]">
                          <div className="text-center">
                            <div className="text-[20px]">＋</div>
                            <div>添加图片</div>
                            <div className="text-[10px] text-[#daba6f]">最大 50MB</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 font-semibold">
                          <span className="text-[16px]">💡</span>
                          <span>主提示词</span>
                        </div>
                        <textarea
                          className="mt-2 h-[120px] w-full rounded-2xl border border-[#f3d69c] bg-white/70 p-4 text-[12px] text-[#8c6a0a] outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(253,223,162,0.45)]"
                          placeholder="输入详细提示词，如：黄昏的城市街头，保持角色服装与参考图一致"
                        />
                        <div className="mt-2 flex items-center justify-between text-[11px] text-[#caa24a]">
                          <button className="inline-flex items-center gap-1 rounded-full border border-[#f3d69c] px-3 py-1 text-[#b98700] transition-colors hover:text-[#8f6100]">
                            复制
                            <span className="text-[13px]">⎘</span>
                          </button>
                          <span>支持中英文混合指令</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl border border-[#f4dfb3] bg-white/75 p-4 text-[#b88a17]">
                      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#a37200]">
                        <span className="text-[16px]">✨</span>
                        <span>主提示词构思助手</span>
                      </div>
                      <p className="mt-2 text-[12px] text-[#caa24a]">填写场景、角色、光线与风格描述，Nano Banana 即可生成全新画面。</p>
                    </div>

                    <div className="mt-5 text-[12px] text-[#a37b16]">
                      <div className="flex items-center gap-2 font-semibold">
                        <span className="text-[16px]">💡</span>
                        <span>主提示词</span>
                      </div>
                      <textarea
                        className="mt-2 h-[160px] w-full rounded-2xl border border-[#f3d69c] bg-white/85 p-4 text-[12px] text-[#8c6a0a] outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(253,223,162,0.45)]"
                        placeholder="例如：由纳米技术驱动的未来城市，黄金时段照明，超高清细节，富有电影感..."
                      />
                      <div className="mt-2 flex items-center justify-between text-[11px] text-[#caa24a]">
                        <button className="inline-flex items-center gap-1 rounded-full border border-[#f3d69c] px-3 py-1 text-[#b98700] transition-colors hover:text-[#8f6100]">
                          复制
                          <span className="text-[13px]">⎘</span>
                        </button>
                        <span>可用逗号分隔场景、角色与风格</span>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-2 rounded-2xl border border-dashed border-[#f7e5bc] bg-[#fffaf0] p-4 text-[11px] text-[#caa24a]">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px]">🎨</span>
                        <span>提示结构建议：主题 + 环境 + 风格 + 光线</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px]">⏱️</span>
                        <span>
                          平均生成时间 <span className="font-semibold text-[#a67200]">≈ 5 秒</span>
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffc76b] via-[#ffb447] to-[#ff9c35] px-5 py-4 text-[14px] font-semibold text-white shadow-soft transition-transform hover:scale-[1.01]">
                ⚡ 立即生成
              </button>
            </div>

            <div className="flex flex-col rounded-[30px] border border-[#f6e8c9] bg-gradient-to-b from-white to-[#fff9ed] p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <div>
                  <div className="text-[14px] font-semibold text-[#a67200]">输出画廊</div>
                  <p className="mt-1 text-[12px] text-[#ba8600]">您的创作将即时显示在这里</p>
                </div>
              </div>
              <div className="mt-5 flex-1 rounded-[26px] border border-dashed border-[#f3d69c] bg-[#fffcf3] p-10 text-center text-[12px] text-[#caa24a]">
                <div className="mx-auto flex h-full max-w-[240px] flex-col items-center justify-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#f3d69c] bg-white text-[26px] text-[#d2ad55]">
                    🖼️
                  </div>
                  <div className="font-semibold text-[#a67200]">准备即时生成</div>
                  <p className="text-[#caa24a]">输入提示词，释放强大力量</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么选择 */}
      <section className="section mt-20">
        <div className="section-inner text-center">
          <p className="text-[12px] font-semibold tracking-[2px] text-[#f29b1d] uppercase">核心功能</p>
          <h2 className="mt-3 text-[32px] font-extrabold text-[#1f2937]">为什么选择Nano Banana?</h2>
          <p className="mt-3 text-[14px] leading-6 text-[#6b7280]">
            Nano Banana 是 LMArena 上最先进的 AI 图像编辑器。用自然语言理解彻底改变您的照片编辑方式。
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: '💡',
                title: '自然语言编辑',
                copy: '简单提示即可编辑图像，Nano Banana AI 像图像版 GPT 一样理解复杂指令。',
              },
              {
                icon: '🧩',
                title: '角色一致性',
                copy: '在编辑全程保持角色特征与服装细节，连贯故事无需后期修补。',
              },
              {
                icon: '🌆',
                title: '场景保留',
                copy: '无缝融合编辑内容与原始背景，场景过渡能力领先 Flux Kontext。',
              },
              {
                icon: '⚙️',
                title: '一键编辑',
                copy: '一次尝试就能获得理想效果，快速完成批量修图工作。',
              },
              {
                icon: '📚',
                title: '多图上下文',
                copy: '一次处理多张图像，支持复杂的多层次编辑流程。',
              },
              {
                icon: '🎯',
                title: 'AI UGC 创作',
                copy: '打造一致的 AI 影响者与 UGC 内容，适配社交媒体与营销活动。',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-[#fbeaca] bg-gradient-to-b from-[#fffcf5] via-[#fff8ea] to-[#fff3e4] p-6 text-left shadow-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffcc75] text-[18px] text-white shadow-soft">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-[#1f2937]">{feature.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-[#6b7280]">{feature.copy}</p>
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
