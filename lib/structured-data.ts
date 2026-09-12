/**
 * schema.org JSON-LD for search engines and AI answer engines.
 *
 * Every fact here mirrors what is on the user-facing pages or the Eventbrite
 * listing — keep them in sync when the event details change.
 */

export const SITE_URL = 'https://www.swwafestival.com';

export const EVENT = {
  name: 'Start Where We Are Earth Music Festival 2026',
  shortName: 'SWWA Festival 2026',
  date: 'Wednesday, September 23, 2026',
  startDate: '2026-09-23T18:00:00-04:00',
  endDate: '2026-09-23T22:00:00-04:00',
  doorTime: '2026-09-23T17:00:00-04:00',
  ticketUrl:
    'https://www.eventbrite.com/e/start-where-we-are-earth-music-festival-2026-tickets-1998927218119',
  donateUrl: 'https://givebutter.com/swwafestival',
  email: 'startwherewearefestival@gmail.com',
  ogImage: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/2026-swwa-logo.png`,
} as const;

// Stable @ids so the same entity can be referenced from several pages.
const ID = {
  org: `${SITE_URL}/#organization`,
  site: `${SITE_URL}/#website`,
  event: `${SITE_URL}/#event`,
  venue: `${SITE_URL}/#venue`,
  founder: `${SITE_URL}/#sofia-villarreal`,
  home: `${SITE_URL}/#webpage`,
  press: `${SITE_URL}/press#webpage`,
} as const;

export const ARTISTS = [
  { name: 'SWWA Collective', url: 'https://sofiavillarrealmusic.com/', image: '/artists/swwa.jpg' },
  { name: 'Dimitris Terpizis Quartet', url: 'https://dimitristerpizis.com/', image: '/artists/dimitris-terpizis-quartet.jpg' },
  { name: 'Sofia Almeida & Yujin Han Duo', url: 'https://www.instagram.com/sofia.almeida.music/', image: '/artists/sofia-almedia-yujin-han.jpg' },
  { name: 'Rita Valldeperas', url: 'https://ritavalldeperas.com/', image: '/artists/rita-valldeperas.jpg' },
  { name: 'Jade Faria', url: 'https://www.jadefaria.com.br/', image: '/artists/jade-faria.jpg' },
  { name: 'LAVAGXRL', url: 'https://www.instagram.com/lavagxrl/', image: '/artists/lavagxrl.jpg' },
] as const;

const SPONSORS = ['Berklee', 'BGJI', 'Bow Market', 'JGJ', 'Liberal Arts', 'Life Alive'];

const organization = {
  '@type': 'Organization',
  '@id': ID.org,
  name: 'Start Where We Are Festival',
  alternateName: ['SWWA Festival', 'Start Where We Are', 'SWWA'],
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: EVENT.logo, width: 1033, height: 275 },
  image: EVENT.ogImage,
  description:
    'A grassroots, volunteer-run music and sustainability festival in the Boston area. Start Where We Are brings together local musicians, eco-friendly vendors and climate organizations at Bow Market in Somerville, MA, and gives back to environmental organizations.',
  email: EVENT.email,
  founder: { '@id': ID.founder },
  areaServed: [
    { '@type': 'City', name: 'Boston', sameAs: 'https://en.wikipedia.org/wiki/Boston' },
    { '@type': 'City', name: 'Somerville', sameAs: 'https://en.wikipedia.org/wiki/Somerville,_Massachusetts' },
    { '@type': 'City', name: 'Cambridge', sameAs: 'https://en.wikipedia.org/wiki/Cambridge,_Massachusetts' },
  ],
  knowsAbout: ['live music', 'sustainability', 'climate action', 'environmental nonprofits', 'Boston music scene'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'general inquiries',
    email: EVENT.email,
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.instagram.com/startwherewearefestival/',
    'https://www.facebook.com/profile.php?id=61550360650106',
    EVENT.ticketUrl,
    EVENT.donateUrl,
  ],
};

const founder = {
  '@type': 'Person',
  '@id': ID.founder,
  name: 'Sofia Villarreal',
  jobTitle: 'Founder',
  description: 'Founder of the Start Where We Are Festival and a Boston-based musician.',
  url: 'https://sofiavillarrealmusic.com/',
  worksFor: { '@id': ID.org },
  subjectOf: {
    '@type': 'Article',
    headline: 'Meet Sofia Villarreal',
    url: 'https://canvasrebel.com/meet-sofia-villarreal/',
    publisher: { '@type': 'Organization', name: 'Canvas Rebel' },
    datePublished: '2024',
  },
  sameAs: ['https://sofiavillarrealmusic.com/', 'https://canvasrebel.com/meet-sofia-villarreal/'],
};

const venue = {
  '@type': ['Place', 'EventVenue'],
  '@id': ID.venue,
  name: 'Upstairs at Bow — Bow Market',
  alternateName: ['Bow Market', 'Upstairs at Bow'],
  url: 'https://www.bowmarketsomerville.com/',
  description:
    "Indoor performance space above Bow Market, Somerville's courtyard of local food, art and community, in the Union Square neighborhood — a short ride from downtown Boston and Cambridge.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Bow Market Way',
    addressLocality: 'Somerville',
    addressRegion: 'MA',
    postalCode: '02143',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 42.3813, longitude: -71.098 },
  containedInPlace: { '@type': 'City', name: 'Somerville', sameAs: 'https://en.wikipedia.org/wiki/Somerville,_Massachusetts' },
  publicAccess: true,
  isAccessibleForFree: true,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Indoor venue (rain or shine)', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Public transit access', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Nearby parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Food and drink on site', value: true },
  ],
  hasMap: 'https://www.google.com/maps/search/?api=1&query=1+Bow+Market+Way+Somerville+MA+02143',
};

const event = {
  '@type': ['Festival', 'MusicEvent'],
  '@id': ID.event,
  name: EVENT.name,
  alternateName: [EVENT.shortName, 'Start Where We Are Festival', 'SWWA Earth Music Festival', 'Earth Music Festival Boston'],
  description:
    `${EVENT.name} is a free, all-ages benefit concert for environmental organizations on ${EVENT.date}, 6:00–10:00 PM (doors 5:00 PM) at Upstairs at Bow, Bow Market, 1 Bow Market Way, Somerville, MA — minutes from Boston and Cambridge. ` +
    'The evening features live performances from Boston-area artists (SWWA Collective, Dimitris Terpizis Quartet, Sofia Almeida & Yujin Han Duo, Rita Valldeperas, Jade Faria and LAVAGXRL), courtyard fires, eco-friendly vendors and climate organizations, and food and drink from Bow Market\'s award-winning businesses. ' +
    'Admission is free with a suggested $15 donation; proceeds support the artists and give back to environmental organizations. Indoor venue — rain or shine.',
  disambiguatingDescription:
    'Free live-music benefit concert for the environment in Somerville / Boston, MA on the evening of Wednesday, September 23, 2026.',
  url: SITE_URL,
  image: [EVENT.ogImage, EVENT.logo, ...ARTISTS.map((a) => `${SITE_URL}${a.image}`)],
  startDate: EVENT.startDate,
  endDate: EVENT.endDate,
  doorTime: EVENT.doorTime,
  duration: 'PT4H',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: { '@id': ID.venue },
  organizer: { '@id': ID.org },
  funder: { '@id': ID.org },
  performer: ARTISTS.map((a) => ({
    '@type': 'MusicGroup',
    name: a.name,
    url: a.url,
    image: `${SITE_URL}${a.image}`,
    sameAs: [a.url],
  })),
  sponsor: SPONSORS.map((name) => ({ '@type': 'Organization', name })),
  offers: [
    {
      '@type': 'Offer',
      name: 'General admission (free)',
      price: '0',
      priceCurrency: 'USD',
      url: EVENT.ticketUrl,
      availability: 'https://schema.org/InStock',
      validFrom: '2026-09-01T00:00:00-04:00',
      category: 'primary',
      description: 'Free admission. Register on Eventbrite.',
    },
    {
      '@type': 'Offer',
      name: 'Suggested donation',
      price: '15',
      priceCurrency: 'USD',
      url: EVENT.ticketUrl,
      availability: 'https://schema.org/InStock',
      validFrom: '2026-09-01T00:00:00-04:00',
      description: 'Suggested $15 donation to support the festival and local climate action.',
    },
  ],
  isAccessibleForFree: true,
  audience: {
    '@type': 'PeopleAudience',
    audienceType: 'All ages — families, students, music lovers and the climate-conscious',
  },
  typicalAgeRange: '0-',
  inLanguage: 'en-US',
  about: [
    { '@type': 'Thing', name: 'Live music' },
    { '@type': 'Thing', name: 'Sustainability' },
    { '@type': 'Thing', name: 'Climate action' },
    { '@type': 'Thing', name: 'Environmental nonprofits' },
    { '@type': 'Thing', name: 'Boston music scene' },
  ],
  keywords: [
    'things to do in Boston',
    'things to do in Boston this week',
    'free events Boston',
    'free things to do in Boston',
    'Boston events September 2026',
    'Somerville events',
    'Union Square Somerville events',
    'Bow Market events',
    'live music Boston',
    'live music Somerville',
    'Boston music festival',
    'benefit concert Boston',
    'sustainability festival',
    'climate event Boston',
    'eco festival Massachusetts',
    'Earth music festival',
    'SWWA Festival',
  ].join(', '),
};

const website = {
  '@type': 'WebSite',
  '@id': ID.site,
  url: SITE_URL,
  name: 'Start Where We Are Festival',
  alternateName: 'SWWA Festival',
  description: 'Official site of the Start Where We Are Earth Music Festival — a free benefit concert for the environment at Bow Market in Somerville, MA.',
  publisher: { '@id': ID.org },
  inLanguage: 'en-US',
};

const homePage = {
  '@type': 'WebPage',
  '@id': ID.home,
  url: SITE_URL,
  name: 'Start Where We Are Earth Music Festival 2026 — Free Benefit Concert in Somerville, MA',
  description: event.disambiguatingDescription,
  isPartOf: { '@id': ID.site },
  about: { '@id': ID.event },
  mainEntity: { '@id': ID.event },
  primaryImageOfPage: { '@type': 'ImageObject', url: EVENT.ogImage, width: 1200, height: 630 },
  inLanguage: 'en-US',
  datePublished: '2025-08-01',
  dateModified: '2026-09-11',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }],
  },
  // Sections search engines / assistants can cite directly.
  hasPart: [
    { '@type': 'WebPageElement', name: 'Artists / Lineup', url: `${SITE_URL}/#lineup` },
    { '@type': 'WebPageElement', name: 'Location & Date', url: `${SITE_URL}/#location` },
  ],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '#location'],
  },
};

const pressPage = {
  '@type': ['WebPage', 'CollectionPage'],
  '@id': ID.press,
  url: `${SITE_URL}/press`,
  name: 'Press & Media — Start Where We Are Festival',
  description: 'Press coverage, media features and press contact for the Start Where We Are Festival in Somerville, MA.',
  isPartOf: { '@id': ID.site },
  about: { '@id': ID.org },
  inLanguage: 'en-US',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Press', item: `${SITE_URL}/press` },
    ],
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Article',
          headline: 'Meet Sofia Villarreal',
          url: 'https://canvasrebel.com/meet-sofia-villarreal/',
          publisher: { '@type': 'Organization', name: 'Canvas Rebel' },
          datePublished: '2024',
          about: { '@id': ID.founder },
        },
      },
    ],
  },
};

export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [organization, founder, website, venue, event],
};

export const homePageSchema = { '@context': 'https://schema.org', ...homePage };
export const pressPageSchema = { '@context': 'https://schema.org', ...pressPage };
