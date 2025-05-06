// Add this temporary fix function to directly map the path bookIds to internal bookIds

export function getInternalBookIdFromPathParam(pathBookId: string): string {
  const bookIdMapping: Record<string, string> = {
    // Map path IDs to their corresponding bookIds in storage
    '0a': '0a',
    '0b': '0b',
    '0c': '0c',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7'
  };

  return bookIdMapping[pathBookId] || pathBookId;
}
