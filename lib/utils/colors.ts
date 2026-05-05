export const getCategoryBadgeColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    Electronics: 'bg-blue-500/30 text-blue-300',
    Machinery: 'bg-purple-500/30 text-purple-300',
    FMCG: 'bg-green-500/30 text-green-300',
    'Raw Materials': 'bg-orange-500/30 text-orange-300',
  };
  return colorMap[category] ?? 'bg-gray-500/30 text-gray-300';
};
