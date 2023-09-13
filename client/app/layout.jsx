import '../styles/globals.css';

import Nav from '../components/Nav.jsx';
import Provider from '../components/Provider';

export const metadata = {
    title: "Founder",
}

const RootLayout = ({ children }) => {
    return (
        <html>
            <body>
                <Provider>
                    <div className='main'>
                        <div className="gradient" />
                    </div>
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout