import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

import { fetchEvents } from '../../util/http';
import { HttpError } from '../../util/error';


export default function NewEventsSection() {
  const { data, isError, error, isPending } = useQuery({
    queryFn: (context) => fetchEvents({...context, max: 3 }),
    queryKey: ['events', {max: 3}],
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 30, // 30 seconds
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={(error instanceof HttpError && error.info?.message) || "Failed to fetch events"} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}