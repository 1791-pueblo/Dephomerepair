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

/**
 * Bathroom slider order (locked to Jason’s numbering):
 * 1. Current start frame stays in slot 1 until a preconstruction photo is dropped in Drive.
 * 2. Tech-foam / R-TECH photo stays numbered as slot 2. Do not bump 3–5.
 * 3–5 stay in their current slots.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Bathroom Renovation — Pony Wall Vanity',
    tag: 'Drywall + Electrical + Plumbing',
    trades: ['drywall', 'electrical', 'plumbing'],
    bundle: 'triple-play',
    type: 'sequence',
    quoteHint: 'Bathroom remodel / vanity — Triple Play',
    description:
      'One visit covered the wet-wall rebuild and the vanity: R-TECH foam and Henry waterproofing, plumbing and electrical rough-in, moisture-resistant drywall, then a pony-wall double vanity. That is a Triple Play — 15% off labor when all three trades are booked together.',
    photos: [
      {
        src: 'https://github.com/user-attachments/assets/450a22cd-9193-4af4-a8a5-e056e4459848',
        caption:
          'Rough-in underway: pony-wall framed, R-TECH foam in the wet wall, and supply lines stubbed for the new double vanity.',
      },
      {
        src: 'https://github.com/user-attachments/assets/6f7576a1-174e-47f0-a4d3-316da4ffc6c5',
        caption:
          'Tech-foam wall check: outlet box set in the insulated assembly and laid out so the finished vanity and mirror land clean.',
      },
      {
        src: 'https://github.com/user-attachments/assets/43a17179-21fa-4ec0-9ea5-8697ac113b95',
        caption:
          'Vanity alcove opened. Tub stays protected while plumbing stubs and drywall repairs get finished in the same trip.',
      },
      {
        src: 'https://github.com/user-attachments/assets/0253e8ac-69d8-44c3-8375-0c791fc83dd1',
        caption:
          'Greenboard patches and valve stubs set. The wall is ready for the cabinet, top, and fixtures.',
      },
      {
        src: '/gallery/bathroom-pony-wall-vanity-finished.jpg',
        caption:
          'Finished pony-wall double vanity, quartz-look top, and storage. Plumbing, electrical, and drywall closed in one project. Same visit we can bundle the next repair — Triple Play is 15% off labor.',
      },
    ],
  },
  {
    title: 'Closet Conversion with Barn Doors',
    tag: 'Drywall',
    trades: ['drywall'],
    bundle: 'single',
    type: 'sequence',
    quoteHint: 'Drywall + framing support on a storage conversion',
    description:
      'Demo through finish on a closet conversion. Framing and drywall built the new opening; barn doors closed it up. Storage work like this pairs cleanly with an outlet or LED if you want a Power Pair in the same visit.',
    photos: [
      {
        src: '/gallery/closet-01-demolition.jpg',
        caption: 'Before: original closet opened up — clean slate for a layout that actually holds what you own.',
      },
      {
        src: '/gallery/closet-02-framing.jpg',
        caption: 'New framing and opening built to the door size, square and ready for board.',
      },
      {
        src: '/gallery/closet-03-progress.jpg',
        caption: 'Drywall hung and taped. The opening is locked in before paint and hardware.',
      },
      {
        src: '/gallery/closet-04-near-finished.jpg',
        caption: 'Finish work underway — edges clean, opening ready for the barn-door track.',
      },
      {
        src: '/gallery/closet-05-barn-doors-final.jpg',
        caption:
          'Completed barn-door closet. If you also want an outlet or a lighting run inside, that is a Power Pair — 10% off labor.',
      },
    ],
  },
  {
    title: 'Rangehood Install + Protected Power',
    tag: 'Electrical',
    trades: ['electrical'],
    bundle: 'single',
    type: 'before-after',
    quoteHint: 'Rangehood / dedicated receptacle / recessed lights',
    description:
      'Rangehood swap with matching recessed lights. Power came off a GFCI-protected circuit and stayed on a receptacle in the soffit so the manufacturer warranty stays intact — hardwiring would have voided it.',
    photos: [
      {
        src: '/gallery/rangehood-01-rough-opening.jpg',
        caption: 'Before: ceiling opened and the rough opening cut for the new hood.',
      },
      {
        src: '/gallery/rangehood-02-finished.jpg',
        caption: 'After: Ancona rangehood and matching recessed lights — clean lines, quiet power.',
      },
    ],
    supportPhotos: [
      {
        src: '/gallery/electrical-romex-wall.jpg',
        caption: '12-gauge Romex from a 20A GFCI — protected power, run to code.',
      },
      {
        src: '/gallery/rangehood-soffit-wire.jpg',
        caption:
          'Receptacle left accessible through the LED cut-out so the hood stays plugged in. Hardwiring voids the warranty.',
      },
    ],
  },
  {
    title: 'Hose Bib Replacement & Leak Repair',
    tag: 'Plumbing',
    trades: ['plumbing'],
    bundle: 'single',
    type: 'before-after',
    quoteHint: 'Hose bib + leak access. Drywall patch is a natural Power Pair.',
    description:
      'Corroded outdoor hose bib replaced with new brass. Related indoor staining got an access opening so the leak could be found and stopped. The drywall close-up is a natural add-on — book both and the service call is waived.',
    photos: [
      {
        src: '/gallery/hosebib-01-before.jpg',
        caption: 'Before: outdoor hose bib eaten up by corrosion and ready to fail.',
      },
      {
        src: '/gallery/hosebib-02-after.jpg',
        caption: 'After: new brass hose bib, tight and ready for another decade of use.',
      },
    ],
    supportPhotos: [
      {
        src: '/gallery/plumbing-ceiling-stain.jpg',
        caption: 'Ceiling stain above the toilet — the indoor clue that the outdoor bib was not the whole story.',
      },
      {
        src: '/gallery/plumbing-access-hole.jpg',
        caption:
          'Access cut to find and stop the leak. While we are there, the drywall patch can close in the same visit.',
      },
    ],
  },
  {
    title: 'Under-Cabinet LED Lighting',
    tag: 'Electrical',
    trades: ['electrical'],
    bundle: 'single',
    type: 'single',
    quoteHint: 'Low-voltage LED lighting. Add an outlet for a Power Pair.',
    description:
      'Low-voltage LED strip under the cabinets for even task light. A small electrical upgrade that changes how the kitchen works at night. Add a missing outlet in the same stop and it becomes a Power Pair.',
    photos: [
      {
        src: '/gallery/led-under-cabinet-lighting.jpg',
        caption:
          'Custom low-voltage LED under-cabinet lighting — even light on the counter, no extra cans in the ceiling.',
      },
    ],
  },
];
