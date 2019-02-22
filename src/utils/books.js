export const books = {
  visions_of_gerard: 'Visions of Gerard',
  doctor_sax: 'Doctor Sax',
  the_town_and_the_city: 'The Town and the City',
  maggie_cassidy: 'Maggie Cassidy',
  vanity_of_duluoz: 'Vanity of Duluoz',
  on_the_road: 'On the Road',
  visions_of_cody: 'Visions of Cody',
  the_subterraneans: 'The Subterraneans',
  tristessa: 'Tristessa',
  the_dharma_bums: 'The Dharma Bums',
  desolation_angels: 'Desolation Angels',
  big_sur: 'Big Sur',
  satori_in_paris: 'Satori in Paris'
};

export const getBookName = (slug) => {
  return slug in books ? books[slug] : '';
};
