import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const CompassIcon = ({ w = '30', h = '31', color = '#3361FF' }: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 30 31" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 14.4C14.39 14.4 13.9 14.89 13.9 15.5C13.9 16.11 14.39 16.6 15 16.6C15.61 16.6 16.1 16.11 16.1 15.5C16.1 14.89 15.61 14.4 15 14.4ZM15 5.5C9.48 5.5 5 9.98 5 15.5C5 21.02 9.48 25.5 15 25.5C20.52 25.5 25 21.02 25 15.5C25 9.98 20.52 5.5 15 5.5ZM17.19 17.69L9 21.5L12.81 13.31L21 9.5L17.19 17.69Z"
      fill={color}
    />
  </svg>
);

export default memo(CompassIcon);
