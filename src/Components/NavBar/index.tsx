
import { menu } from './menuitems'
import { useState } from 'react';
import styles from './styles.module.scss'
import Link from 'next/link';
export default function NavBar() {


  const [state, setState] = useState(false)

  const handleClick = () => {
    setState(!state)
  }


  return (

    <nav className={styles.NavbarItems}>
      <Link href={'/'}><h1 className={styles.navbarlogo}>Helpin'Hand</h1></Link>

      <div className={styles.menuicon} onClick={handleClick}>
        <i className={state ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={state ? 'nav-menu active' : "nav-menu"} >
        {menu.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.url} ><a className={item.cName}

              >{item.title}</a></Link>

            </li>
          )
        })}

      </ul>


    </nav>

  )
}