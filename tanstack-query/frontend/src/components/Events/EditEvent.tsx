import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query'

import { fetchEvent, updateEvent, queryClient } from '../../util/http';

import Modal from '../UI/Modal';
import EventForm from './EventForm';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import type { EventFormData } from '../../types';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: event, isPending, isError, error } = useQuery({
    queryKey: ['event', id],
    queryFn: (context) => fetchEvent({...context, id: id!}),
  })

  const { mutate: updateEventMutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({queryKey: ['event', id]});
      const previousEvent = queryClient.getQueryData(['event', id]);
      queryClient.setQueryData(['event', id], newEvent);
      return { previousEvent };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['event', id], context?.previousEvent);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['event', id]});
    }
  });

  async function handleSubmit(formData: EventFormData) {
    if (!id) return;
    updateEventMutate({ id, event: formData });
    await navigate('../');
  }

  async function handleClose() {
    await navigate('../');
  }

  let content;

  if (isPending) {
    content = <div className="center"><LoadingIndicator /></div>;
  }

  if (isError) {
    content = <>
      <ErrorBlock title="Failed to load event" message={error?.message || 'Failed to load event. Please check your inputs and try again later.'}/>
      <div className="form-actions">
        <Link to="../" className="button">
          Okay
        </Link>
      </div>
    </>
  }

  if (event) {
    content = (
      <EventForm inputData={event} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({params}: {params: {id: string}}): Promise<Event> {
  const { id } = params;
  return queryClient.fetchQuery({
    queryKey: ['event', id],
    queryFn: (context) => fetchEvent({...context, id: id!}),
  })
}