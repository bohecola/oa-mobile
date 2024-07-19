import type { GlobConfig } from 'types/config'

export function useGlobSetting(): Readonly<GlobConfig> {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_APP_CLIENT_ID,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
  } = import.meta.env

  return {
    appTitle: VITE_GLOB_APP_TITLE,
    appClientId: VITE_GLOB_APP_CLIENT_ID,
    apiUrl: VITE_GLOB_API_URL,
    apiUrlPrefix: VITE_GLOB_API_URL_PREFIX,
  }
}
