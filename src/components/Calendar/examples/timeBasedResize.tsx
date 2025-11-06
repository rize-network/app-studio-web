import React, { useState } from 'react';
import { Calendar } from '../Calendar';
import { CalendarEvent } from '../Calendar/Calendar.props';

export const CalendarTimeBasedResize = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Morning Stand-up',
      start: new Date(2025, 10, 6, 9, 0), // 9:00 AM
      end: new Date(2025, 10, 6, 9, 30), // 9:30 AM
      description: 'Daily team sync',
    },
    {
      id: 2,
      title: 'Design Review',
      start: new Date(2025, 10, 6, 10, 0), // 10:00 AM
      end: new Date(2025, 10, 6, 11, 30), // 11:30 AM
      description: 'Review new calendar design',
    },
    {
      id: 3,
      title: 'Lunch Break',
      start: new Date(2025, 10, 6, 12, 0), // 12:00 PM
      end: new Date(2025, 10, 6, 13, 0), // 1:00 PM
      description: 'Team lunch',
    },
    {
      id: 4,
      title: 'Development Time',
      start: new Date(2025, 10, 6, 14, 0), // 2:00 PM
      end: new Date(2025, 10, 6, 16, 0), // 4:00 PM
      description: 'Focus time for implementation',
    },
    {
      id: 5,
      title: 'Code Review',
      start: new Date(2025, 10, 6, 16, 15), // 4:15 PM
      end: new Date(2025, 10, 6, 17, 0), // 5:00 PM
      description: 'Review PRs',
    },
    // Week view events
    {
      id: 6,
      title: 'Weekly Planning',
      start: new Date(2025, 10, 7, 9, 0), // Thursday 9:00 AM
      end: new Date(2025, 10, 7, 10, 0), // Thursday 10:00 AM
      description: 'Sprint planning',
    },
    {
      id: 7,
      title: 'Client Meeting',
      start: new Date(2025, 10, 7, 14, 0), // Thursday 2:00 PM
      end: new Date(2025, 10, 7, 15, 30), // Thursday 3:30 PM
      description: 'Quarterly review',
    },
    {
      id: 8,
      title: 'Conference (Multi-day)',
      start: new Date(2025, 10, 6, 8, 0), // Wednesday 8:00 AM
      end: new Date(2025, 10, 8, 18, 0), // Friday 6:00 PM
      description: '3-day tech conference',
    },
  ]);

  const handleEventResize = (
    event: CalendarEvent,
    newStart: Date,
    newEnd: Date
  ) => {
    console.log('Event resized:', {
      title: event.title,
      oldStart: event.start,
      oldEnd: event.end,
      newStart,
      newEnd,
    });

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
      )
    );
  };

  const handleEventDrop = (
    event: CalendarEvent,
    newStart: Date,
    newEnd: Date
  ) => {
    console.log('Event dropped:', {
      title: event.title,
      newStart,
      newEnd,
    });

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Calendrier avec Resize et Drag & Drop</h1>
      <p>
        Ce calendrier démontre les fonctionnalités de resize et déplacement:
      </p>
      <ul>
        <li>✅ Grille temporelle avec lignes fines (slots d'1 heure)</li>
        <li>✅ Resize vertical (haut/bas) pour ajuster les horaires</li>
        <li>✅ Drag & drop pour déplacer les événements</li>
        <li>✅ Snap automatique aux intervalles de 15 minutes</li>
        <li>✅ Tooltip en temps réel pendant le resize</li>
        <li>✅ Détection de collision avec feedback visuel</li>
        <li>✅ Support événements multi-jours</li>
        <li>✅ Durée min: 15 min, max: 24 heures</li>
      </ul>
      <p>
        <strong>Mode d'emploi:</strong>
      </p>
      <ul>
        <li><strong>Resize:</strong> Survolez le haut ou le bas d'un événement et glissez</li>
        <li><strong>Déplacer:</strong> Cliquez sur un événement et glissez vers une nouvelle heure</li>
        <li><strong>Vues:</strong> Testez en Day, Week et Month view</li>
      </ul>

      <Calendar
        events={events}
        onEventResize={handleEventResize}
        onEventDrop={handleEventDrop}
        initialView="week"
        initialDate={new Date(2025, 10, 6)}
        height="800px"
      />
    </div>
  );
};
