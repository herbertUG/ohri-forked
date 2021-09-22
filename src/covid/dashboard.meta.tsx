import React, { useEffect, useState } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from './dashboard.scss';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;

const registerSidenavItem = sidenavItem => {
  let buffer;
  const registry = JSON.parse(localStorage.getItem('sidenavItems-Covid'));

  //check if List exists, if not initialize it
  buffer = registry ? registry : [];

  //avoid duplicates by limiting list size to 4 elements
  if (buffer.length <= 4) {
    buffer.push(sidenavItem);
  }

  localStorage.setItem('sidenavItems-Covid', JSON.stringify(buffer));

  return buffer;
};

export const clearCovidSidenavRegistry = () => localStorage.removeItem('sidenavItems-Covid');

export const createCovidDashboardLink = db => {
  const navItems = registerSidenavItem(db);
  const styling = navItems.length !== 4 ? styles.hide : styles.noMarker;

  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }, props) => {
    const [rerender, setRerender] = useState(true);
    const forceRerender = () => setRerender(!rerender);

    document.addEventListener('navigation-from-hiv', e => {
      e.preventDefault();
      forceRerender();
    });

    return (
      <div id="sidenav-menu-covid">
        <SideNavMenu title="Covid" className={styling} defaultExpanded={isActiveLink(caseReport_dashboardMeta)}>
          {navItems.map(navItem => (
            <SideNavMenuItem
              key={navItem.title}
              className={isActiveLink(navItem.name) ? styles.currentNavItem : ''}
              href={`${basePath}/${navItem.name}`}
              onClick={e => {
                handleLinkClick(e, `${basePath}/${navItem.name} `);
                forceRerender();
                document.dispatchEvent(new CustomEvent('navigation-from-hiv'));
              }}>
              {navItem.title}
            </SideNavMenuItem>
          ))}
        </SideNavMenu>
      </div>
    );
  };
  return DashboardLink;
};

export function handleLinkClick(event: any, to: string) {
  event.preventDefault();
  navigate({ to });
}

export const covid_Lab_Results_dashboardMeta = {
  name: 'covid-lab-results',
  slot: 'covid-lab-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Covid Lab Results',
};

export const covid_Assessments_dashboardMeta = {
  name: 'covid-assessment',
  slot: 'covid-assessment-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Covid Assessment',
};

export const caseReport_dashboardMeta = {
  name: 'covid-case-report',
  slot: 'covid-case-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Outcomes',
};

export const covid_Outcomes_dashboardMeta = {
  name: 'covid-outcomes',
  slot: 'covid-outcomes-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Case Outcomes',
};
export const covid_Vaccinations_dashboardMeta = {
  name: 'covid-case-report',
  slot: 'covid-vacinations-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Vacinnations',
};
