// Projects sourced from the "Render For Website" folder — one subfolder = one project.
// Optimized images live in compressed_renders/.
// Edit titles and descriptions here; add or remove `images` entries if files change.

function renderProjectImageUrl(folder, file) {
  return '../compressed_renders/' + encodeURIComponent(folder) + '/' + encodeURIComponent(file);
}

/** @type {Array<{ slug: string, title: string, tag: string, folder: string, shortDescription: string, description: string, images: string[] }>} */
var RENDER_PROJECTS = [
  {
    slug: '1200-yard-mohali',
    title: '1200 Yard — Mohali',
    tag: 'Residential',
    folder: '1200 Yard Mohali',
    shortDescription: 'Large-format residential elevation and façade study for a spacious Mohali plot.',
    description:
      'This project covers the exterior vision for a 1200-square-yard residence in Mohali. The elevation balances solid massing, glazing, and vertical rhythm suited to a premium standalone home. Renders explore materiality and proportions so clients can approve the look before construction.',
    images: ['Elevation-1.jpg'],
  },
  {
    slug: 'ags-motors-office',
    title: 'AGS Motors Office',
    tag: 'Commercial',
    folder: 'AGS Motors Ofiice',
    shortDescription: 'Full office interior visualisation — reception, conference, cabins, and staff areas.',
    description:
      'A complete set of interior renders for the AGS Motors office: account rooms, conference suite, corridors, main office, and staff cabins. The design emphasises a professional, welcoming environment with consistent finishes and lighting across departments. See the gallery for room-by-room views.',
    images: [
      'Accounts Room (1).jpg',
      'Accounts Room (2).jpg',
      'Accounts Room (3).jpg',
      'Conference (1).jpg',
      'Conference (2).jpg',
      'Conference (3).jpg',
      'Conference (4).jpg',
      'Coridor (1).jpg',
      'Coridor (2).jpg',
      'Coridor (3).jpg',
      'Main Office (1).jpg',
      'Main Office (2).jpg',
      'Main Office (3).jpg',
      'Staff Area & Cabins (1).jpg',
      'Staff Area & Cabins (2).jpg',
      'Staff Area & Cabins (3).jpg',
      'Staff Area & Cabins (4).jpg',
    ],
  },
  {
    slug: 'ags-office',
    title: 'AGS Office',
    tag: 'Commercial',
    folder: 'AGS Office',
    shortDescription: 'Conference, reception, and staff cabin spaces for a compact corporate fit-out.',
    description:
      'Interior renders for another AGS office iteration, focusing on the conference sequence, reception, and individual staff cabin. Useful for aligning on furniture layout, ceiling treatment, and branding moments before site execution.',
    images: ['Conference 1.jpg', 'Conference 2.jpg', 'Conference 3.jpg', 'Reception 1.jpg', 'Reception 2.jpg', 'Staff Cabin-1.jpg'],
  },
  {
    slug: 'beauty-spot',
    title: 'Beauty Spot',
    tag: 'Retail / Spa',
    folder: 'Beauty Spot',
    shortDescription: 'Multi-level interior views for a beauty and wellness retail environment.',
    description:
      'Floor-wise interior studies for the Beauty Spot concept, showing how customer circulation, treatment zones, and display come together across levels. The renders support lease discussions, approvals, and contractor briefs.',
    images: ['2-F.jpg', '3-F.jpg', '4-F.jpg'],
  },
  {
    slug: 'hisar-residence-500-yard',
    title: 'Hisar Residence — 500 Yard',
    tag: 'Residential interior',
    folder: 'Hisar Residence 500 Yard',
    shortDescription: 'Bedrooms and dresser areas for a large Hisar home — materials and lighting studies.',
    description:
      'Interior visualisation for a 500-yard residence in Hisar, covering primary and secondary bedrooms plus detailed dresser zones. The set is ideal for locking joinery details, wall finishes, and wardrobe integration ahead of site work.',
    images: [
      'Bedroom-1 (1).jpg',
      'Bedroom-1 (2).jpg',
      'Bedroom-2 (1).jpg',
      'Bedroom-2 (2).jpg',
      'Dresser (1).jpg',
      'Dresser (2).jpg',
      'Dresser (3).jpg',
      'Dresser (4).jpg',
    ],
  },
  {
    slug: 'panipat-office-interior',
    title: 'Panipat — Office interior',
    tag: 'Commercial',
    folder: 'Panipat Office Interior',
    shortDescription: 'Main office space in Panipat — layout, workstations, and overall ambience.',
    description:
      'Panipat office interior renders focused on the main open office: seating clusters, circulation, ceiling, and daylight. Intended for stakeholder sign-off and as a reference for MEP and furniture vendors.',
    images: ['Main Office (1).webp', 'Main Office (2).webp', 'Main Office (3).webp', 'Main Office (4).webp'],
  },
  {
    slug: 'sirsa-residence-400-yard',
    title: 'Sirsa Residence — 400 Yard',
    tag: 'Residential interior',
    folder: 'Sirsa Residence 400 Yard',
    shortDescription: 'Two bedroom schemes for a Sirsa home — comfort, storage, and light.',
    description:
      'Bedroom interior renders for a 400-yard house in Sirsa. The images explore alternate moods for sleeping zones while keeping Vastu and practical storage in mind. Suitable for client selection of palettes and soft furnishings.',
    images: ['Bedroom-1 (1).jpg', 'Bedroom-1 (2).jpg', 'Bedroom-1 (3).jpg', 'Bedroom-2 (1).jpg', 'Bedroom-2 (2).jpg'],
  },
  {
    slug: 'misc-elevations',
    title: 'Miscellaneous elevations',
    tag: 'Exterior studies',
    folder: 'Misc Elevations',
    shortDescription: 'Mixed façade and massing studies — residences and multi-storey blocks.',
    description:
      'A collection of independent elevation and view renders: individual residences and stacked-floor concepts. Use this gallery to browse form, balcony rhythm, and rooflines across different briefs.',
    images: ['abhishek residence.webp', 'elevation.webp', 's+4-1.webp', 's+4-2.webp', 'view-1.webp'],
  },
];

function getRenderProjectBySlug(slug) {
  if (!slug || !RENDER_PROJECTS.length) return null;
  var s = String(slug).toLowerCase();
  for (var i = 0; i < RENDER_PROJECTS.length; i++) {
    if (RENDER_PROJECTS[i].slug === s) return RENDER_PROJECTS[i];
  }
  return null;
}
