import type { GlobConfig } from 'types/config'

export function useGlobSetting(): Readonly<GlobConfig> {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_APP_CLIENT_ID,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_APP_RSA_PUBLIC_KEY,
  } = import.meta.env

  return {
    appTitle: VITE_GLOB_APP_TITLE,
    appClientId: VITE_GLOB_APP_CLIENT_ID,
    appRsaPublicKey: VITE_GLOB_APP_RSA_PUBLIC_KEY,
    apiUrl: VITE_GLOB_API_URL,
    apiUrlPrefix: VITE_GLOB_API_URL_PREFIX,
  }
}
