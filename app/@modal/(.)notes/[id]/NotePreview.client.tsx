'use client';

import css from '@/components/NotePreview/NotePreview.module.css';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import type { Note } from '@/types/note';
import { useRouter } from 'next/navigation';

type NotePreviewClientProps = {
  note: Note;
};

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <Modal onClose={closeModal}>
      <button
        className={css.backBtn}
        type="button"
        onClick={closeModal}
        aria-label="Close modal"
      >
        Close
      </button>
      <NotePreview note={note} />
    </Modal>
  );
}