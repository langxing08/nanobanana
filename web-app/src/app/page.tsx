'use client';

import type { User } from '@supabase/supabase-js';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'github-signin-failed': 'GitHub 登录失败，请稍后重试。',
  'google-signin-failed': 'Google 登录失败，请稍后重试。',
  'exchange-failed': '无法创建登录会话，请重新尝试。',
  missing_code: '缺少授权代码，无法完成登录。',
};

const AUTH_STATUS_ERROR = '无法获取登录状态，请重试。';

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
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [authFeedback, setAuthFeedback] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const authMenuRef = useRef<HTMLDivElement | null>(null);
  const tabs: { id: EditorTab; label: string; icon: string }[] = [
    { id: 'image', label: '图生图', icon: '🖼️' },
    { id: 'text', label: '文生图', icon: '📝' },
  ];
  useEffect(() => {
    let isMounted = true;

    const fetchSession = async () => {
      setAuthError(null);
      setAuthFeedback(null);

      try {
        const response = await fetch('/api/auth/session', {
          cache: 'no-store',
        });

        if (!response.ok) {
          if (response.status === 401) {
            if (isMounted) {
              setAuthUser(null);
            }
            return;
          }

          const payload = await response.json().catch(() => null);

          if (isMounted) {
            setAuthError(
              typeof payload?.error === 'string' ? payload.error : AUTH_STATUS_ERROR,
            );
          }
          return;
        }

        const payload = (await response.json()) as { user?: User | null };

        if (isMounted) {
          setAuthUser(payload?.user ?? null);
        }
      } catch {
        if (isMounted) {
          setAuthError(AUTH_STATUS_ERROR);
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    };

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const errorCode = params.get('authError');
    const rawMessage = params.get('authMessage');

    if (!errorCode && !rawMessage) {
      return;
    }

    const message =
      (errorCode && AUTH_ERROR_MESSAGES[errorCode]) ??
      rawMessage ??
      AUTH_ERROR_MESSAGES['github-signin-failed'];

    setAuthError(message);

    params.delete('authError');
    params.delete('authMessage');

    const nextSearch = params.toString();
    const nextUrl = `${window.location.pathname}${
      nextSearch ? `?${nextSearch}` : ''
    }${window.location.hash}`;

    window.history.replaceState(null, '', nextUrl);
  }, []);
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
      title: '极速山景生成演示',
      tag: 'Nano Banana速度',
      subtitle: 'Nano Banana 优化神经引擎在内测环境下展现出秒级响应。',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: '花园创作示例',
      tag: 'Nano Banana速度',
      subtitle: '复杂场景渲染由 Nano Banana 模型实时生成，结果因素材而异。',
      image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: '海滩合成示例',
      tag: 'Nano Banana速度',
      subtitle: '示例输出展示 Nano Banana 保留光影细节的能力。',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    },
    {
      title: '极光生成示例',
      tag: 'Nano Banana速度',
      subtitle: '高动态场景处理需视模型队列与提示词复杂度而定。',
      image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1600&q=80',
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
      question: 'Nano Banana 与 Flux Kontext 有何区别？',
      answerZh:
        'Nano Banana 专注角色一致性与场景保留，适合需要多镜头连贯素材的创作者；Flux Kontext 更偏向通用生成，可根据具体需求自由选择。',
      answerEn:
        'Nano Banana focuses on character consistency and scene fidelity, making it ideal for story-driven workflows, while Flux Kontext offers broader generative coverage—pick the tool that matches your use case.',
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

  useEffect(() => {
    if (!isAuthMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target as Node)) {
        setIsAuthMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAuthMenuOpen]);

  useEffect(() => {
    if (authUser) {
      setIsAuthMenuOpen(false);
    }
  }, [authUser]);

  const handleOAuthSignIn = (provider: 'github' | 'google') => {
    setAuthError(null);
    setAuthFeedback(null);
    window.location.href = `/auth/${provider}`;
  };

  const handleSignOut = async () => {
    setAuthError(null);
    setAuthFeedback(null);
    setIsSigningOut(true);

    try {
      const response = await fetch('/api/auth/sign-out', {
        method: 'POST',
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          typeof payload?.error === 'string'
            ? payload.error
            : '退出失败，请稍后重试。';
        throw new Error(message);
      }

      setAuthUser(null);
      setAuthFeedback('退出成功，稍后可再次登录。');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '退出失败，请稍后重试。';
      setAuthError(message);
    } finally {
      setIsSigningOut(false);
    }
  };

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
    const isTextMode = activeTab === 'text';

    if (!prompt.trim()) {
      setErrorMessage('请填写主提示词 / Please enter the main prompt.');
      return;
    }

    if (!isTextMode && !imageFile) {
      setErrorMessage('请先上传参考图像 / Please upload a reference image first.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setStatusMessage(
      isTextMode
        ? '正在调用 Gemini 2.5 Flash Image 文生图 · Contacting Gemini 2.5 Flash Image (text-to-image)...'
        : '正在调用 Gemini 2.5 Flash Image 图生图 · Contacting Gemini 2.5 Flash Image (image-to-image)...',
    );

    try {
      const formData = new FormData();
      formData.append('prompt', prompt.trim());
      formData.append('mode', isTextMode ? 'text' : 'image');
      if (!isTextMode && imageFile) {
        formData.append('image', imageFile);
      }

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

  const avatarUrl =
    authUser?.user_metadata && typeof authUser.user_metadata?.avatar_url === 'string'
      ? (authUser.user_metadata.avatar_url as string)
      : undefined;

  const displayName =
    (authUser?.user_metadata && typeof authUser.user_metadata?.full_name === 'string'
      ? authUser.user_metadata.full_name
      : typeof authUser?.user_metadata?.user_name === 'string'
        ? authUser.user_metadata.user_name
        : authUser?.email) ?? '';

  const displayInitial = displayName ? displayName.charAt(0).toUpperCase() : 'G';

  return (
    <>
      <header className="sticky top-0 z-40 flex justify-center bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="section-inner flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-10">
            <a className="text-lg font-bold tracking-wide text-[#f59e0b]" href="/">
              Nano Banana
            </a>
            <nav aria-label="主要导航">
              <ul className="flex items-center gap-6 text-sm font-medium text-[#374151]">
                <li>
                  <a className="transition-colors hover:text-[#f59e0b]" href="#showcases">
                    产品亮点
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-[#f59e0b]" href="/pricing">
                    套餐定价
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-[#f59e0b]" href="/privacy-policy">
                    隐私政策
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-[#f59e0b]" href="/terms-of-service">
                    服务条款
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-[#f59e0b]" href="mailto:hello@nanobanana.ai">
                    客服邮箱
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {isCheckingAuth ? (
            <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-[#6b7280] shadow-soft">
              正在检测登录状态…
            </span>
          ) : authUser ? (
            <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow-soft">
              {avatarUrl ? (
                <img
                  alt="用户头像"
                  src={avatarUrl}
                  className="h-9 w-9 rounded-full border border-banana-200 bg-white object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-banana-200 bg-white text-sm font-semibold">
                  {displayInitial}
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-[#111827]">{displayName}</span>
                <span className="text-[11px] text-[#6b7280]">已登录 Nano Banana</span>
              </div>
              <button
                className="rounded-full border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-semibold text-[#111827] transition hover:border-[#111827]/60 hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSigningOut}
                onClick={handleSignOut}
                type="button"
              >
                {isSigningOut ? '正在退出…' : '退出登录'}
              </button>
            </div>
          ) : (
            <div className="relative" ref={authMenuRef}>
              <button
                aria-expanded={isAuthMenuOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffa733] via-[#ffb648] to-[#ffd85e] px-6 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,176,28,0.4)] transition-transform transition-shadow hover:-translate-y-px hover:shadow-[0_12px_28px_rgba(255,176,28,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb648]"
                onClick={() => setIsAuthMenuOpen((open) => !open)}
                type="button"
              >
                <span aria-hidden className="text-lg font-bold">
                  →
                </span>
                <span>登录</span>
              </button>
              {isAuthMenuOpen ? (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-[#f5d48c] bg-white/95 p-3 text-sm text-[#111827] shadow-[0_18px_36px_rgba(255,176,28,0.25)] backdrop-blur">
                  <p className="px-2 text-xs text-[#6b7280]">选择登录方式</p>
                  <div className="mt-2 flex flex-col gap-2">
                    <button
                      className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#060913]"
                      onClick={() => {
                        setIsAuthMenuOpen(false);
                        handleOAuthSignIn('github');
                      }}
                      type="button"
                    >
                      <span className="text-lg" aria-hidden>
                        🐙
                      </span>
                      <span>使用 GitHub 登录</span>
                    </button>
                    <button
                      className="inline-flex items-center gap-2 rounded-full border border-[#d1d5db] bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition hover:border-[#111827]/60 hover:text-[#111827]"
                      onClick={() => {
                        setIsAuthMenuOpen(false);
                        handleOAuthSignIn('google');
                      }}
                      type="button"
                    >
                      <span className="text-lg" aria-hidden>
                        🟢
                      </span>
                      <span>使用 Google 登录</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </header>
      {authError ? (
        <section className="section pt-6">
          <div className="section-inner">
            <p
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-soft"
              role="alert"
            >
              {authError}
            </p>
          </div>
        </section>
      ) : authFeedback ? (
        <section className="section pt-6">
          <div className="section-inner">
            <p
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-soft"
              role="status"
            >
              {authFeedback}
            </p>
          </div>
        </section>
      ) : null}
      <main className="w-full">
      {/* 首屏品牌 Hero */}
      <section className="section pt-20 pb-16">
        <div className="section-inner text-center">
          <div className="inline-flex items-center gap-2 rounded-pill border border-banana-200 bg-banana-50 px-6 py-2 text-[14px] text-banana-600 shadow-soft">
            <span className="text-[18px]">🍌</span>
            <span>角色一致性 AI 模型</span>
            <a className="ml-2 font-semibold text-banana-600 hover:text-banana-500 transition-colors" href="/pricing">
              立即试用 →
            </a>
          </div>
          <h1 className="mt-10 text-[60px] font-extrabold text-banana-500 tracking-[1px]">Nano Banana</h1>
          <p className="mt-4 text-[16px] leading-8 text-[#485268]">
            用简单的文字提示变换任何图像。Nano Banana 的模型专注于角色一致性与场景保留，帮助创作者快速获取高质量视觉素材。
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              className="inline-flex items-center gap-2 rounded-pill bg-banana-400 px-8 py-3 text-[16px] font-semibold text-white shadow-soft hover:bg-banana-500 transition-colors"
              href="#editor-demo"
            >
              开始编辑
              <span className="text-[18px]">🍌</span>
            </a>
            <a
              className="inline-flex items-center justify-center rounded-pill border border-banana-300 bg-white px-8 py-3 text-[16px] font-semibold text-banana-600 shadow-soft hover:border-banana-400 hover:text-banana-500 transition-colors"
              href="#showcases"
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
      <section className="section mt-16" id="editor-demo">
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
                        value={prompt}
                        onChange={(event) => setPrompt(event.target.value)}
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
                        <span>实际生成耗时取决于提示词复杂度与队列负载</span>
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
          <h2 className="mt-3 text-[32px] font-extrabold text-[#1f2937]">为什么选择 Nano Banana？</h2>
          <p className="mt-3 text-[14px] leading-6 text-[#6b7280]">
            Nano Banana 聚焦角色一致性、场景保留与批量生成，帮助创作者用自然语言完成复杂的图像编辑任务。
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
                copy: '无缝融合编辑内容与原始背景，减少额外抠图与二次修图的工作量。',
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
      <section className="section mt-20" id="showcases">
        <div className="section-inner text-center">
          <p className="text-[12px] font-semibold tracking-[2px] text-[#f29b1d] uppercase">案例展示</p>
          <h2 className="mt-3 text-[30px] font-extrabold text-[#1f2937]">闪电般的 AI 创作</h2>
          <p className="mt-2 text-[14px] text-[#6b7280]">了解 Nano Banana 的生成流程与演示案例</p>

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

      {/* 合规与支持承诺 */}
      <section className="section mt-20">
        <div className="section-inner">
          <div className="rounded-[28px] border border-[#fde8b5] bg-gradient-to-r from-[#fff9ec] via-white to-[#fff5e0] p-8 shadow-soft">
            <h2 className="text-[26px] font-extrabold text-[#1f2937]">合规与支持承诺 · Compliance & Support</h2>
            <p className="mt-3 text-[14px] leading-7 text-[#4b5563]">
              Nano Banana 仅提供合法的 AI 图像编辑软件服务，无虚构用户与评价。我们通过 Creem 完成数字商品售卖，并保持透明的计费流程与客户支持。
            </p>
            <ul className="mt-6 grid gap-4 text-[13px] leading-6 text-[#4b5563] md:grid-cols-2">
              <li className="flex items-start gap-2">
                <span aria-hidden>✅</span>
                <span>产品介绍与截图均基于当前功能，页面不包含虚假评论或未经验证的奖项。</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden>✅</span>
                <span>所有付费方案在 <a className="font-semibold text-[#d97706] underline-offset-2 hover:underline" href="/pricing">套餐定价页</a> 清晰展示，可随时访问。</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden>✅</span>
                <span>隐私政策与服务条款已上线，规范数据处理与退款流程，便于 Creem 审核。</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden>✅</span>
                <span>官方客服邮箱 <a className="font-semibold text-[#d97706] underline-offset-2 hover:underline" href="mailto:hello@nanobanana.ai">hello@nanobanana.ai</a> 全天候接收咨询。</span>
              </li>
            </ul>
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

      <footer className="bg-[#111827] py-12 text-[#e5e7eb]">
        <div className="section-inner flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-white">Nano Banana</p>
            <p className="max-w-sm text-[13px] leading-6">
              专注角色一致性的 AI 图像编辑工作台，由上海纳米香蕉科技有限公司运营。所有订单由 Creem 作为交易记录主体（Merchant of Record）完成。
            </p>
            <p className="text-[13px]">
              客服邮箱：
              <a className="ml-1 font-semibold text-[#fbbf24] hover:underline" href="mailto:hello@nanobanana.ai">
                hello@nanobanana.ai
              </a>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-[13px] leading-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-white">产品</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className="transition-colors hover:text-[#fbbf24]" href="#editor-demo">
                    在线编辑体验
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-[#fbbf24]" href="#showcases">
                    案例展示
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-[#fbbf24]" href="/pricing">
                    套餐定价
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">政策</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className="transition-colors hover:text-[#fbbf24]" href="/privacy-policy">
                    隐私政策
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-[#fbbf24]" href="/terms-of-service">
                    服务条款
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">支持</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className="transition-colors hover:text-[#fbbf24]" href="mailto:hello@nanobanana.ai">
                    联系客服
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-[#fbbf24]" href="https://docs.creem.io/faq/prohibited-products" target="_blank" rel="noreferrer">
                    Creem 禁止售卖列表
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="section-inner mt-8 border-t border-white/10 pt-6 text-[12px] text-[#9ca3af]">
          © {new Date().getFullYear()} Nano Banana. 保留所有权利。
        </div>
      </footer>
    </main>
    </>
  );
}
