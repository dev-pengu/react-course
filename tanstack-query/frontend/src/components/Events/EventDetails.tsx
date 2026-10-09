import { useState } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query'

import { fetchEvent, deleteEvent, queryClient } from '../../util/http';

import Header from '../Header';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import Modal from '../UI/Modal';
import { HttpError } from '../../util/error';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: event, isPending, isError, error } = useQuery({
    queryKey: ['event', id],
    queryFn: (context) => fetchEvent({...context, id: id!}),
  })
  const { mutate, isPending: isPendingDeletion, isError: isErrorDeleting, error: deletionError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'], refetchType: 'none' });
      navigate('/events');
    }
  });

  const handleStartDelete = () => {
    setIsDeleting(true);
  }

  const handleStopDelete = () => {
    setIsDeleting(false);
  }

  const handleDelete = () => {
    mutate({ id: id! });
  }

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = <ErrorBlock title="Failed to load event details" message={error instanceof Error ? error.message : 'Something went wrong, failed to load the event details. Please try again later.'} />;
  }

  if (event) {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    content = (
      <article id="event-details">
        <header>
          <h1>{event.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${event.image}`} alt={event.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{event.location}</p>
              <time dateTime={`${event.date} ${event.time}`}>{formattedDate} @ {event.time}</time>
            </div>
            <p id="event-details-description">{event.description}</p>
          </div>
        </div>
      </article>
    )
  }

  return (
    <>
      {isDeleting && <Modal onClose={handleStopDelete}>
        <h2>Are you sure?</h2>
        <p>Do you really want to delete this event? This action cannot be undone.</p>
        <div className="form-actions">
          {isPendingDeletion && <LoadingIndicator />}
          {!isPendingDeletion && (
            <>
              <button onClick={handleStopDelete} className="button-text">Cancel</button>
              <button onClick={handleDelete} className="button">Delete</button>
            </>
          )}
        </div>
        {isErrorDeleting && <ErrorBlock title="Failed to delete event" message={deletionError instanceof HttpError ? deletionError.info?.message : 'Something went wrong, failed to delete the event. Please try again later.'} />}
      </Modal>}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}
    </>
  );
}