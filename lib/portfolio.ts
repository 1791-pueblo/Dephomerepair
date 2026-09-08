export type Trade = 'drywall' | 'electrical' | 'plumbing';
export type Bundle = 'single' | 'power-pair' | 'triple-play';
export type ProjectType = 'sequence' | 'before-after' | 'single';

export type ProjectPhoto = {
  src: string;
  caption: string;
};

export type PortfolioProject = {
  title: string;
  description: string;
  trades: Trade[];
  bundle: Bundle;
  type: ProjectType;
  photos: ProjectPhoto[];
  supportPhotos?: ProjectPhoto[];
  quoteHint?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Bathroom Renovation — Pony Wall Vanity',
    trades: ['drywall', 'electrical', 'plumbing'],
    bundle: 'triple-play',
    type: 'single',
    quoteHint: 'Bathroom vanity project — plumbing, electrical, and drywall',
    photos: [
      {
        src: '/gallery/bathroom-05-finished-vanity.jpg',
        caption:
          'Finished pony-wall double vanity with the plumbing, electrical, and drywall wrapped into one project. Triple Play is 15% off labor when all three trades are booked together.',
      },
    ],
    description:
      'This bathroom vanity project combined plumbing rough-in, electrical work, and moisture-resistant drywall so the job could move from open wall to finished vanity without juggling multiple contractors.',
  },
  {
    title: 'Closet Conversion with Barn Doors',
    trades: ['drywall'],
    bundle: 'single',
    type: 'sequence',
    quoteHint: 'Closet conversion and drywall finishing',
    photos: [
      {
        src: '/gallery/closet-01-demolition.jpg',
        caption: 'Before: the original closet was opened up so the new layout could start from a clean slate.',
      },
      {
        src: '/gallery/closet-02-framing.jpg',
        caption: 'New framing set the opening and backing so the drywall could finish straight and solid.',
      },
      {
        src: '/gallery/closet-03-progress.jpg',
        caption: 'Drywall in progress with the new opening taking shape for a cleaner storage setup.',
      },
      {
        src: '/gallery/closet-04-near-finished.jpg',
        caption: 'Finish work underway so the edges, joints, and opening all land clean before final hardware.',
      },
      {
        src: '/gallery/closet-05-barn-doors-final.jpg',
        caption: 'Completed barn-door closet conversion with a cleaner look and better use of the space.',
      },
    ],
    description:
      'A drywall-led closet conversion from demo through finish. The result is better storage and a cleaner opening without turning the portfolio into a separate carpentry category.',
  },
  {
    title: 'Rangehood Install + Protected Power',
    trades: ['electrical'],
    bundle: 'single',
    type: 'before-after',
    quoteHint: 'Rangehood install, recessed lights, or kitchen electrical updates',
    photos: [
      {
        src: '/gallery/rangehood-01-rough-opening.jpg',
        caption: 'Before: the opening was cut and the ceiling was prepped for the new rangehood install.',
      },
      {
        src: '/gallery/rangehood-02-finished.jpg',
        caption: 'After: the new rangehood and matching recessed lights finished the kitchen with protected power and clean lines.',
      },
    ],
    supportPhotos: [
      {
        src: '/gallery/electrical-romex-wall.jpg',
        caption: '12-gauge Romex ran from a GFCI-protected circuit so the new kitchen power stayed protected and code-conscious.',
      },
      {
        src: '/gallery/rangehood-soffit-wire.jpg',
        caption: 'The receptacle stayed accessible through the LED cutout so the rangehood could stay plugged in and keep its warranty intact.',
      },
    ],
    description:
      'This install paired the hood with matching lighting and protected power so the finished kitchen looked clean and the manufacturer warranty stayed intact.',
  },
  {
    title: 'Hose Bib Replacement & Leak Repair',
    trades: ['plumbing'],
    bundle: 'single',
    type: 'before-after',
    quoteHint: 'Hose bib, shutoff, or leak repair',
    photos: [
      {
        src: '/gallery/hosebib-01-before.jpg',
        caption: 'Before: the old hose bib was corroded and failing, which is how small outdoor leaks turn into bigger problems.',
      },
      {
        src: '/gallery/hosebib-02-after.jpg',
        caption: 'After: the new brass hose bib closed up clean and gave the homeowner a reliable connection again.',
      },
    ],
    supportPhotos: [
      {
        src: '/gallery/plumbing-ceiling-stain.jpg',
        caption: 'This ceiling stain showed why the leak needed to be traced properly instead of just treating the symptom.',
      },
      {
        src: '/gallery/plumbing-access-hole.jpg',
        caption: 'The access opening made the repair possible, and the drywall patch can be handled in the same visit while we are there.',
      },
    ],
    description:
      'A straightforward plumbing repair with the kind of access work that often leads naturally into a same-visit drywall patch.',
  },
  {
    title: 'Under-Cabinet LED Lighting',
    trades: ['electrical'],
    bundle: 'single',
    type: 'single',
    quoteHint: 'Under-cabinet lighting or outlet upgrades',
    photos: [
      {
        src: '/gallery/led-under-cabinet-lighting.jpg',
        caption: 'Under-cabinet LED lighting puts the light on the counter where it helps most without adding more ceiling fixtures.',
      },
    ],
    description:
      'A focused electrical upgrade that improves how the kitchen works at night and pairs well with an outlet or switch update in the same stop.',
  },
];
