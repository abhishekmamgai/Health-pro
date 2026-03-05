import { Suspense } from 'react';
import ExercisesContent from './ExercisesContent';

export default function ExercisesPage() {
    return (
        <Suspense fallback={<div>Loading exercises...</div>}>
            <ExercisesContent />
        </Suspense>
    );
}