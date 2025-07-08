import JournalEntryCard from './JournalEntryCard';
import type { JournalEntry } from '../types';

interface EntryListProps {
    entries: JournalEntry[];
}

function EntryList({ entries = [] }: EntryListProps) {
    console.log('Props received by EntryList:', entries);
  return (
    <div className="space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-300">Past Entries</h2>
      {entries && entries.length > 0 ? (
        entries.map((entry) => (
          <JournalEntryCard
            key={entry.id}
            entry={entry}
          />
        ))
      ) : (
        <p className="text-gray-500">No entries yet. Write your first entry.</p>
      )}
    </div>
  );
}

export default EntryList;
