import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const PhoneIcon = ({ w = '30', h = '31', color = '#FF6633' }: IIconProps) => (
  <svg cursor="pointer" width={w} height={h} viewBox="0 0 30 31" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.2037 18.75L19.6637 18.46C19.0537 18.39 18.4537 18.6 18.0237 19.03L16.1837 20.87C13.3537 19.43 11.0337 17.12 9.59367 14.28L11.4437 12.43C11.8737 12 12.0837 11.4 12.0137 10.79L11.7237 8.27C11.6037 7.26 10.7537 6.5 9.73367 6.5H8.00367C6.87367 6.5 5.93367 7.44 6.00367 8.57C6.53367 17.11 13.3637 23.93 21.8937 24.46C23.0237 24.53 23.9637 23.59 23.9637 22.46V20.73C23.9737 19.72 23.2137 18.87 22.2037 18.75Z"
      fill={color}
    />
  </svg>
);

export default memo(PhoneIcon);
