import MainNavigation from "../components/MainNavigation";


export default function ErrorPage() {
    return (
        <>
            <MainNavigation />
            <main id="error-page">
                <h1>Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
            </main>
        </>
    )
}