import {useActionState, use } from "react";

import { isNotEmpty } from "../util/validation";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {

  const { addOpinion } = use(OpinionsContext);

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitAction = async (prevFormState: {errors: string[] | null, enteredValues?: Record<string, any>}, formData: FormData): Promise<{errors: string[] | null, enteredValues?: Record<string, any>}> => {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    const errors: string[] = [];
    if (!userName || (userName && !isNotEmpty(userName.toString()))) {
      errors.push('Username is required.');
    }
    if (!title || (title && !isNotEmpty(title.toString()))) {
      errors.push('Title is required.');
    }
    if (!body || (body && !isNotEmpty(body.toString()))) {
      errors.push('Opinion body is required.');
    }

    if (errors.length > 0) {
      return {errors, enteredValues: {userName, title, body}};
    }

    await addOpinion({userName: userName!.toString(), title: title!.toString(), body: body!.toString()});

    return {errors: null};
  }

  const [ formState, formAction ] = useActionState(submitAction, {"errors": null});

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body} ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}