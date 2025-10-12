'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function Page() {
  type EditorTab = 'image' | 'text';
  const [activeTab, setActiveTab] = useState<EditorTab>('image');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const tabs: { id: EditorTab; label: string; icon: string }[] = [
    { id: 'image', label: '图生图', icon: '🖼️' },
    { id: 'text', label: '文生图', icon: '📝' },
  ];
  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);
  const showcases = [
    {
      title: '超快速山景生成',
      tag: 'Nano Banana速度',
      subtitle: 'Nano Banana 优化神经引擎仅需 0.8 秒即可创建',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: '瞬间花园创作',
      tag: 'Nano Banana速度',
      subtitle: 'Nano Banana 技术毫秒级渲染复杂场景',
      image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: '实时海滩合成',
      tag: 'Nano Banana速度',
      subtitle: 'Nano Banana 以光速提供照片级逼真效果',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: '快速极光生成',
      tag: 'Nano Banana速度',
      subtitle: 'Nano Banana AI 即时处理高动态特效',
      image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1600&q=80',
    },
  ];
  const creatorTestimonials = [
    {
      name: 'AIArtistPro',
      role: '数字创作者',
      quote: '“这个编辑器完全改变了我的工作流程，角色一致性始终如一，远超以往工具。”',
      accentGradient: 'from-[#ffd76a] via-[#ffa43c] to-[#ff7d3b]',
    },
    {
      name: 'ContentCreator',
      role: 'UGC 专家',
      quote: '“创建一致的 AI 影响者从未如此简单，在编辑过程中保持完美的面部细节。”',
      accentGradient: 'from-[#ffc86c] via-[#ff9f3e] to-[#ff6f3a]',
    },
    {
      name: 'PhotoEditor',
      role: '专业编辑师',
      quote: '“场景融合异常自然，一键编辑每天都能生成客户即用的画面。”',
      accentGradient: 'from-[#ffbe63] via-[#ff8f3a] to-[#ff5f39]',
    },
  ];
  const faqItems = [
    {
      question: 'Nano Banana 是什么？',
      answerZh: 'Nano Banana 是一款专注角色一致性与场景保留的 AI 图像编辑平台，帮助创作者快速完成高质量视觉作品。',
      answerEn: 'Nano Banana is an AI image editor focused on character consistency and scene fidelity, delivering polished visuals in seconds.',
    },
    {
      question: '它是如何工作的？',
      answerZh: '通过自然语言提示与智能遮罩，系统自动理解场景上下文并执行精准编辑。',
      answerEn: 'You describe edits in natural language, and the model applies context-aware adjustments using smart masking.',
    },
    {
      question: '它比 Flux Kontext 好在哪里？',
      answerZh: 'Nano Banana 在多角色一致性、背景保留与批处理效率上均优于 Flux Kontext。',
      answerEn: 'Compared with Flux Kontext, Nano Banana excels at multi-character alignment, scene preservation, and batch speed.',
    },
    {
      question: '我可以用于商业项目吗？',
      answerZh: '可以，在遵守许可条款的前提下，商业团队可将生成素材直接用于发布。',
      answerEn: 'Yes. Commercial teams can ship outputs directly, provided the standard licensing terms are followed.',
    },
    {
      question: '它能处理什么类型的编辑？',
      answerZh: '支持角色换装、场景置换、光影微调以及多图跨镜头一致性。',
      answerEn: 'It covers wardrobe swaps, scene replacements, lighting tweaks, and cross-shot consistency for series of images.',
    },
    {
      question: '在哪里可以试用 Nano Banana？',
      answerZh: '登录 Nano Banana 控制台即可获得试用额度，体验完整的图像编辑工作流。',
      answerEn: 'Sign in to the Nano Banana console to access your trial credits and explore the full workflow.',
    },
  ];
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('请上传 50MB 以内的图片 / Please upload an image under 50MB.');
      event.target.value = '';
      return;
    }

    setImageFile(file);
    setErrorMessage(null);
    setStatusMessage(null);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = async () => {
    if (activeTab !== 'image') {
      return;
    }
    if (!imageFile) {
      setErrorMessage('请先上传参考图像 / Please upload a reference image first.');
      return;
    }
    if (!prompt.trim()) {
      setErrorMessage('请填写主提示词 / Please enter the main prompt.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setStatusMessage('正在调用 Gemini 2.5 Flash Image · Contacting Gemini 2.5 Flash Image...');

    try {
      const formData = new FormData();
      formData.append('prompt', prompt.trim());
      formData.append('image', imageFile);

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        body: formData,
      });
      const responseText = await response.text();

      let payload: { images?: unknown; error?: string } | null = null;
      try {
        payload = JSON.parse(responseText);
      } catch {
        throw new Error('无法解析模型返回结果 / Unable to parse the model response.');
      }

      if (!response.ok) {
        throw new Error(payload?.error ?? '生成失败，请稍后重试 / Generation failed, please try again.');
      }

      const images = Array.isArray(payload?.images)
        ? payload.images.filter((item): item is string => typeof item === 'string')
        : [];

      if (!images.length) {
        throw new Error('API 未返回图像，请重试 / The API did not return any images. Please try again.');
      }

      setGallery((previous) => [...images, ...previous]);
      setStatusMessage('生成完成 · Images ready!');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '生成失败，请稍后重试 / Generation failed, please try again.';
      setErrorMessage(message);
      setStatusMessage(null);
    } finally {
      setIsGenerating(false);
    }
  };

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
                          <span className="text-[#caa24a]">{imageFile ? '1/9' : '0/9'}</span>
                        </div>
                        <div className="mt-2">
                          <div className="relative h-[140px] w-full overflow-hidden rounded-2xl border border-dashed border-[#f3d69c] bg-[#fffcf3] text-[#d0b367]">
                            {imagePreview ? (
                              <>
                                <img
                                  src={imagePreview}
                                  alt="参考图像预览 / Reference preview"
                                  className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2 text-[11px] text-white">
                                  <span className="truncate rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
                                    {imageFile?.name ?? '已选择图片 / Selected image'}
                                  </span>
                                  <div className="flex justify-end">
                                    <button
                                      type="button"
                                      onClick={handleRemoveImage}
                                      className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#a15d00] transition-colors hover:bg-white"
                                    >
                                      移除 / Remove
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={handleAddImageClick}
                                className="absolute inset-0 flex h-full w-full flex-col items-center justify-center text-[#d0b367] transition-colors hover:text-[#b68d2c]"
                              >
                                <div className="text-[20px]">＋</div>
                                <div>添加图片</div>
                                <div className="text-[10px] text-[#daba6f]">最大 50MB</div>
                              </button>
                            )}
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelection}
                            className="hidden"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 font-semibold">
                          <span className="text-[16px]">💡</span>
                          <span>主提示词</span>
                        </div>
                        <textarea
                          className="mt-2 h-[120px] w-full rounded-2xl border border-[#f3d69c] bg-white/70 p-4 text-[12px] text-[#8c6a0a] outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(253,223,162,0.45)]"
                          value={prompt}
                          onChange={(event) => setPrompt(event.target.value)}
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
                    {(errorMessage || statusMessage) && (
                      <div
                        className={`mt-4 rounded-2xl border px-4 py-3 text-[11px] ${
                          errorMessage
                            ? 'border-red-200 bg-red-50/80 text-[#b54747]'
                            : 'border-[#f3d69c] bg-white/70 text-[#a67200]'
                        }`}
                      >
                        {errorMessage ?? statusMessage}
                      </div>
                    )}
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

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffc76b] via-[#ffb447] to-[#ff9c35] px-5 py-4 text-[14px] font-semibold text-white shadow-soft transition-transform hover:scale-[1.01] ${
                  isGenerating ? 'cursor-not-allowed opacity-70 hover:scale-100' : ''
                }`}
              >
                {isGenerating ? (
                  <>
                    <span className="text-[16px]">⏳</span>
                    <span>生成中 · Generating...</span>
                  </>
                ) : (
                  <>
                    <span className="text-[16px]">⚡</span>
                    <span>立即生成</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col rounded-[30px] border border-[#f6e8c9] bg-gradient-to-b from-white to-[#fff9ed] p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <div>
                  <div className="text-[14px] font-semibold text-[#a67200]">输出画廊</div>
                  <p className="mt-1 text-[12px] text-[#ba8600]">您的创作将即时显示在这里</p>
                </div>
              </div>
              <div className="mt-5 flex-1">
                {gallery.length ? (
                  <div className="grid gap-4 rounded-[26px] border border-[#f3d69c] bg-white/80 p-4 text-[12px] text-[#a67200] sm:grid-cols-2">
                    {gallery.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="group relative overflow-hidden rounded-2xl border border-[#f3d69c]/70 bg-white shadow-soft transition-transform hover:-translate-y-[2px]"
                      >
                        <img src={url} alt={`生成图像 ${index + 1}`} className="h-full w-full object-cover" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] text-white/90">
                          <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">#{index + 1}</span>
                          <a
                            href={url}
                            download={`nano-banana-${index + 1}.png`}
                            className="pointer-events-auto rounded-full bg-white/80 px-3 py-1 font-semibold text-[#a06200] transition-colors hover:bg-white"
                          >
                            下载 / Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[26px] border border-dashed border-[#f3d69c] bg-[#fffcf3] p-10 text-center text-[12px] text-[#caa24a]">
                    <div className="mx-auto flex h-full max-w-[240px] flex-col items-center justify-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#f3d69c] bg-white text-[26px] text-[#d2ad55]">
                        🖼️
                      </div>
                      <div className="font-semibold text-[#a67200]">准备即时生成</div>
                      <p className="text-[#caa24a]">输入提示词，释放强大力量</p>
                    </div>
                  </div>
                )}
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

      {/* 闪电般的 AI 创作（案例卡） */}
      <section className="section mt-20">
        <div className="section-inner text-center">
          <p className="text-[12px] font-semibold tracking-[2px] text-[#f29b1d] uppercase">案例展示</p>
          <h2 className="mt-3 text-[30px] font-extrabold text-[#1f2937]">闪电般的 AI 创作</h2>
          <p className="mt-2 text-[14px] text-[#6b7280]">见证 Nano Banana 毫秒级生成作品</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {showcases.map((showcase, index) => (
              <article
                key={index}
                className="group relative overflow-hidden rounded-[28px] border border-[#fbeaca] bg-gradient-to-b from-[#fffcf5] via-[#fff8ea] to-[#fff3e4] shadow-soft transition-transform hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(253,212,141,0.35)]"
              >
                <div className="relative h-[240px] w-full overflow-hidden rounded-[24px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${showcase.image})` }}
                  />
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-[#fff9eb]/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 top-4 px-5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#ff9e2f] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-white shadow-soft">
                      <span className="text-[14px]">⚡</span>
                      <span>{showcase.tag}</span>
                    </span>
                  </div>
                </div>
                <div className="rounded-[24px] bg-white px-6 pb-6 pt-5 text-left">
                  <h3 className="text-[16px] font-semibold text-[#1f2937]">{showcase.title}</h3>
                  <p className="mt-2 text-[12px] text-[#6b7280]">{showcase.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 创作者的声音 */}
      <section className="section mt-20">
        <div className="section-inner relative">
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold tracking-[3px] text-[#f59e0b]">用户评价</p>
            <h2 className="mt-3 text-[30px] font-extrabold text-[#101827] md:text-[36px]">创作者的声音</h2>
          </div>

          <div className="relative mt-12">
            <div className="relative grid gap-6 lg:grid-cols-3">
              {creatorTestimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="relative aspect-[2/1] overflow-hidden rounded-[28px] border border-[#f4e4c8] bg-transparent text-left shadow-none transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex h-full flex-col px-6 py-6">
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden
                        className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.accentGradient} text-[18px] font-semibold text-white shadow-[0_16px_26px_rgba(255,171,72,0.35)] ring-4 ring-white/70`}
                      >
                        {testimonial.name.slice(0, 1)}
                      </span>
                      <div className="space-y-1">
                        <p className="text-[15px] font-semibold text-[#111827] leading-[1.25]">{testimonial.name}</p>
                        <p className="text-[11px] leading-[18px] text-[#6b7280]">{testimonial.role}</p>
                      </div>
                    </div>

                    <p className="mt-5 text-[12px] leading-[22px] text-[#4a5362]">{testimonial.quote}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section mt-20 mb-28">
        <div className="section-inner">
          <div className="text-center">
            <p className="text-[12px] font-semibold tracking-[3px] text-[#f59e0b]">常见问题</p>
            <h2 className="mt-3 text-[28px] font-extrabold text-[#101827] md:text-[32px]">常见问题解答</h2>
          </div>

          <div className="mt-10 mx-auto max-w-3xl space-y-3">
            {faqItems.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className={`rounded-[18px] border ${isOpen ? 'border-[#ffc94b]' : 'border-[#fde58f]'} bg-transparent transition-colors duration-200`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-semibold text-[#1f2937]"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#ffd95c] text-[16px] text-[#1f2937] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-[13px] leading-6 text-[#6b7280]">
                      <p>{faq.answerZh}</p>
                      <p className="mt-2 text-[12px] text-[#7d8796]">{faq.answerEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 页脚占位 */}
      <div className="h-24" />
    </main>
  )
}
