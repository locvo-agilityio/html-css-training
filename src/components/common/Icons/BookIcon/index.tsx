import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const BookIcon = ({ w = '30', h = '31', color = '#8833FF' }: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 30 31" fill="none" cursor="pointer">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 7.5H6C4.9 7.5 4 8.4 4 9.5V22.5C4 23.6 4.9 24.5 6 24.5H24C25.1 24.5 26 23.6 26 22.5V9.5C26 8.4 25.1 7.5 24 7.5ZM24 21.5C24 22.05 23.55 22.5 23 22.5H15V9.5H23C23.55 9.5 24 9.95 24 10.5V21.5ZM22.25 13H16.75C16.34 13 16 13.34 16 13.75C16 14.16 16.34 14.5 16.75 14.5H22.25C22.66 14.5 23 14.16 23 13.75C23 13.34 22.66 13 22.25 13ZM22.25 15.5H16.75C16.34 15.5 16 15.84 16 16.25C16 16.66 16.34 17 16.75 17H22.25C22.66 17 23 16.66 23 16.25C23 15.84 22.66 15.5 22.25 15.5ZM22.25 18H16.75C16.34 18 16 18.34 16 18.75C16 19.16 16.34 19.5 16.75 19.5H22.25C22.66 19.5 23 19.16 23 18.75C23 18.34 22.66 18 22.25 18Z"
      fill={color}
    />
  </svg>
);

export default memo(BookIcon);
