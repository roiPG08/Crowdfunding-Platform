'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
//import { MetaMaskSDK } from '@metamask/sdk';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useMetamask } from '@thirdweb-dev/react';



const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const connect = useMetamask();
    const address = useAddress();

    // const MMSDK = new MetaMaskSDK({
    //     dappMetadata: {
    //         name: "Founder",
    //         url: "http://localhost:3000",
    //     },
    //     infuraAPIKey: process.env.INFURA_API_KEY,
    // });

    useEffect(() => {
        const setUpProvider = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProvider();
    }, []);
    
    const fundProject = async () => {
        
    
        //const ethereum = MMSDK.getProvider();

        if (typeof window !== 'undefined' && !window.ethereum) {
            throw new Error("MetaMask not found. Please install it to proceed.");   
        }
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts", "params": [] });
        console.log(accounts);
    };

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src='/assets/images/founderlogo_whitegreen.svg'
                    alt="Logo"
                    width={200}
                    height={200}
                    className='object-contain'
                />
            </Link>

            <Link href="/" className='flex gap-2 flex-center'>
                Explore
            </Link>

            <Link href="/get-started" className='flex gap-2 flex-center'>
                How to start
            </Link>

            {/* 1st Option */}
            <button onClick={() => fundProject()}>
                Fund Test
            </button>

            {/* 2nd Option */}
            <ConnectWallet></ConnectWallet>

            {/* 3rd Option */}
            <button onClick={() => connect()}>
                Fund 3
            </button>


            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt"
                            className='black_btn'>
                            Add new project
                        </Link>

                        <button type="button" onClick={signOut} className='outline_btn'>Sign Out</button>

                        <Link href='/profile'>
                            <Image src={session?.user.image}
                                width={37}
                                height={37}
                                alt="profile"
                                className='rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'
                            >
                                Join
                            </button>

                        ))}
                    </>
                )}
            </div>


            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt="profile"
                            className='rounded-full'
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href="profile"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>

                                <Link
                                    href="create-prompt"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black-btn'>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav