import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';


const Nav = ({ setLibraryStatus, libraryStatus }) => {
    return (
        <nav className='nav'>
            <h1>Music App</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                <p>Music</p>
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
}

export default Nav;