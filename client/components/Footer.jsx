import React from 'react'

const Footer = () => {

    const productList = ["Market", "ERC20 Token", "Donation"];
    const contactList = ["helpdesk@founder.com", "info@founder.com", "Contact us"];
    const links = ["Home", "About Us", "Company Bio"];

    return (
        <footer className='text-center text-white lg:text-left'>
            <div className='mx-6 py-10 text-center md:text-left'>
                <hr className="border-2"/>

                <div className='grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-4'>
                    <div className=''>
                        <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>Founder</h6>
                        <p>Description... Footer content. Lorem ipsum to tekst składający się z łacińskich i quasi-łacińskich wyrazów, mający korzenie w klasycznej łacinie, wzorowany na fragmencie traktatu Cycerona „O granicach dobra i zła” napisanego w 45 p.n.e. </p>
                    </div>
                    <div className=''>
                        <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>Products</h6>
                        {productList.map((el, i) => (
                            <p className='mb-4' key={i + 1}>
                                <a href='#!'>{el}</a>
                            </p>
                        ))}
                    </div>
                    <div className=''>
                        <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>Links</h6>
                        {links.map((el, i) => (
                            <p className='mb-4' key={i + 1}>
                                <a href='#!'>{el}</a>
                            </p>
                        ))}
                    </div>
                    <div className=''>
                        <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>Support</h6>
                        {contactList.map((el, i) => (
                            <p className='mb-4' key={i + 1}>
                                <a href='#!'>{el}</a>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className='p-6 text-center'>
                <span>© Copyright: <b>Founder</b></span>
            </div>
        </footer>
    )
}

export default Footer