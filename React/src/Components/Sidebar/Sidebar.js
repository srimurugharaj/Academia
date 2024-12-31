import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  NavLink,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Nav(props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const navLinkStyle = {
    color: '#0c1e35',
    fontSize: '24px',
    '&:hover': {
      backgroundColor: 'red'
    },
    
  };

  return (
    <div style={{ overflowY: 'auto', maxHeight: 'auto' }}>
      <AppShell
        style={{ width: '100%' }}
        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="sm"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 100, lg: 200 }}
            style={{
              background: 'white',
              color: 'white',
              overflowY:'auto'
            }}
          >
              <NavLink label="Dashboard" onClick={() => navigate('/InstructorDashboard')} style={navLinkStyle} />
              <NavLink label="Course" onClick={() => navigate('/trainer-course')} style={navLinkStyle} />
              <NavLink label="Assessments" style={navLinkStyle}>
              <NavLink label="AddQuestion" onClick={()=>{navigate('/addQuestions')}} style={navLinkStyle}/>
              <NavLink label="ViewQuestion" onClick={()=>{navigate('/viewQuestions')}} style={navLinkStyle}/>
              <NavLink label="Create Quiz" onClick={() => navigate('/CreateQuiz')} style={navLinkStyle} />
              <NavLink label="View Quiz" onClick={() => navigate('/ViewQuiz')} style={navLinkStyle} />
              </NavLink>
              </Navbar>
        }
        header={
          <Header height={60} p="md" style={{ backgroundColor: '#0c1e35' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[0]}
                  mr="xl"
                />
              </MediaQuery>
              <Text
                component="a"
                href="/"
                style={{
                  color: 'whitesmoke',
                  fontFamily: 'inherit',
                  fontWeight: 'bolder',
                  fontSize: '20px',
                  textAlign: 'left',
                  textIndent: '44px',
                  fontStyle: 'italic',
                }}
              >
                Academia
              </Text>
            </div>
          </Header>
        }
      >
        {props.children}
      </AppShell>
    </div>
  );
}
