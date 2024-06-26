import { memo, useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

// Icons
import { DropdownIcon } from '@/components/Icons';

interface DropdownProps {
  defaultValue?: string;
  width?: string;
  bgColor?: string;
  options: { name: string; value: string }[];
  onSelect?: (option: string) => void;
}

const Dropdown = ({
  defaultValue,
  width = '520px',
  bgColor = 'primary',
  options,
  onSelect,
}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || options[0].value,
  );

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect?.(option);
  };

  const optionName = options.find(
    (option) => option.value === selectedOption,
  )?.name;

  return (
    <Menu>
      <MenuButton
        w={width}
        h="42px"
        textAlign="left"
        fontSize="xs"
        border="1px solid"
        borderColor="inherit"
        as={Button}
        color="gray.400"
        rightIcon={<DropdownIcon />}
        bgColor={bgColor}
      >
        {optionName}
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem
            fontSize="xs"
            color="gray.600"
            key={option.value}
            bgColor={
              selectedOption === option.value ? 'gray.50' : 'transparent'
            }
            onClick={() => handleSelect(option.value)}
          >
            {option.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default memo(Dropdown);
