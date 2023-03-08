export interface navLinks {
  text: string;
  routerLink: string;
  icon?: string;
  outletLink?: string | null;
}

export const barLinks: navLinks[] = [
  {
    text: 'Home',
    routerLink: '/',
  },
  {
    text: '🍱 Kanban',
    routerLink: '/kanban',
  },
  {
    text: '⚡ Users',
    routerLink: '/users',
  },
];

export const menuLinks: navLinks[] = [
  {
    icon: '💾',
    text: 'My Github',
    routerLink: 'https://github.com/OleksandrKirovychDev',
  },
];
