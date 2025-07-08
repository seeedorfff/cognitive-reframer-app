import React, { useState, useEffect } from 'react';
import JournalForm from '../components/JournalForm';
import EntryList from '../components/EntryList';
import type { JournalEntry } from '../types';

const Home: React.FC = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                setLoading(true);
                const response = await fetch('api/entries');
                if (!response.ok) {
                    throw new Error('Network response was not ok.')
                }
                const data = await response.json();
                console.log('Fetched entries:', data)
                setEntries(data);
            } catch (error) {
                console.error('Failed to fetch entries:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEntries();
    }, []);

    const handleAddEntry = async (entryContent: string) => {
        try {
            const response = await fetch('/api/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: entryContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to add entry');
            }

            const newEntryResponse = await response.json();
            const newEntry = newEntryResponse.data;

            setEntries(prevEntries => [newEntry, ...prevEntries]);
        } catch (error) {
            console.error('Error creating new entry:', error);
        }
    };

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-12">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-400">
            The Cognitive Reframer
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Identify your thought patterns. Find your clarity.
          </p>
        </div>

        {/* We are now displaying the JournalForm component here */}
        <JournalForm onAddEntry={handleAddEntry}/>

        {loading ? (
            <p className="text-center text-gray-400 mt-10">Loading entries...</p>
        ) : (
            <EntryList entries={entries} />
        )}
      </div>
    </div>
  );
};

export default Home;
