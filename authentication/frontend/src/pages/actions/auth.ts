import { redirect, type ActionFunctionArgs } from "react-router-dom";

export async function submitAuthForm({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const mode = new URL(request.url).searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw Response.json({ message: "Unsupported mode." }, { status: 422 });
  }

  if (
    typeof authData.email !== "string" ||
    typeof authData.password !== "string"
  ) {
    throw Response.json({ message: "Invalid form data." }, { status: 422 });
  }

  try {
    const response = await fetch(`http://localhost:3000/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw Response.json(
        { message: "Failed to submit form." },
        { status: 500 },
      );
    }

    const resData = await response.json();
    const token = resData.token;
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    throw Response.json({ message: "Failed to submit form." }, { status: 500 });
  }
}

export function logoutAction() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
}
