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

export interface WaitingDistro {
  id: string;
  email: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  createdAt: Date;
}
