interface Section {
  id: string;
  title: string;
  navigationLabel: string;
  placeholder: string;
}

// Structural copy only. Professional content is introduced in M3.
export const sections: readonly Section[] = [
  {
    id: 'about',
    title: 'About',
    navigationLabel: 'About',
    placeholder: 'A short introduction will appear here.',
  },
  {
    id: 'work',
    title: 'Selected work',
    navigationLabel: 'Work',
    placeholder: 'Selected projects will appear here.',
  },
  {
    id: 'experience',
    title: 'Experience',
    navigationLabel: 'Experience',
    placeholder: 'Professional experience will appear here.',
  },
  {
    id: 'skills',
    title: 'Skills',
    navigationLabel: 'Skills',
    placeholder: 'Areas of expertise will appear here.',
  },
  {
    id: 'education',
    title: 'Education',
    navigationLabel: 'Education',
    placeholder: 'Education and certifications will appear here.',
  },
  {
    id: 'contact',
    title: 'Contact / links',
    navigationLabel: 'Contact',
    placeholder: 'Public profile links will appear here.',
  },
];
