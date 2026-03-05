"use client";

import React, { useState } from 'react';
import { Search, Bookmark, Plus, ChevronUp, PlayCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import styles from './Exercises.module.css';
import { Button } from '@/components/Button';
import { exercises, CATEGORIES } from '@/lib/exercises-data';
import { useLanguage } from '@/lib/language-context';

export default function ExercisesContent() {
    const searchParams = useSearchParams();
    const querySearch = searchParams.get('search') || '';
    const [searchTerm, setSearchTerm] = useState(querySearch);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const { t } = useLanguage();
    const [imageErrorIds, setImageErrorIds] = useState<Set<number>>(new Set());

    const filteredExercises = exercises.filter(ex => {
        const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    React.useEffect(() => {
        if (querySearch && filteredExercises.length > 0 && !expandedId) {
            setExpandedId(filteredExercises[0].id);
        }
    }, [querySearch, filteredExercises, expandedId]);

    const handleImageError = (id: number) => {
        setImageErrorIds(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });
    };

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleBox}>
                    <h1 className={styles.title}>{t.exTitle} <span className={styles.gradientText}>Encyclopedia</span></h1>
                    <p className={styles.subtitle}>{t.exSubtitle} ({exercises.length} Exercises).</p>
                </div>

                <div className={styles.searchBar}>
                    <div className={styles.searchInputWrapper}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder={t.exSearch}
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className={styles.chips}>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`${styles.chip} ${selectedCategory === cat ? styles.activeChip : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat === 'All' ? t.exAll : cat}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filteredExercises.map(ex => (
                    <div key={ex.id} className={`${styles.card} ${expandedId === ex.id ? styles.cardExpanded : ''}`}>
                        <div className={styles.cardImage}>
                            {!imageErrorIds.has(ex.id) ? (
                                <img
                                    src={ex.imageUrl}
                                    alt={ex.name}
                                    loading="lazy"
                                    onError={() => handleImageError(ex.id)}
                                />
                            ) : (
                                <div className={styles.cardImage}>
                                    <div className={styles.difficultyBadge} data-difficulty={ex.difficulty}>
                                        {ex.difficulty}
                                    </div>
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-light)', fontSize: 12, padding: 12, textAlign: 'center' }}>
                                        Image not available. Please check your internet/ad-blocker.
                                    </div>
                                </div>
                            )}
                            <div className={styles.difficultyBadge} data-difficulty={ex.difficulty}>
                                {ex.difficulty}
                            </div>
                        </div>

                        <div className={styles.cardContent}>
                            <div className={styles.cardTop}>
                                <span className={styles.categoryTag}>{ex.category}</span>
                                <div className={styles.cardActions}>
                                    <button className={styles.actionBtn}><Bookmark size={16} /></button>
                                    <button className={styles.actionBtn}><Plus size={16} /></button>
                                </div>
                            </div>

                            <h3 className={styles.exerciseName}>{ex.name}</h3>
                            <p className={styles.exerciseDesc}>{ex.desc}</p>

                            <div className={styles.cardFooter}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className={styles.fullGuideBtn}
                                    onClick={() => toggleExpand(ex.id)}
                                >
                                    {expandedId === ex.id ? 'Hide Guide' : 'Watch High-Precision Guide'}
                                    {expandedId === ex.id ? <ChevronUp size={16} /> : <PlayCircle size={16} />}
                                </Button>
                            </div>

                            {expandedId === ex.id && (
                                <div className={styles.guideWrapper}>
                                    <div className={styles.videoContainer}>
                                        <iframe
                                            width="100%"
                                            height="240"
                                            src={ex.videoUrl}
                                            title={ex.name}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            allowFullScreen
                                            className={styles.videoFrame}
                                        ></iframe>
                                    </div>

                                    <h4 className={styles.guideTitle}>Execution Plan:</h4>
                                    <ul className={styles.instructionList}>
                                        {ex.instructions.map((step, i) => (
                                            <li key={i} className={styles.instructionItem}>
                                                <span className={styles.stepNum}>{i + 1}</span>
                                                <p>{step}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={styles.mistakeBox}>
                                        <strong>Expert Tip:</strong>
                                        <p>{ex.mistakes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}