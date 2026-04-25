'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProject } from '@/app/actions/projects';
import { hasError, hasErrors } from '@/lib/typeGuards';
import styles from "../lib/styles/deleteButton.module.css";

// Define the interface right here
interface DeleteButtonProps {
  projectId: number;
}

export function DeleteButton({ projectId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    
    const result = await deleteProject(projectId);
    
    if (result.success) {
      router.refresh();
    } else {
      if (hasError(result)) {
        alert(result.error);
      } else if (hasErrors(result)) {
        alert(result.errors.map(e => e.message).join('\n'));
      }
    }
    
    setIsDeleting(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={styles.delete}
    >
      {isDeleting ? '⌛' : '🗑️'}
    </button>
  );
}