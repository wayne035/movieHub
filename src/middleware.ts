export { default } from 'next-auth/middleware'

export const config = { 
    matcher: [
        '/api/account', '/api/favorites',
        '/browse', '/movies', '/tv', '/accounts-manage',
        '/my-list/:path*', '/search/:path*'
    ] 
}