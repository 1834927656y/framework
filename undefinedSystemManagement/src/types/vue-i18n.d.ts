import 'vue-i18n'

declare module 'vue-i18n' {
  export interface ComposerCustomProperties {
    ts: (key: string, fallback?: string) => Promise<string>
  }
}

