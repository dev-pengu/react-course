import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'

import Modal from '../UI/Modal';
import EventForm from './EventForm';
import { submitEvent } from '../../util/http';
import type { EventFormData } from '../../types';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import { HttpError } from '../../util/error';

import { queryClient } from '../../util/http';

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: submitEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    }
  });

  function handleSubmit(formData: EventFormData) {
    mutate(formData);
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <LoadingIndicator />}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && <ErrorBlock title="Failed to create event" message={error instanceof HttpError ? error.info?.message : 'Something went wrong, failed to create the event. Please try again later.'} />}
    </Modal>
  );
}