import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";

export default function NewsletterPage() {
    return (
        <PageContent title="Join our awesome newsletter!">
            <NewsletterSignup />
        </PageContent>
    );
}