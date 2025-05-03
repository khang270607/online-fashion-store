import { env } from '~/config/environment'

// Những domain nào được phép gọi API từ backend
export const WHITELIST_DOMAINS = ['http://localhost:5173']

export const WEBSITE_DOMAIN =
  env.BUILD_MODE === 'prod'
    ? env.WEBSITE_DOMAIN_PRODUCTION
    : env.WEBSITE_DOMAIN_DEVLOPMENT
