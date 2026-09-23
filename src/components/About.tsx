import { Skill } from '../types';
import { motion } from 'motion/react';
import { usePortfolio, defaultSkills } from '@/context/PortfolioContext';
import {
  Code2,
  Server,
  Database,
  Sparkles,
  FileCode,
  Wind,
  Atom,
  ShieldCheck,
  Zap,
  Waypoints,
  Leaf,
  GitBranch,
  FlaskConical,
} from 'lucide-react';

interface AboutProps {
  skills?: Skill[];
}

export const PythonIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} role="img" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.914 2C6.738 2 7.06 4.254 7.06 4.254l.006 2.338h4.94v.702H5.16S2 6.94 2 12.146c0 5.205 2.76 5.048 2.76 5.048h1.648v-2.315s-.09-2.76 2.705-2.76h4.646v-.72H9.117s-2.584.055-2.584-2.528c0-2.584 2.254-2.474 2.254-2.474h7.027s2.556-.056 2.556-2.529C18.37 1.396 15.343 2 11.914 2zm-1.83 1.41a.91.91 0 110 1.82.91.91 0 010-1.82z"
      fill="#387EB8"
    />
    <path
      d="M12.086 22c5.176 0 4.854-2.254 4.854-2.254l-.006-2.338h-4.94v-.702h6.846s3.16.354 3.16-4.852c0-5.206-2.76-5.048-2.76-5.048h-1.648v2.315s.09 2.76-2.705 2.76H9.999v.72h4.646s2.584-.055 2.584 2.528c0 2.584-2.254 2.474-2.254 2.474H7.948s-2.556.056-2.556 2.529C5.392 22.604 8.419 22 12.086 22zm1.83-1.41a.91.91 0 110-1.82.91.91 0 010 1.82z"
      fill="#FFE052"
    />
  </svg>
);

export const PlaywrightIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M136.444 221.556C123.558 225.213 115.104 231.625 109.535 238.032C114.869 233.364 122.014 229.08 131.652 226.348C141.51 223.554 149.92 223.574 156.869 224.915V219.481C150.941 218.939 144.145 219.371 136.444 221.556ZM108.946 175.876L61.0895 188.484C61.0895 188.484 61.9617 189.716 63.5767 191.36L104.153 180.668C104.153 180.668 103.578 188.077 98.5847 194.705C108.03 187.559 108.946 175.876 108.946 175.876ZM149.005 288.347C81.6582 306.486 46.0272 228.438 35.2396 187.928C30.2556 169.229 28.0799 155.067 27.5 145.928C27.4377 144.979 27.4665 144.179 27.5336 143.446C24.04 143.657 22.3674 145.473 22.7077 150.721C23.2876 159.855 25.4633 174.016 30.4473 192.721C41.2301 233.225 76.8659 311.273 144.213 293.134C158.872 289.185 169.885 281.992 178.152 272.81C170.532 279.692 160.995 285.112 149.005 288.347ZM161.661 128.11V132.903H188.077C187.535 131.206 186.989 129.677 186.447 128.11H161.661Z"
      fill="#2D4552"
    />
    <path
      d="M193.981 167.584C205.861 170.958 212.144 179.287 215.465 186.658L228.711 190.42C228.711 190.42 226.904 164.623 203.57 157.995C181.741 151.793 168.308 170.124 166.674 172.496C173.024 167.972 182.297 164.268 193.981 167.584ZM299.422 186.777C277.573 180.547 264.145 198.916 262.535 201.255C268.89 196.736 278.158 193.031 289.837 196.362C301.698 199.741 307.976 208.06 311.307 215.436L324.572 219.212C324.572 219.212 322.736 193.41 299.422 186.777ZM286.262 254.795L176.072 223.99C176.072 223.99 177.265 230.038 181.842 237.869L274.617 263.805C282.255 259.386 286.262 254.795 286.262 254.795ZM209.867 321.102C122.618 297.71 133.166 186.543 147.284 133.865C153.097 112.156 159.073 96.0203 164.029 85.204C161.072 84.5953 158.623 86.1529 156.203 91.0746C150.941 101.747 144.212 119.124 137.7 143.45C123.586 196.127 113.038 307.29 200.283 330.682C241.406 341.699 273.442 324.955 297.323 298.659C274.655 319.19 245.714 330.701 209.867 321.102Z"
      fill="#2D4552"
    />
    <path
      d="M161.661 262.296V239.863L99.3324 257.537C99.3324 257.537 103.938 230.777 136.444 221.556C146.302 218.762 154.713 218.781 161.661 220.123V128.11H192.869C189.471 117.61 186.184 109.526 183.423 103.909C178.856 94.612 174.174 100.775 163.545 109.665C156.059 115.919 137.139 129.261 108.668 136.933C80.1966 144.61 57.179 142.574 47.5752 140.911C33.9601 138.562 26.8387 135.572 27.5049 145.928C28.0847 155.062 30.2605 169.224 35.2445 187.928C46.0272 228.433 81.663 306.481 149.01 288.342C166.602 283.602 179.019 274.233 187.626 262.291H161.661V262.296ZM61.0848 188.484L108.946 175.876C108.946 175.876 107.551 194.288 89.6087 199.018C71.6614 203.743 61.0848 188.484 61.0848 188.484Z"
      fill="#E2574C"
    />
    <path
      d="M341.786 129.174C329.345 131.355 299.498 134.072 262.612 124.185C225.716 114.304 201.236 97.0224 191.537 88.8994C177.788 77.3834 171.74 69.3802 165.788 81.4857C160.526 92.163 153.797 109.54 147.284 133.866C133.171 186.543 122.623 297.706 209.867 321.098C297.093 344.47 343.53 242.92 357.644 190.238C364.157 165.917 367.013 147.5 367.799 135.625C368.695 122.173 359.455 126.078 341.786 129.174ZM166.497 172.756C166.497 172.756 180.246 151.372 203.565 158C226.899 164.628 228.706 190.425 228.706 190.425L166.497 172.756ZM223.42 268.713C182.403 256.698 176.077 223.99 176.077 223.99L286.262 254.796C286.262 254.791 264.021 280.578 223.42 268.713ZM262.377 201.495C262.377 201.495 276.107 180.126 299.422 186.773C322.736 193.411 324.572 219.208 324.572 219.208L262.377 201.495Z"
      fill="#2EAD33"
    />
    <path
      d="M139.88 246.04L99.3324 257.532C99.3324 257.532 103.737 232.44 133.607 222.496L110.647 136.33L108.663 136.933C80.1918 144.611 57.1742 142.574 47.5704 140.911C33.9554 138.563 26.834 135.572 27.5001 145.929C28.08 155.063 30.2557 169.224 35.2397 187.929C46.0225 228.433 81.6583 306.481 149.005 288.342L150.989 287.719L139.88 246.04ZM61.0848 188.485L108.946 175.876C108.946 175.876 107.551 194.288 89.6087 199.018C71.6615 203.743 61.0848 188.485 61.0848 188.485Z"
      fill="#D65348"
    />
    <path
      d="M225.27 269.163L223.415 268.712C182.398 256.698 176.072 223.99 176.072 223.99L232.89 239.872L262.971 124.281L262.607 124.185C225.711 114.304 201.232 97.0224 191.532 88.8994C177.783 77.3834 171.735 69.3802 165.783 81.4857C160.526 92.163 153.797 109.54 147.284 133.866C133.171 186.543 122.623 297.706 209.867 321.097L211.655 321.5L225.27 269.163ZM166.497 172.756C166.497 172.756 180.246 151.372 203.565 158C226.899 164.628 228.706 190.425 228.706 190.425L166.497 172.756Z"
      fill="#1D8D22"
    />
    <path
      d="M141.946 245.451L131.072 248.537C133.641 263.019 138.169 276.917 145.276 289.195C146.513 288.922 147.74 288.687 149 288.342C152.302 287.451 155.364 286.348 158.312 285.145C150.371 273.361 145.118 259.789 141.946 245.451ZM137.7 143.451C132.112 164.307 127.113 194.326 128.489 224.436C130.952 223.367 133.554 222.371 136.444 221.551L138.457 221.101C136.003 188.939 141.308 156.165 147.284 133.866C148.799 128.225 150.318 122.978 151.832 118.085C149.393 119.637 146.767 121.228 143.776 122.867C141.759 129.093 139.722 135.898 137.7 143.451Z"
      fill="#C04B41"
    />
  </svg>
);

export const SeleniumIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} role="img" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.174 3.468l-7.416 8.322a.228.228 0 0 1-.33 0l-3.786-3.9a.228.228 0 0 1 0-.282L12.872 6a.228.228 0 0 1 .366 0l2.106 2.346a.228.228 0 0 0 .342 0l5.94-8.094A.162.162 0 0 0 21.5 0H.716a.174.174 0 0 0-.174.174v23.652A.174.174 0 0 0 .716 24h22.566a.174.174 0 0 0 .174-.174V3.6a.162.162 0 0 0-.282-.132zM6.932 21.366a5.706 5.706 0 0 1-4.05-1.44.222.222 0 0 1 0-.288l.882-1.236a.222.222 0 0 1 .33-.036 4.338 4.338 0 0 0 2.964 1.158c1.158 0 1.722-.534 1.722-1.098 0-1.752-5.7-.552-5.7-4.278 0-1.65 1.428-3 3.756-3a5.568 5.568 0 0 1 3.708 1.242.222.222 0 0 1 0 .3l-.906 1.2a.222.222 0 0 1-.318.036 4.29 4.29 0 0 0-2.706-.936c-.906 0-1.41.402-1.41.996 0 1.572 5.688.522 5.688 4.2.006 1.812-1.284 3.18-3.96 3.18zm12.438-3.432a.192.192 0 0 1-.192.192h-5.202a.06.06 0 0 0-.06.066 1.986 1.986 0 0 0 2.106 1.638 3.264 3.264 0 0 0 1.8-.6.192.192 0 0 1 .276.042l.636.93a.198.198 0 0 1-.042.264 4.71 4.71 0 0 1-2.892.9 3.726 3.726 0 0 1-3.93-3.87 3.744 3.744 0 0 1 3.81-3.852c2.196 0 3.684 1.644 3.684 4.05zm-3.684-2.748a1.758 1.758 0 0 0-1.8 1.56.06.06 0 0 0 .06.066h3.492a.06.06 0 0 0 .06-.066 1.698 1.698 0 0 0-1.812-1.56Z"
      fill="#43B02A"
    />
  </svg>
);

export const JavaScriptIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} role="img" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    <path
      d="M6.86 18.24c.36.59.87 1.05 1.56 1.35.69.3 1.49.36 2.22.17.66-.17 1.25-.57 1.57-1.16.33-.62.34-1.37.13-2.02-.28-.83-1.03-1.4-1.78-1.8-.86-.47-1.74-.89-2.55-1.43-.85-.55-1.55-1.36-1.84-2.33-.31-1.07-.14-2.27.46-3.21.61-.94 1.6-1.56 2.69-1.75 1.26-.22 2.58.03 3.63.72.96.62 1.62 1.58 1.87 2.69l-2.61.64c-.17-.7-.61-1.32-1.25-1.64-.61-.3-1.36-.33-2.01-.12-.59.18-1.08.67-1.23 1.28-.17.64-.02 1.33.38 1.84.44.57 1.13.93 1.77 1.28.92.5 1.87.96 2.75 1.53.93.62 1.66 1.53 1.93 2.63.28 1.16.07 2.43-.58 3.43-.66 1.02-1.76 1.69-2.97 1.85-1.46.2-2.99-.13-4.14-1-.13-.98-.83-2.15-.92-3.55l2.77-.56zm9.35 4.67c.73-.13 1.37-.53 1.73-1.14.37-.62.42-1.39.42-2.11V8.16h2.72v11.53c0 1.35-.35 2.71-1.26 3.73-1.04 1.16-2.65 1.57-4.13 1.37-1.36-.18-2.58-.98-3.24-2.19l2.37-1.41c.36.65.84 1.16 1.39 1.45z"
      fill="#000000"
    />
  </svg>
);

export const NextJSIcon = ({ className = 'h-6 w-6' }: { className?: string }) => (
  <svg viewBox="0 0 180 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_next" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#mask0_next)">
      <circle cx="90" cy="90" r="90" fill="currentColor" className="text-zinc-900 dark:text-zinc-100" />
      <path
        d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
        fill="white"
        className="dark:fill-zinc-950"
      />
      <rect x="115" y="54" width="12" height="72" fill="white" className="dark:fill-zinc-950" />
    </g>
  </svg>
);

export const getSkillMeta = (skillName: string) => {
  const normalized = skillName.toLowerCase();

  if (normalized.includes('html')) {
    return {
      icon: <FileCode className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
      colorClass: 'bg-orange-50 border-orange-100 dark:bg-orange-950/25 dark:border-orange-900/40 shadow-orange-100/50 dark:shadow-none hover:border-orange-300 dark:hover:border-orange-700',
      textColor: 'text-orange-900 dark:text-orange-200',
    };
  }
  if (normalized.includes('css') || normalized.includes('tailwind')) {
    return {
      icon: <Wind className="h-6 w-6 text-sky-600 dark:text-sky-400" />,
      colorClass: 'bg-sky-50 border-sky-100 dark:bg-sky-950/25 dark:border-sky-900/40 shadow-sky-100/50 dark:shadow-none hover:border-sky-300 dark:hover:border-sky-700',
      textColor: 'text-sky-900 dark:text-sky-200',
    };
  }
  if (normalized.includes('next.js') || normalized.includes('nextjs')) {
    return {
      icon: <NextJSIcon className="h-6 w-6" />,
      colorClass: 'bg-zinc-100 border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800 shadow-zinc-200/50 dark:shadow-none hover:border-zinc-400 dark:hover:border-zinc-600',
      textColor: 'text-zinc-900 dark:text-zinc-100',
    };
  }
  if (normalized.includes('react')) {
    return {
      icon: <Atom className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
      colorClass: 'bg-cyan-50 border-cyan-100 dark:bg-cyan-950/25 dark:border-cyan-900/40 shadow-cyan-100/50 dark:shadow-none hover:border-cyan-300 dark:hover:border-cyan-700',
      textColor: 'text-cyan-900 dark:text-cyan-200',
    };
  }
  if (normalized.includes('typescript') || (normalized.includes('type') && normalized.includes('script'))) {
    return {
      icon: <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      colorClass: 'bg-blue-50 border-blue-100 dark:bg-blue-950/25 dark:border-blue-900/40 shadow-blue-100/50 dark:shadow-none hover:border-blue-300 dark:hover:border-blue-700',
      textColor: 'text-blue-900 dark:text-blue-200',
    };
  }
  if (normalized.includes('javascript') || normalized.includes('js') || normalized.includes('es6')) {
    return {
      icon: <JavaScriptIcon className="h-6 w-6" />,
      colorClass: 'bg-amber-50/80 border-amber-200/80 dark:bg-amber-950/25 dark:border-amber-900/40 shadow-amber-100/50 dark:shadow-none hover:border-amber-300 dark:hover:border-amber-700',
      textColor: 'text-amber-950 dark:text-amber-200',
    };
  }
  if (normalized.includes('python')) {
    return {
      icon: <PythonIcon className="h-6 w-6" />,
      colorClass: 'bg-blue-50/80 border-blue-200/80 dark:bg-blue-950/25 dark:border-blue-900/40 shadow-blue-100/50 dark:shadow-none hover:border-blue-300 dark:hover:border-blue-700',
      textColor: 'text-blue-950 dark:text-blue-200',
    };
  }
  if (normalized.includes('playwright')) {
    return {
      icon: <PlaywrightIcon className="h-6 w-6" />,
      colorClass: 'bg-emerald-50/80 border-emerald-200/80 dark:bg-emerald-950/25 dark:border-emerald-900/40 shadow-emerald-100/50 dark:shadow-none hover:border-emerald-300 dark:hover:border-emerald-700',
      textColor: 'text-emerald-950 dark:text-emerald-200',
    };
  }
  if (normalized.includes('selenium') || normalized.includes('selinium')) {
    return {
      icon: <SeleniumIcon className="h-6 w-6" />,
      colorClass: 'bg-teal-50/80 border-teal-200/80 dark:bg-teal-950/25 dark:border-teal-900/40 shadow-teal-100/50 dark:shadow-none hover:border-teal-300 dark:hover:border-teal-700',
      textColor: 'text-teal-950 dark:text-teal-200',
    };
  }
  if (normalized.includes('node') || normalized.includes('express')) {
    return {
      icon: <Server className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      colorClass: 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/25 dark:border-emerald-900/40 shadow-emerald-100/50 dark:shadow-none hover:border-emerald-300 dark:hover:border-emerald-700',
      textColor: 'text-emerald-900 dark:text-emerald-200',
    };
  }
  if (normalized.includes('fastapi')) {
    return {
      icon: <Zap className="h-6 w-6 text-teal-600 dark:text-teal-400" />,
      colorClass: 'bg-teal-50 border-teal-100 dark:bg-teal-950/25 dark:border-teal-900/40 shadow-teal-100/50 dark:shadow-none hover:border-teal-300 dark:hover:border-teal-700',
      textColor: 'text-teal-900 dark:text-teal-200',
    };
  }
  if (normalized.includes('rest api') || normalized.includes('graphql') || normalized.includes('apis')) {
    return {
      icon: <Waypoints className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />,
      colorClass: 'bg-fuchsia-50 border-fuchsia-100 dark:bg-fuchsia-950/25 dark:border-fuchsia-900/40 shadow-fuchsia-100/50 dark:shadow-none hover:border-fuchsia-300 dark:hover:border-fuchsia-700',
      textColor: 'text-fuchsia-900 dark:text-fuchsia-200',
    };
  }
  if (normalized.includes('mongo') || normalized.includes('mongoose')) {
    return {
      icon: <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />,
      colorClass: 'bg-green-50 border-green-100 dark:bg-green-950/25 dark:border-green-900/40 shadow-green-100/50 dark:shadow-none hover:border-green-300 dark:hover:border-green-700',
      textColor: 'text-green-900 dark:text-green-200',
    };
  }
  if (normalized.includes('sql') || normalized.includes('postgres')) {
    return {
      icon: <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      colorClass: 'bg-indigo-50 border-indigo-100 dark:bg-indigo-950/25 dark:border-indigo-900/40 shadow-indigo-100/50 dark:shadow-none hover:border-indigo-300 dark:hover:border-indigo-700',
      textColor: 'text-indigo-900 dark:text-indigo-200',
    };
  }
  if (normalized.includes('git')) {
    return {
      icon: <GitBranch className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
      colorClass: 'bg-orange-50 border-orange-100 dark:bg-orange-950/25 dark:border-orange-900/40 shadow-orange-100/50 dark:shadow-none hover:border-orange-300 dark:hover:border-orange-700',
      textColor: 'text-orange-900 dark:text-orange-200',
    };
  }

  return {
    icon: <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    colorClass: 'bg-purple-50 border-purple-100 dark:bg-purple-950/25 dark:border-purple-900/40 shadow-purple-100/50 dark:shadow-none hover:border-purple-300 dark:hover:border-purple-700',
    textColor: 'text-purple-900 dark:text-purple-200',
  };
};

const About = ({ skills: propSkills }: AboutProps) => {
  const { skills: contextSkills } = usePortfolio();
  const rawSkills =
    propSkills && propSkills.length > 0
      ? propSkills
      : contextSkills && contextSkills.length > 0
        ? contextSkills
        : defaultSkills
  const skillsList: Skill[] = [];
  let hasNodeExpress = false;
  let hasMongoMongoose = false;

  rawSkills.forEach((sk) => {
    const nameLower = sk.name.toLowerCase();
    if (nameLower.includes('node') || nameLower.includes('express')) {
      if (!hasNodeExpress) {
        skillsList.push({
          ...sk,
          name: 'Node.js / Express.js',
          category: 'backend',
        });
        hasNodeExpress = true;
      }
    } else if (nameLower.includes('mongo') || nameLower.includes('mongoose')) {
      if (!hasMongoMongoose) {
        skillsList.push({
          ...sk,
          name: 'MongoDB / Mongoose',
          category: 'database',
        });
        hasMongoMongoose = true;
      }
    } else {
      skillsList.push(sk);
    }
  });

  const normalizeCategory = (cat?: string) => {
    const c = (cat || '').toLowerCase().trim();
    if (c === 'frontend' || c.includes('front') || c.includes('ui')) return 'frontend';
    if (c === 'backend' || c.includes('back') || c.includes('server') || c.includes('api')) return 'backend';
    if (c === 'database' || c.includes('data') || c.includes('db') || c.includes('sql')) return 'database';
    if (c === 'testing' || c.includes('test') || c.includes('qa') || c.includes('automation')) return 'testing';
    return 'other';
  };

  const categoryList = [
    {
      key: 'frontend',
      label: 'Frontend Development',
      icon: <Code2 className="h-5 w-5 text-indigo-500" />,
      items: skillsList.filter((s) => normalizeCategory(s.category) === 'frontend'),
    },
    {
      key: 'backend',
      label: 'Backend Development',
      icon: <Server className="h-5 w-5 text-emerald-500" />,
      items: skillsList.filter((s) => normalizeCategory(s.category) === 'backend'),
    },
    {
      key: 'database',
      label: 'Database Systems',
      icon: <Database className="h-5 w-5 text-amber-500" />,
      items: skillsList.filter((s) => normalizeCategory(s.category) === 'database'),
    },
    {
      key: 'testing',
      label: 'Testing & Automation',
      icon: <FlaskConical className="h-5 w-5 text-green-500" />,
      items: skillsList.filter((s) => normalizeCategory(s.category) === 'testing'),
    },
    {
      key: 'other',
      label: 'Other Tools & DevOps',
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      items: skillsList.filter((s) => normalizeCategory(s.category) === 'other'),
    },
  ];

  return (
    <section
      id="about"
      className="bg-white px-4 sm:px-6 py-14 sm:py-20 lg:py-24 transition-colors duration-300 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-12">
          <div className="hidden lg:block lg:col-span-5">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Expertise & Skillset
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              As a Full Stack MERN Developer, I build client-focused web platforms. I engineer reliable
              backends from scratch and combine them with dynamic, beautifully tailored frontend interfaces.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              I place major focus on high speed optimization, clean security protocols, state synchronization,
              and responsive layouts that adapt cleanly from small touch screens to large desktop monitors.
            </p>

            <div className="mt-8 rounded-xl border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-900 dark:bg-zinc-900/40">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Quick Philosophy</h4>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                "Writing clean, modular, and maintainable code isn't just a requirement—it's a form of visual and functional craftsmanship."
              </p>
            </div>
          </div>
          <div className="space-y-10 lg:col-span-7 w-full">
            {categoryList.map((cat) => {
              if (cat.items.length === 0) return null;

              return (
                <div key={cat.key} className="space-y-5">
                  <div className="flex items-center gap-2 border-b border-zinc-100 pb-2 dark:border-zinc-900">
                    {cat.icon}
                    <h3 className="text-md font-bold text-zinc-800 dark:text-zinc-200">
                      {cat.label}
                    </h3>
                  </div>

                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    {cat.items.map((skill) => {
                      const meta = getSkillMeta(skill.name);
                      const skillId = skill.id || skill._id || skill.name;
                      return (
                        <motion.div
                          whileHover={{ y: -4, scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          key={skillId}
                          className={`flex flex-col items-center text-center p-4 rounded-xl border shadow-xs transition-all duration-300 ${meta.colorClass}`}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 dark:bg-zinc-900/85 shadow-xs mb-3">
                            {meta.icon}
                          </div>

                          <span className={`text-xs sm:text-sm font-semibold tracking-wide ${meta.textColor}`}>
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;