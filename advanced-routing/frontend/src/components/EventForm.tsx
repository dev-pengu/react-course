import { Form, useNavigate, useNavigation, type HTMLFormMethod, useActionData } from 'react-router-dom';
import type { Event, ValidationErrorResponse } from '../types';

import classes from './EventForm.module.css';

function EventForm({ method, event }: { method: HTMLFormMethod; event?: Event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const validationErrors = useActionData<ValidationErrorResponse>();

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form className={classes.form} method={method}>
      {validationErrors && validationErrors.errors && 
      <ul>
        {Object.values(validationErrors.errors).map((err) => (
          <li key={err}>{err}</li>
        ))}
      </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event?.title} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event?.image} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? new Date(event.date).toISOString().split('T')[0] : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={5} required defaultValue={event?.description} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={navigation.state === 'submitting'}>{navigation.state === 'submitting' ? 'Saving...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;