import React, { useState, Fragment, ReactElement, cloneElement, MouseEvent, ReactNode } from 'react';
import { Menu, MenuItem, ListItemIcon, IconButtonProps, ButtonProps, MenuItemProps } from '@mui/material';

export interface MenuOption {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  props?: MenuItemProps
}

export interface CustomMenuProps {
  trigger: ReactElement<ButtonProps | IconButtonProps>;
  options: MenuOption[];
  menuId?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export function AppMenu({
  trigger,
  options,
  menuId = 'custom-menu',
  onOpen,
  onClose,
}: CustomMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onOpen?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
  };

  return (
    <Fragment>
      {cloneElement(trigger, {
        onClick: handleClick,
        'aria-controls': open ? menuId : undefined,
        'aria-haspopup': true,
        'aria-expanded': open ? true : undefined,
      })}

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disablePortal={false}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              minWidth: 120,
              bgcolor: 'white'
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index} {...option.props}
            onClick={() => {
              if(option?.onClick) option.onClick();
              handleClose();
            }}
          >
            {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}
