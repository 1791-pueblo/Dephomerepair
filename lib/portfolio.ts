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

export const tradeCardProjects: Record<
  Trade,
  { type: ProjectType; photos: ProjectPhoto[] }
> = {
  drywall: {
    type: 'sequence',
    photos: [
      { src: '/gallery/closet-01-demolition.jpg', caption: 'Before — Closet: demo opened the original layout so the new storage plan could start clean.' },
      { src: '/gallery/closet-02-framing.jpg', caption: 'During — Closet: framing sets the new opening before drywall closes it in.' },
      { src: '/gallery/closet-03-progress.jpg', caption: 'During — Closet: drywall and layout work are in, with the finish taking shape.' },
      { src: '/gallery/closet-05-barn-doors-final.jpg', caption: 'After — Closet: barn doors finish the conversion and give the room better storage without wasted space.' },
      { src: '/gallery/bathroom-pony-wall-vanity-finished.jpg', caption: 'After — Pony-wall vanity: the bathroom finish ties drywall work into a full one-visit remodel story.' },
    ],
  },
  electrical: {
    type: 'sequence',
    photos: [
      { src: '/gallery/rangehood-01-rough-opening.jpg', caption: 'Before — Rangehood: the ceiling and opening were prepped for the new hood and lighting.' },
      { src: '/gallery/electrical-romex-wall.jpg', caption: 'During — Rangehood: protected power was run in the wall so the install stays safe and up to code.' },
      { src: '/gallery/rangehood-soffit-wire.jpg', caption: 'During — Rangehood: wiring was routed into the soffit and kept accessible for the hood warranty.' },
      { src: '/gallery/rangehood-02-finished.jpg', caption: 'After — Rangehood: the finished hood and recessed lights clean up the whole cooking wall.' },
      { src: '/gallery/led-under-cabinet-lighting.jpg', caption: 'After — LED lighting: under-cabinet lights add clean task lighting in the same electrical category.' },
    ],
  },
  plumbing: {
    type: 'sequence',
    photos: [
      { src: '/gallery/hosebib-01-before.jpg', caption: 'Before — Hose bib: corrosion had this outdoor connection on borrowed time.' },
      { src: '/gallery/plumbing-access-hole.jpg', caption: 'During — Leak repair: the access opening let the leak get found and fixed instead of guessed at.' },
      { src: '/gallery/plumbing-ceiling-stain.jpg', caption: 'During — Ceiling stain: water marks inside showed why the repair needed to be traced all the way through.' },
      { src: '/gallery/hosebib-02-after.jpg', caption: 'After — Hose bib: a new brass bib closes out the repair with a clean, reliable finish.' },
    ],
  },
};

/** Bathroom order locked to Jason's numbering. Slots 2-5 stay put. Slot 1 is the current start frame until a preconstruction photo is added. */
export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Bathroom Renovation — Pony Wall Vanity',
    tag: 'Drywall + Electrical + Plumbing',
    trades: ['drywall', 'electrical', 'plumbing'],
    bundle: 'triple-play',
    type: 'sequence',
    quoteHint: 'Bathroom remodel / vanity — Triple Play',
    description:
      'Before, during, and after on a bathroom rebuild where drywall, electrical, and plumbing all had to line up cleanly. One licensed tradesperson handled the wet-wall rebuild, outlet work, access patching, and vanity finish in sequence, which is exactly what Triple Play is for.',
    photos: [
      {
        src: 'https://lh3.googleusercontent.com/d/1HxZMIpEU5uW9epRSZk4Fz1NJVKDfK8w1',
        caption: 'Before: preconstruction layout at the vanity wall so the plumbing, electrical, and drywall plan starts from a clean baseline.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1gYfPUl8WzmyvebtzpEnpwOuZ5rQW8kZF',
        caption: 'During: R-TECH foam set in the wall assembly to help the bathroom stay protected before finishes go back on.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1s7HqrapOAOqJ9rYSMz_qoTHRK6k4i8-9',
        caption: 'During: the vanity alcove is taking shape so the new layout lands square without calling back three different trades.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1YhFQUVv9csjTdJkwWLuQWxDUtkKM-c4q',
        caption: 'During: GFCI outlet placement gets handled while the wall is open, which keeps the vanity area safer and cleaner.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/19sl-8DeW3HqVh9xyU8QwTNHxCs6PDH-k',
        caption: 'During: framing and board are brought back to square so the vanity install has solid, straight backing.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1cwj5ptwl17krEnI6_m_70sD_Rh43tGWc',
        caption: 'During: mud work and access patching close up the repair after the plumbing and electrical changes are finished.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1BrECGoz9k6pblvXUktneRYrsv5p61Zrx',
        caption: 'During: texture-ready walls mean the wet-area repair is nearly closed up and ready for the final trim-out.',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1ey_nDScbtzFrE_zOYyWl5cBW7ybxSXPX',
        caption: 'After: finished vanity in place with the drywall, electrical, and plumbing handled in one project. Triple Play is 15% off labor when all three trades are booked together.',
      },
    ],
  },
  {
    title: 'Closet Conversion with Barn Doors',
    tag: 'Drywall',
    trades: ['drywall'],
    bundle: 'single',
    type: 'sequence',
    description:
      'This closet story stays centered on the drywall scope: demolition, framing support, board, finish, and final door-ready opening. It shows how a small layout change gets finished cleanly without turning the gallery into a generic carpentry pitch.',
    photos: [
      { src: '/gallery/closet-01-demolition.jpg', caption: 'Before: original closet opened up — clean slate for a layout that actually holds what you own.' },
      { src: '/gallery/closet-02-framing.jpg', caption: 'During: framing support and wall build-out set the opening before drywall goes back on.' },
      { src: '/gallery/closet-03-progress.jpg', caption: 'During: drywall progress locks in the new opening so the finished lines stay straight.' },
      { src: 'https://lh3.googleusercontent.com/d/1ghRaxirml0DRqZdjsl5MijDlCYOvo9Ze', caption: 'During: build-out at the wall opening shows the mid-stage cleanup before final finish work.' },
      { src: '/gallery/closet-04-near-finished.jpg', caption: 'During: near-finished drywall and trim prep get the closet ready for the last hardware step.' },
      { src: 'https://lh3.googleusercontent.com/d/1M2nFdvqDSvse3lf4b952WMtLjvtiEGzy', caption: 'After: doors are on the track and the new opening is working the way it should.' },
      { src: 'https://lh3.googleusercontent.com/d/10NrJsC_RBY4TFNucrnzhssgWDiJlZq-i', caption: 'After: doors hung open to show the finished access. If you also want closet lighting or an outlet, that can be a Power Pair at 10% off labor.' },
    ],
  },
  {
    title: 'Rangehood Install + Protected Power',
    tag: 'Electrical',
    trades: ['electrical'],
    bundle: 'single',
    type: 'before-after',
    description:
      'Rangehood swap with matching recessed lights. Power came off a GFCI-protected circuit and stayed on a receptacle in the soffit so the manufacturer warranty stays intact — hardwiring would have voided it.',
    photos: [
      { src: '/gallery/rangehood-01-rough-opening.jpg', caption: 'Before: ceiling opened and the rough opening cut for the new hood.' },
      { src: '/gallery/rangehood-02-finished.jpg', caption: 'After: Ancona rangehood and matching recessed lights — clean lines, quiet power.' },
    ],
    supportPhotos: [
      { src: '/gallery/electrical-romex-wall.jpg', caption: 'During: 12-gauge Romex from a 20A GFCI keeps the new hood on protected power, run to code.' },
      { src: '/gallery/rangehood-soffit-wire.jpg', caption: 'During: the receptacle stays accessible through the LED cut-out so the hood remains plugged in and under warranty.' },
    ],
  },
  {
    title: 'Hose Bib Replacement & Leak Repair',
    tag: 'Plumbing',
    trades: ['plumbing'],
    bundle: 'single',
    type: 'before-after',
    description:
      'Corroded outdoor hose bib replaced with new brass. Related indoor staining got an access opening so the leak could be found and stopped. The drywall close-up is a natural add-on — book both and the service call is waived.',
    photos: [
      { src: '/gallery/hosebib-01-before.jpg', caption: 'Before: outdoor hose bib eaten up by corrosion and ready to fail.' },
      { src: '/gallery/hosebib-02-after.jpg', caption: 'After: new brass hose bib, tight and ready for another decade of use.' },
    ],
    supportPhotos: [
      { src: '/gallery/plumbing-ceiling-stain.jpg', caption: 'Before: ceiling stain above the toilet was the indoor clue that the leak story was bigger than the hose bib outside.' },
      { src: '/gallery/plumbing-access-hole.jpg', caption: 'During: access cut to find and stop the leak. While we are there, the drywall patch can close in the same visit.' },
    ],
  },
  {
    title: 'Under-Cabinet LED Lighting',
    tag: 'Electrical',
    trades: ['electrical'],
    bundle: 'single',
    type: 'single',
    description:
      'Low-voltage LED strip under the cabinets for even task light. A small electrical upgrade that changes how the kitchen works at night. Add a missing outlet in the same stop and it becomes a Power Pair.',
    photos: [
      { src: '/gallery/led-under-cabinet-lighting.jpg', caption: 'After: custom low-voltage LED under-cabinet lighting puts even light on the counter without adding extra cans in the ceiling.' },
    ],
  },
  {
    title: 'Water Heater Heating Element Replacement',
    tag: 'Electrical',
    trades: ['electrical'],
    bundle: 'single',
    type: 'sequence',
    quoteHint: 'Water heater repair',
    description:
      'A failed water-heater element can look simple until you open it up. This sequence shows the old element out, the failure confirmed, and the new element installed so hot water is restored without swapping the whole heater.',
    photos: [
      { src: 'https://lh3.googleusercontent.com/d/1WKZrcTa9Nu6loVudX6HBba7beAgLC-OI', caption: 'During: the heating element is removed so the failed part can be checked instead of guessing.' },
      { src: 'https://lh3.googleusercontent.com/d/1kkU3uqYr2XPCBXqtAk1c-l5Qgy-RZfee', caption: 'During: failed element out of the tank, confirming why the heater was not keeping up.' },
      { src: 'https://lh3.googleusercontent.com/d/1UTqmoJHe0LOLs6b-wIJj_oC-O9t0MYqz', caption: 'After: new heating element installed and the repair ready to bring hot water back.' },
    ],
  },
  {
    title: 'Kitchen Lighting Rewire and New Outlet',
    tag: 'Drywall + Electrical',
    trades: ['drywall', 'electrical'],
    bundle: 'power-pair',
    type: 'sequence',
    quoteHint: 'Kitchen lighting + outlet',
    description:
      'This kitchen update needed both electrical work and drywall cleanup: switch-box changes, patching around the bullnose, new recessed and pendant lighting, and a new receptacle. One visit handled the rewire and the wall repair so the finish looked intentional, not patched together.',
    photos: [
      { src: 'https://lh3.googleusercontent.com/d/1ystlTeGwAvyBmNtttuRMU4WX3SfwNjgk', caption: 'During: bullnose drywall patching and a new switch box get the wall ready for the lighting rework.' },
      { src: 'https://lh3.googleusercontent.com/d/1xGsLMqyL0Es7EB53xtxgGGghj5U846zg', caption: 'After: recessed lights and pendants land on separate switches so the kitchen works better day to day.' },
      { src: 'https://lh3.googleusercontent.com/d/1ncSDRQJyoM6ROtbuJOKFrBDHPIylJl9T', caption: 'After: new receptacle cut into the 2x6 wall with a Romex feed. Drywall plus electrical in one stop is a Power Pair at 10% off labor.' },
    ],
  },
  {
    title: 'Drywall Remediation',
    tag: 'Drywall',
    trades: ['drywall'],
    bundle: 'single',
    type: 'sequence',
    quoteHint: 'Drywall remediation',
    description:
      'A remediation job has to look honest in the middle, not just at the end. These frames show the damaged area being worked through and then closed back up cleanly so the repair disappears into the room again.',
    photos: [
      { src: 'https://lh3.googleusercontent.com/d/1-s17Oqnwb5-AVoeMutDDhZUs2nncHzFd', caption: 'During: remediation starts with the damaged drywall opened up so the problem area can be corrected properly.' },
      { src: 'https://lh3.googleusercontent.com/d/1itrQ_ThctFshyAIEcg1UqQTMYg-j2W8D', caption: 'During: the second remediation pass brings the wall back into shape before the final finish.' },
      { src: 'https://lh3.googleusercontent.com/d/1VPfwnAtLVBt-CA5tTHzhRTHaN2GAEkK0', caption: 'After: finished remediation leaves the wall clean again without advertising where the repair was.' },
    ],
  },
];
