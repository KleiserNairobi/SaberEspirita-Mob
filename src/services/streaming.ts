import { getApiConfig } from './deepseek';

interface StreamOptions {
  temperature?: number;
  max_tokens?: number;
}

export async function streamCompletion(
  messages: Array<{ role: string; content: string }>,
  onChunkReceived: (chunk: string) => void,
  onComplete: (fullResponse: string) => void,
  options: StreamOptions = {}
): Promise<void> {
  const { apiKey, apiUrl } = getApiConfig();

  console.log('Enviando requisição para API...');

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        stream: true,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 800,
      }),
    });

    console.log('Status da resposta:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro da API:', errorText);
      throw new Error(`Erro na API: ${response.status} - ${errorText}`);
    }

    if (!response.body) {
      throw new Error('Response body não disponível');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let fullResponse = '';

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log('Stream completo');
          onComplete(fullResponse);
          break;
        }

        // Decodifica o chunk e adiciona ao buffer
        buffer += decoder.decode(value, { stream: true });

        // Processa linhas completas
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Mantém a linha incompleta no buffer

        for (const line of lines) {
          const trimmedLine = line.trim();

          if (trimmedLine === '') continue;
          if (trimmedLine === 'data: [DONE]') {
            console.log('Stream finalizado com [DONE]');
            onComplete(fullResponse);
            return;
          }

          if (trimmedLine.startsWith('data: ')) {
            try {
              const jsonStr = trimmedLine.slice(6);
              if (jsonStr.trim() === '') continue;

              const jsonData = JSON.parse(jsonStr);
              const content = jsonData.choices[0]?.delta?.content;

              if (content !== undefined && content !== null) {
                fullResponse += content;
                onChunkReceived(content);
                console.log('Chunk recebido:', content);
              }
            } catch (e) {
              console.warn('JSON parse error:', e, 'na linha:', trimmedLine);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    console.error('Erro no streaming:', error);
    throw error;
  }
}
