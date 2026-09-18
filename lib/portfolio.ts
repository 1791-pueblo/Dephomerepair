export type Trade = 'drywall' | 'electrical' | 'plumbing';
export type Bundle = 'single' | 'power-pair' | 'triple-play';
export type ProjectType = 'sequence' | 'before-after' | 'single';

export type ProjectPhoto = {
  src: string;
  caption: string;
};

export type PortfolioProject = {
  title: string;
  tag: string;
  trades: Trade[];
  bundle: Bundle;
  type: ProjectType;
  description: string;
  quoteHint?: string;
  photos: ProjectPhoto[];
  supportPhotos?: ProjectPhoto[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Bathroom Renovation \u2014 Pony Wall Vanity',
    tag: 'Drywall + Electrical + Plumbing',
    trades: ['drywall', 'electrical', 'plumbing'],
    bundle: 'triple-play',
    type: 'sequence',
    quoteHint: 'Bathroom remodel / vanity \u2014 Triple Play',
    description:
      'One visit covered the wet-wall rebuild and the vanity: R-TECH foam and Henry waterproofing, plumbing and electrical rough-in, moisture-resistant drywall, then a pony-wall double vanity. That is a Triple Play \u2014 15% off labor when all three trades are booked together.',
    photos: [
      {
        src: 'https://lh3.googleusercontent.com/d/1HxZMIpEU5uW9epRSZk4Fz1NJVKDfK8w1',
        caption: 'Before: Exposed supply lines and block wall — the plumbing the pony wall will hide.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1gYfPUl8WzmyvebtzpEnpwOuZ5rQW8kZF',
        caption: 'During: R-TECH foam and Henry membrane on the wet wall.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1s7HqrapOAOqJ9rYSMz_qoTHRK6k4i8-9',
        caption: 'During: Vanity alcove framed and insulated.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1YhFQUVv9csjTdJkwWLuQWxDUtkKM-c4q',
        caption: 'During: New outlet on the pony wall, GFCI-protected from the opposite wall.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/19sl-8DeW3HqVh9xyU8QwTNHxCs6PDH-k',
        caption: 'During: Checking the pony-wall cap for square.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1cwj5ptwl17krEnI6_m_70sD_Rh43tGWc',
        caption: 'During: Board, mud, and the plumbing access opening.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1BrECGoz9k6pblvXUktneRYrsv5p61Zrx',
        caption: 'During: Texture matched — stubs ready for the double vanity.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1ey_nDScbtzFrE_zOYyWl5cBW7ybxSXPX',
        caption: 'After: Double vanity, pony wall, and access panel. Triple Play — drywall, electrical, and plumbing together.',
      },
    ],
  },
  {
    title: 'Closet Conversion with Barn Doors',
    tag: 'Drywall',
    trades: ['drywall'],
    bundle: 'single',
    type: 'sequence',
    description: 'Demo through finish on a closet conversion. Framing and drywall built the new opening; barn doors closed it up. Storage work like this pairs cleanly with an outlet or LED if you want a Power Pair in the same visit.',
    photos: [
      { src: '/gallery/closet-01-demolition.jpg', caption: 'Before: Original closet opened up.' },
      { src: '/gallery/closet-02-framing.jpg', caption: 'During: Framing and wall build-out.' },
      { src: '/gallery/closet-03-progress.jpg', caption: 'During: Drywall going up.' },
      { src: 'https://lh3.googleusercontent.com/d/1ghRaxirml0DRqZdjsl5MijDlCYOvo9Ze', caption: 'During: Built-out wall and corner shelves that narrowed the entry.' },
      { src: '/gallery/closet-04-near-finished.jpg', caption: 'During: Finish work underway.' },
      { src: 'https://lh3.googleusercontent.com/d/1M2nFdvqDSvse3lf4b952WMtLjvtiEGzy', caption: 'After: Barn doors on the track, wall patched and painted.' },
      { src: 'https://lh3.googleusercontent.com/d/10NrJsC_RBY4TFNucrnzhssgWDiJlZq-i', caption: 'After: Doors hung and open — rod, shelf, clean opening.' },
    ],
  },
  {
    title: 'Rangehood Install + Protected Power',
    tag: 'Electrical',
    trades: ['electrical'],
    bundle: 'single',
    type: 'before-after',
    description: 'Rangehood swap with matching recessed lights. Power came off a GFCI-protected circuit and stayed on a receptacle in the soffit so the manufacturer warranty stays intact \u2014 hardwiring would have voided it.',
    photos: [
      { src: '/gallery/rangehood-01-rough-opening.jpg', caption: 'Before: ceiling opened and the rough opening cut for the new hood.' },
      { src: '/gallery/rangehood-02-finished.jpg', caption: 'After: Ancona rangehood and matching recessed lights \u2014 clean lines, quiet power.' },
    ],
    supportPhotos: [
      { src: '/gallery/electrical-romex-wall.jpg', caption: '12-gauge Romex from a 20A GFCI \u2014 protected power, run to code.' },
      { src: '/gallery/rangehood-soffit-wire.jpg', caption: 'Receptacle left accessible through the LED cut-out so the hood stays plugged in. Hardwiring voids the warranty.' },
    ],
  },
  {
    title: 'Hose Bib Replacement & Leak Repair',
    tag: 'Plumbing',
    trades: ['plumbing'],
    bundle: 'single',
    type: 'before-after',
    description: 'Corroded outdoor hose bib replaced with new brass. Related indoor staining got an access opening so the leak could be found and stopped. The drywall close-up is a natural add-on \u2014 book both and the service call is waived.',
    photos: [
      { src: '/gallery/hosebib-01-before.jpg', caption: 'Before: outdoor hose bib eaten up by corrosion and ready to fail.' },
      { src: '/gallery/hosebib-02-after.jpg', caption: 'After: new brass hose bib, tight and ready for another decade of use.' },
    ],
    supportPhotos: [
      { src: '/gallery/plumbing-ceiling-stain.jpg', caption: 'Ceiling stain above the toilet \u2014 the indoor clue that the outdoor bib was not the whole story.' },
      { src: '/gallery/plumbing-access-hole.jpg', caption: 'Access cut to find and stop the leak. While we are there, the drywall patch can close in the same visit.' },
    ],
  },
  {
    title: 'Under-Cabinet LED Lighting',
    tag: 'Electrical',
    trades: ['electrical'],
    bundle: 'single',
    type: 'single',
    description: 'Low-voltage LED strip under the cabinets for even task light. A small electrical upgrade that changes how the kitchen works at night. Add a missing outlet in the same stop and it becomes a Power Pair.',
    photos: [
      { src: '/gallery/led-under-cabinet-lighting.jpg', caption: 'Custom low-voltage LED under-cabinet lighting \u2014 even light on the counter, no extra cans in the ceiling.' },
    ],
  },
];
