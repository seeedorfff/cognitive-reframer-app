import type { JournalEntry } from '../types';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

function JournalEntryCard({ entry }: JournalEntryCardProps) {
  // Format the date for better readability
  const displayDate = new Date(entry.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md">
      <p className="text-sm text-gray-400 mb-2">{displayDate}</p>
      <p className="text-white whitespace-pre-wrap">{entry.content}</p>

      {/* Only show the analysis section if it exists */}
      {entry.analysis && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-blue-300 mb-2">AI Analysis</h3>
          <div>
            <h4 className="font-bold text-gray-300">Detected Distortions:</h4>
            <ul className="list-disc list-inside text-gray-400">
              {entry.analysis.detected_distortions.map((distortion) => (
                <li key={distortion}>{distortion}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <h4 className="font-bold text-gray-300">Reframing Questions:</h4>
            <ul className="list-disc list-inside text-gray-400">
              {entry.analysis.reframing_questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default JournalEntryCard;