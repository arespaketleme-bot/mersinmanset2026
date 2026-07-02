// Unified Date formatting utility for friendly Turkish relative dates

export function formatFriendlyDate(dateStr: string): string {
  const pubDate = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - pubDate.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMinutes >= 0 && diffMinutes < 1) {
    return "Az önce";
  }
  if (diffMinutes < 60 && diffMinutes > 0) {
    return `${diffMinutes} dakika önce`;
  }
  if (diffHours < 24 && diffHours > 0) {
    const timeFormatted = pubDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    return `${diffHours} saat önce (${timeFormatted})`;
  }

  return pubDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
