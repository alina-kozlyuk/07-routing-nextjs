import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

const PER_PAGE = 12;

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function Notes() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', 1, ''],
        queryFn: () => fetchNotes({ search: '', page: 1, perPage: PER_PAGE }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    );
}