import React from 'react';
import { Text, Vertical } from 'app-studio';
import { DataState } from '../DataState';
import { DataStateQuery } from '../DataState/DataState.type';

type Note = { id: string; title: string };

const reload = () => {};
const queries: DataStateQuery<Note[]>[] = [
  { status: 'loading', reload },
  { status: 'success', data: [], reload },
  { status: 'success', data: [{ id: '1', title: 'Buy milk' }], reload },
  { status: 'error', error: { status: 403 }, reload },
  { status: 'error', error: { status: 404 }, reload },
  { status: 'error', error: new TypeError('Failed to fetch'), reload },
];

export const DataStateStates = () => (
  <Vertical gap={16}>
    {queries.map((query, index) => (
      <DataState
        key={index}
        query={query}
        isEmpty={(notes) => notes.length === 0}
        empty={{ title: 'No notes yet', description: 'Write your first one.' }}
      >
        {(notes) => notes.map((note) => <Text key={note.id}>{note.title}</Text>)}
      </DataState>
    ))}
  </Vertical>
);
