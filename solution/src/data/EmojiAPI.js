import ALL_EMOJIS from './ALL_EMOJIS.json';

export const search = (query, limit) => {
  query = query.toLowerCase();
  return ALL_EMOJIS.filter(emoji => {
    const title = emoji.title.toLowerCase();
    const keywords = emoji.keywords.toLowerCase();
    return title.includes(query) || keywords.includes(query);
  }).slice(0, limit);
};
