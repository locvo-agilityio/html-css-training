import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const SettingIcon = ({ w = '30', h = '31', color = '#C3CAD9' }: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w}
    height={h}
    viewBox="0 0 30 31"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0888 6.39628C13.0788 4.38628 10.0688 3.97628 7.64878 5.15628L11.2788 8.78628C11.6688 9.17628 11.6688 9.80628 11.2788 10.1963L9.68878 11.7863C9.29878 12.1863 8.66878 12.1863 8.27878 11.7863L4.64878 8.15628C3.47878 10.5863 3.88878 13.5763 5.89878 15.5863C7.75878 17.4463 10.4788 17.9363 12.7888 17.0663L20.7488 25.0263C21.7788 26.0563 23.4388 26.0563 24.4588 25.0263C25.4888 23.9963 25.4888 22.3363 24.4588 21.3163L16.5388 13.3863C17.4588 11.0463 16.9788 8.28628 15.0888 6.39628Z"
      fill={color}
    />
  </svg>
);

export default memo(SettingIcon);
