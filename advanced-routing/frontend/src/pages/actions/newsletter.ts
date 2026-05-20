import type { ActionFunctionArgs } from "react-router-dom";

const submitNewsletterSignup = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return {error: 'Please enter a valid email address.'};
    }

    // send to backend newsletter server ...
    console.log(email);
    return { message: 'Signup successful!' };
}

export {submitNewsletterSignup};