export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://girirajhibare.dev';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/dashboard/', '/api/', '/auth/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
