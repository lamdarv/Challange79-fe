import { Box, List, ListItem, ListItemText, Collapse, Checkbox, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const FilterSectionStatic = ({ open, handleClick, checked, handleToggle, filterItems, filterTitle }) => {
  return (
    <Box id={`${filterTitle.toLowerCase()}-filter`} sx={{ borderBottom: open ? '1px solid #DBDBDB' : '0px', pb: open ? 2 : 0 }}>
      <List sx={{ width: '100%' }}>
        <ListItem button onClick={handleClick}>
          <ListItemText
            primary={filterTitle}
            primaryTypographyProps={{
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: 700,
              color: '#212121',
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {filterItems.map((item) => {
            const labelId = `checkbox-list-label-${item}`;

            return (
              <ListItem key={item} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onClick={handleToggle(item)}
                    sx={{
                      color: '#C4C4C4',
                      '&.Mui-checked': {
                        color: 'blue',
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item} />
              </ListItem>
            );
          })}
        </Collapse>
      </List>
    </Box>
  );
};

export default FilterSectionStatic;
