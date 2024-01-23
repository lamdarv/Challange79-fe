import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Checkbox, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const FilterSection = ({ id, title, open, handleClick, items, checked, handleToggle }) => {

    return (
    <Box id={`${id}-filter`} sx={{ borderBottom: open ? '1px solid #DBDBDB' : '0px', pb: open ? 2 : 0 }}>
      <List sx={{ width: '100%' }}>
        <ListItem button onClick={handleClick}>
          <ListItemText primary={title} primaryTypographyProps={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 700,
            color: '#212121',
          }} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {items.map((item) => {
            const labelId = `checkbox-list-label-${item.id}`;
            return (
              <ListItem key={item.id} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item.id) !== -1}
                    tabIndex={-1}
                    onChange={handleToggle(item.id)}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    sx={{
                      color: '#C4C4C4',
                      '&.Mui-checked': {
                        color: 'blue',
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.name} />
              </ListItem>
            );
          })}
        </Collapse>
      </List>
    </Box>
  );
};

export default FilterSection;
