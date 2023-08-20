import '../styles/globals.css';
import Image from 'next/image';

import Nav from '../components/Nav.jsx';
import Provider from '../components/Provider';

export const metadata = {
    title: "Crowdfunding Platform",
}

const RootLayout = ({ children }) => {
    return (
        <Provider>
            <div className='main'>
                <div className="gradient" />
            </div>
            <main className='app'>
                <Nav />
                {children}
            </main>
        </Provider>
    )
}

export default RootLayout