import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const NavBar = () => (
  <div className={styles.navbar}>
    <Link className={styles.link} to="/">Home</Link>
    <Link className={styles.link} to="/posts">Post list</Link>
  </div>
)

export default NavBar;