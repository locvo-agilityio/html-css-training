import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const PlusIcon = ({ w = '30', h = '31', color = '#C3CAD9' }: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 30 31" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 16.5H16V21.5C16 22.05 15.55 22.5 15 22.5C14.45 22.5 14 22.05 14 21.5V16.5H9C8.45 16.5 8 16.05 8 15.5C8 14.95 8.45 14.5 9 14.5H14V9.5C14 8.95 14.45 8.5 15 8.5C15.55 8.5 16 8.95 16 9.5V14.5H21C21.55 14.5 22 14.95 22 15.5C22 16.05 21.55 16.5 21 16.5Z"
      fill={color}
    />
  </svg>
);

export default memo(PlusIcon);
