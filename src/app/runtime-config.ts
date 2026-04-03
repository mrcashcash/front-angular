import { environment } from '../environments/environment';

type RuntimeAppConfig = {
  apiUrl?: string | null;
};

declare global {
  interface Window {
    __APP_CONFIG__?: RuntimeAppConfig;
  }
}

function normalizeApiUrl(value: string | null | undefined): string | null {
  const trimmed = String(value ?? '')
    .trim()
    .replace(/\/+$/, '');

  return trimmed ? trimmed : null;
}

export function resolveApiBaseUrl(): string | null {
  const runtimeUrl =
    typeof window !== 'undefined' ? normalizeApiUrl(window.__APP_CONFIG__?.apiUrl) : null;

  if (runtimeUrl) {
    return runtimeUrl;
  }

  return normalizeApiUrl(environment.apiUrl);
}
