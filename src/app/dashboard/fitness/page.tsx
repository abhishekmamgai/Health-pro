'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  QrCode,
  CheckCircle2,
  Wifi,
  Search,
} from 'lucide-react';
import styles from './Fitness.module.css';
import { Button } from '@/components/Button';
import { useLanguage } from '@/lib/language-context';

const classes = [
  {
    id: 1,
    name: 'Metabolic HIIT Blast',
    instructor: 'Aman S.',
    time: '07:30 AM',
    duration: '45 min',
    intensity: 'High',
    spots: 4,
    type: 'In-Studio',
    color: 'var(--color-primary)',
  },
  {
    id: 2,
    name: 'Zen Vinyasa Flow',
    instructor: 'Priya K.',
    time: '09:00 AM',
    duration: '60 min',
    intensity: 'Medium',
    spots: 12,
    type: 'Live Stream',
    color: 'var(--color-cyan)',
  },
  {
    id: 3,
    name: 'Hypertrophy Strength',
    instructor: 'Arjun Demo',
    time: '05:30 PM',
    duration: '50 min',
    intensity: 'Ultra',
    spots: 2,
    type: 'In-Studio',
    color: 'var(--color-secondary)',
  },
  {
    id: 4,
    name: 'Core & Stability',
    instructor: 'Rohan M.',
    time: '07:00 PM',
    duration: '40 min',
    intensity: 'Low',
    spots: 25,
    type: 'In-Studio',
    color: 'var(--color-success)',
  },
];

export default function FitnessBookingPage() {
  const [bookedIds, setBookedIds] = useState<number[]>([]);
  const [showQR, setShowQR] = useState(false);
  const { t } = useLanguage();

  const handleBook = (id: number) => {
    if (bookedIds.includes(id)) return;
    setBookedIds([...bookedIds, id]);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>
            {t.navFitness.split(' & ')[0] || 'Fitness'} &{' '}
            <span className={styles.gradientText}>Booking</span>
          </h1>
          <p className={styles.subtitle}>
            Book your spot in today&apos;s classes or show your gym QR for
            check-in.
          </p>
        </div>

        <div className={styles.quickCheckIn}>
          <Button
            variant="primary"
            className={styles.qrBtn}
            onClick={() => setShowQR(!showQR)}
          >
            <QrCode size={20} /> {showQR ? 'Hide Access' : 'Gym Check-in'}
          </Button>
        </div>
      </header>

      {showQR && (
        <div className={styles.qrSection}>
          <div className={styles.qrCard}>
            <div className={styles.qrHeader}>
              <Wifi size={16} color="var(--color-success)" />
              <span>LIVE ACCESS PASS</span>
            </div>
            <div className={styles.qrPlaceholder}>
              <div className={styles.qrCodeIcon}>
                <QrCode size={120} strokeWidth={1} />
              </div>
              <p className={styles.qrExp}>
                Scan at gym turnstile • Valid for 2 mins
              </p>
            </div>
            <div className={styles.qrFooter}>
              <strong>Health Pro Member</strong>
              <span>HP-772921-X</span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search classes..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.bookingGrid}>
        <div className={styles.mainCol}>
          <div className={styles.sectionTitle}>
            <Calendar size={20} />
            <h2>Today&apos;s Schedule</h2>
            <span className={styles.dateTag}>Feb 28, 2026</span>
          </div>

          <div className={styles.classList}>
            {classes.map((cls) => (
              <div key={cls.id} className={styles.classCard}>
                <div className={styles.classTime}>
                  <strong>{cls.time}</strong>
                  <span>{cls.duration}</span>
                </div>

                <div className={styles.classInfo}>
                  <div className={styles.classHeader}>
                    <h3 className={styles.className}>{cls.name}</h3>
                    <span className={styles.typeBadge}>{cls.type}</span>
                  </div>
                  <div className={styles.classMeta}>
                    <span>By {cls.instructor}</span>
                    <span className={styles.dot}>•</span>
                    <span
                      className={styles.intensityLabel}
                      style={{ color: cls.color }}
                    >
                      {cls.intensity} Intensity
                    </span>
                  </div>
                </div>

                <div className={styles.classAction}>
                  <div className={styles.spotsLeft}>
                    <Users size={14} /> {cls.spots} spots left
                  </div>
                  <Button
                    variant={bookedIds.includes(cls.id) ? 'ghost' : 'primary'}
                    size="sm"
                    className={styles.bookBtn}
                    onClick={() => handleBook(cls.id)}
                    disabled={bookedIds.includes(cls.id)}
                  >
                    {bookedIds.includes(cls.id) ? (
                      <span className={styles.bookedStatus}>
                        <CheckCircle2 size={16} /> Booked
                      </span>
                    ) : (
                      'Book Now'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.statsCard}>
            <div className={styles.statLine}>
              <Clock size={16} color="var(--color-primary)" />
              <span>Total Classes Attended</span>
              <strong>42</strong>
            </div>
            <div className={styles.statLine}>
              <Clock size={16} color="var(--color-cyan)" />
              <span>Hours Trained</span>
              <strong>128h</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

