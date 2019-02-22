export const books = {
  on_the_road: 'On the Road',
  the_subterraneans: 'The Subterraneans',
  desolation_angels: 'Desolation Angels',
  visions_of_gerard: 'Visions of Gerard',
  doctor_sax: 'Doctor Sax',
  the_town_and_the_city: 'The Town and the City',
  maggie_cassidy: 'Maggie Cassidy',
  vanity_of_duluoz: 'Vanity of Duluoz',
  visions_of_cody: 'Visions of Cody',
  tristessa: 'Tristessa',
  the_dharma_bums: 'The Dharma Bums',
  big_sur: 'Big Sur',
  satori_in_paris: 'Satori in Paris'
};

export const getBookName = (slug) => {
  return slug in books ? books[slug] : '';
};
