import type { GlobConfig } from 'types/config'

export function useGlobSettings(): Readonly<GlobConfig> {
  const {
    VITE_PUBLIC_PATH,
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_APP_CLIENT_ID,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_APP_RSA_PUBLIC_KEY,
    VITE_GLOB_PREVIEW_URL,
  } = import.meta.env

  return {
    publicPath: VITE_PUBLIC_PATH,
    appTitle: VITE_GLOB_APP_TITLE,
    appClientId: VITE_GLOB_APP_CLIENT_ID,
    appRsaPublicKey: VITE_GLOB_APP_RSA_PUBLIC_KEY,
    apiUrlPrefix: VITE_GLOB_API_URL_PREFIX,
    previewUrl: VITE_GLOB_PREVIEW_URL,
  }
}
