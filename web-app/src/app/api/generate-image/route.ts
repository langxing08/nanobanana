import { Buffer } from 'node:buffer';
import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_ID = 'google/gemini-2.5-flash-image';
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '缺少 OPENROUTER_API_KEY 环境变量 / Missing OPENROUTER_API_KEY.' },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const prompt = formData.get('prompt');
    const mode = formData.get('mode');
    const isTextMode = mode === 'text';
    const imageEntry = formData.get('image');
    const image = imageEntry instanceof File ? imageEntry : null;

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: '主提示词不能为空 / The main prompt cannot be empty.' },
        { status: 400 },
      );
    }

    if (!isTextMode && !image) {
      return NextResponse.json(
        { error: '请上传参考图像 / Please upload a reference image.' },
        { status: 400 },
      );
    }

    if (image && image.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '图片大小需小于 50MB / The reference image must be smaller than 50MB.' },
        { status: 400 },
      );
    }

    let dataUrl: string | null = null;
    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const mimeType = image.type || 'image/png';
      dataUrl = `data:${mimeType};base64,${base64}`;
    }

    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER ?? 'http://localhost',
        'X-Title': process.env.OPENROUTER_SITE_TITLE ?? 'Nano Banana Dev',
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt.trim(),
              },
              ...(dataUrl
                ? [
                    {
                      type: 'image_url',
                      image_url: {
                        url: dataUrl,
                      },
                    },
                  ]
                : []),
            ],
          },
        ],
      }),
    });

    const text = await response.text();
    let payload: any;

    try {
      payload = JSON.parse(text);
    } catch (error) {
      console.error('Failed to parse OpenRouter response', error);
      return NextResponse.json(
        { error: '无法解析模型响应 / Unable to parse model response.' },
        { status: 502 },
      );
    }

    if (!response.ok) {
      const message =
        payload?.error?.message ?? payload?.error ?? '模型生成失败 / Model generation failed.';
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const images: string[] = [];
    const choices = Array.isArray(payload?.choices) ? payload.choices : [];

    for (const choice of choices) {
      const message = choice?.message;
      if (!message) continue;

      if (Array.isArray(message.images)) {
        for (const generated of message.images) {
          if (typeof generated?.image_url?.url === 'string') {
            images.push(generated.image_url.url);
          } else if (typeof generated?.b64_json === 'string') {
            const mime = generated?.mime_type || 'image/png';
            images.push(`data:${mime};base64,${generated.b64_json}`);
          } else if (typeof generated?.image_base64 === 'string') {
            const mime = generated?.mime_type || 'image/png';
            images.push(`data:${mime};base64,${generated.image_base64}`);
          }
        }
      }

      if (typeof message.content === 'string' && message.content.startsWith('data:image/')) {
        images.push(message.content);
      }
    }

    if (!images.length && Array.isArray(payload?.data)) {
      for (const entry of payload.data) {
        if (typeof entry?.b64_json === 'string') {
          images.push(`data:image/png;base64,${entry.b64_json}`);
        }
      }
    }

    if (!images.length) {
      return NextResponse.json(
        { error: '模型未返回图像，请稍后重试 / The model did not return any images.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Gemini image generation failed', error);
    return NextResponse.json(
      { error: '服务器处理失败，请稍后重试 / Server-side generation failed.' },
      { status: 500 },
    );
  }
}
