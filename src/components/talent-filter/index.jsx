import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse } from '@mui/material';
import { Filter } from 'iconsax-react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterSection from 'components/filter-section';

const TalentFilter = () => {
  const [checked, setChecked] = useState([]);
  const [openPosition, setOpenPosition] = useState(true);
  const [openExperince, setOpenExperience] = useState(true);
  const [openLevel, setOpenLevel] = useState(true);
  const [openFramework, setOpenFramework] = useState(true);
  const [openProgammingLanguage, setOpenProgrammingLanguage] = useState(true);
  const [openDevelopmentTools, setOpenDevelopmentTools] = useState(true);
  const [masterPosition, setMasterPosition] = useState([]);
  const [masterLevel, setMasterLevel] = useState([]);
  const [masterFramework, setMasterFramework] = useState([]);
  const [masterProgrammingLanguage, setMasterProgrammingLanguage] = useState([]);
  const [masterDevelopmentTools, setMasterDevelopmentTools] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClickPosition = () => {
    setOpenPosition(!openPosition);
  };

  const handleClickExperience = () => {
    setOpenExperience(!openExperince);
  };

  const handleClickLevel = () => {
    setOpenLevel(!openLevel);
  };

  const handleClickFramework = () => {
    setOpenFramework(!openFramework);
  };

  const handleClickProgrammingLanguage = () => {
    setOpenProgrammingLanguage(!openProgammingLanguage);
  };

  const handleClickDevelopmentTools = () => {
    setOpenDevelopmentTools(!openDevelopmentTools);
  };

  useEffect(() => {
    const fetchMasterPosition = async () => {
      try {
        const response = await axios.get('http://localhost:8081/master-management/talent-position-option-lists');
        console.log(response.data);
        setMasterPosition(response.data);
      } catch (error) {
        console.error('Could not fetch the master position: ', error);
        // handleServerDown();
      }
    };

    fetchMasterPosition();
  }, []);

  const yearsOfExperience = ['5+ Years of Experience', '2 - 4 Years of Experience', '1 Year of Experience'];

  useEffect(() => {
    const fetchMasterLevel = async () => {
      try {
        const response = await axios.get('http://localhost:8081/master-management/talent-level-option-lists');
        console.log(response.data);
        setMasterLevel(response.data);
      } catch (error) {
        console.error('Could not fetch the master level: ', error);
        // handleServerDown();
      }
    };

    fetchMasterLevel();
  }, []);

  useEffect(() => {
    const fetchMasterFramework = async () => {
      try {
        const response = await axios.get('http://localhost:8081/master-management/skill-set-option-lists?type=1');
        console.log(response.data);
        setMasterFramework(response.data);
      } catch (error) {
        console.error('Could not fetch the master framework: ', error);
        // handleServerDown();
      }
    };

    fetchMasterFramework();
  }, []);

  useEffect(() => {
    const fetchMasterProgrammingLanguage = async () => {
      try {
        const response = await axios.get('http://localhost:8081/master-management/skill-set-option-lists?type=2');
        console.log(response.data);
        setMasterProgrammingLanguage(response.data);
      } catch (error) {
        console.error('Could not fetch the master programming language: ', error);
        // handleServerDown();
      }
    };

    fetchMasterProgrammingLanguage();
  }, []);

  useEffect(() => {
    const fetchMasterDevelopmentTools = async () => {
      try {
        const response = await axios.get('http://localhost:8081/master-management/skill-set-option-lists?type=3');
        console.log(response.data);
        setMasterDevelopmentTools(response.data);
      } catch (error) {
        console.error('Could not fetch the master programming language: ', error);
        // handleServerDown();
      }
    };

    fetchMasterDevelopmentTools();
  }, []);

  return (
    <Box sx={{ backgroundColor: 'white', boxShadow: '0px 0px 20px 0px #0000001A', height: '100%', p: 6, mr: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Filter variant="Linear" size={20} />
        <Typography sx={{ ml: 1, fontFamily: 'Poppins', fontWeight: 700, fontSize: 18, color: '#212121' }}>Filter</Typography>
      </Box>
      {/* Filter Position */}
      <FilterSection
        id="position"
        title="Position"
        open={openPosition}
        handleClick={handleClickPosition}
        items={masterPosition.map((p) => ({ id: p.positionId, name: p.positionName }))}
        checked={checked}
        handleToggle={handleToggle}
      />

      {/* Filter Years of Experience */}
      {/* <FilterSection
        id="experience"
        title="Experience"
        open={openExperince}
        handleClick={handleClickExperience}
        items={yearsOfExperience}
        checked={checked}
        handleToggle={handleToggle}
      /> */}
      <Box id="experience-filter" sx={{ borderBottom: openExperince ? '1px solid #DBDBDB' : '0px', pb: openExperince ? 2 : 0 }}>
        <List sx={{ width: '100%' }}>
          <ListItem button onClick={handleClickExperience}>
            <ListItemText
              primary="Experience"
              primaryTypographyProps={{
                fontFamily: 'Poppins',
                fontSize: '14px', // Ensure to include the unit 'px'
                fontWeight: 700,
                color: '#212121',
              }}
            />
            {openExperince ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openExperince} timeout="auto" unmountOnExit>
            {yearsOfExperience.map((experience) => {
              const labelId = `checkbox-list-label-${experience}`;

              return (
                <ListItem key={experience} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(experience) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={handleToggle(experience)}
                      sx={{
                        color: '#C4C4C4',
                        '&.Mui-checked': {
                          color: 'blue',
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={experience} />
                </ListItem>
              );
            })}
          </Collapse>
        </List>
      </Box>

      {/* Filter Level */}
      <FilterSection
        id="level"
        title="Level"
        open={openLevel}
        handleClick={handleClickLevel}
        items={masterLevel.map((l) => ({ id: l.talentLevelId, name: l.talentLevelName }))}
        checked={checked}
        handleToggle={handleToggle}
      />

      {/* Filter Framework */}
      <FilterSection
        id="framework"
        title="Framework"
        open={openFramework}
        handleClick={handleClickFramework}
        items={masterFramework.map((f) => ({ id: f.tagsId, name: f.tagsName }))}
        checked={checked}
        handleToggle={handleToggle}
      />

      {/* Filter Programming Language */}
      <FilterSection
        id="programming"
        title="Programming Language"
        open={openProgammingLanguage}
        handleClick={handleClickProgrammingLanguage}
        items={masterProgrammingLanguage.map((pl) => ({ id: pl.tagsId, name: pl.tagsName }))}
        checked={checked}
        handleToggle={handleToggle}
      />

      {/* Filter Development Tools */}
      <FilterSection
        id="developmentTools"
        title="Development Tools"
        open={openDevelopmentTools}
        handleClick={handleClickDevelopmentTools}
        items={masterDevelopmentTools.map((dt) => ({ id: dt.tagsId, name: dt.tagsName }))}
        checked={checked}
        handleToggle={handleToggle}
      />
    </Box>
  );
};

export default TalentFilter;
