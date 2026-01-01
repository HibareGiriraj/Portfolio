// JSON-LD Structured Data for SEO
export function PersonSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Giriraj Hibare",
        url: "https://girirajhibare.dev",
        image: "https://girirajhibare.dev/og-image.png",
        jobTitle: "Full-Stack MERN Developer",
        worksFor: {
            "@type": "Organization",
            name: "Aii Venture Pvt. Ltd."
        },
        sameAs: [
            "https://github.com/HibareGiriraj",
            "https://linkedin.com/in/girirajhibare"
        ],
        knowsAbout: [
            "React.js",
            "Node.js",
            "MongoDB",
            "Express.js",
            "JavaScript",
            "TypeScript",
            "Next.js",
            "REST APIs",
            "Payment Integration",
            "Razorpay"
        ],
        address: {
            "@type": "PostalAddress",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            addressCountry: "India"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function WebsiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Giriraj Hibare Portfolio",
        url: "https://girirajhibare.dev",
        description: "Full-Stack MERN Developer portfolio showcasing production-ready web applications",
        author: {
            "@type": "Person",
            name: "Giriraj Hibare"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function ProjectSchema({ project }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "WebApplication",
        author: {
            "@type": "Person",
            name: "Giriraj Hibare"
        },
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
