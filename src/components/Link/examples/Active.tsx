import React from 'react';
import { Horizontal } from 'app-studio';

import { Link } from '../Link';

// The link to the page being shown carries `isActive`: aria-current="page"
// on web, accessibilityState.selected on native, plus the active style.
export const ActiveLink = () => (
  <Horizontal gap={16}>
    <Link to="/notes" isActive>
      Notes
    </Link>
    <Link to="/settings">Settings</Link>
  </Horizontal>
);
