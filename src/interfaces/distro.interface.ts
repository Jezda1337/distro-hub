export interface Distro {
  id: string;
  name: string;
  website: string;
  logo: string;
  description: string;
  images: string[];
  createdAt: string;
  basedOn: string;
  desktopEnvironments: string[];
}
