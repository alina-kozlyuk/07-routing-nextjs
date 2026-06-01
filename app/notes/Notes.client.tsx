'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './NotesPage.module.css';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

const PER_PAGE = 12;

export default function NotesClient() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, search],
        queryFn: () => fetchNotes({ search, page, perPage: PER_PAGE }),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });

    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 0;

    const handleSearch = useDebouncedCallback((value: string) => {
        setPage(1);
        setSearch(value);
    }, 500);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={handleSearch} />

                {totalPages > 1 && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                )}

                <button className={css.button} onClick={() => setIsModalOpen(true)}>
                    Create note +
                </button>
            </header>

            {isLoading && <p>Loading, please wait...</p>}

            {isError && <p>Something went wrong.</p>}

            {notes.length > 0 && <NoteList notes={notes} />}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}