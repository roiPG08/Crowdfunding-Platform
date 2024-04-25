import { useEffect } from 'react';
import '../styles/globals.css';
import Image from 'next/image';
import ErrorMessage from './ErrorMessage';
import { useSession } from 'next-auth/react';

const ProjectInfo = ({ projectData, setFundAmount, handleDonate, handleAddToFavorite, handleFundsWithdrawal, error }) => {
    const { data: session } = useSession();

    return (
        <section className='w-full'>
            <div className="mt-8 mx-auto w-3/4 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <div className="flex">
                    <div className="w-1/2 p-4">
                        {projectData.images?.length > 0 ? (
                            <Image src={`/assets/project-images/${projectData.images[0]}`} alt="Main Image" className="w-full"
                                width={300}
                                height={300}
                            />
                        ) : null}

                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {projectData.images?.length > 0 && projectData.images?.slice(1).map((image, index) => (
                                <Image key={index} src={`/assets/project-images/${image}`} alt={`Additional image ${index}`} className="w-full"
                                    width={1000}
                                    height={1000}
                                />
                            ))
                            }

                        </div>
                        <p className="mt-6">{projectData?.description}</p>

                        <p className="mt-4 flex">
                            <Image
                                src={'/assets/icons/category-icon.svg'}
                                width={24}
                                height={24}
                                alt='category'
                            />
                            <span className="font-bold px-2">{projectData?.tag}</span>
                        </p>
                    </div>


                    <div className="w-1/2 pl-8 p-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-4xl font-bold text-black">{projectData?.project_name}</h1>
                            {session?.user.id === projectData.creator._id && (
                             <button className="btn-donate p-8" onClick={handleFundsWithdrawal}>Withdraw Collected Funds</button>
                            )}
                            <button className="p-2 btn-favorite" onClick={handleAddToFavorite}>❤ Save</button>
                        </div>

                        <div className="mt-10">
                            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-4">
                                <div className="bg-green-600 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full" style={{ width: '0%' }}> 45%</div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-bold text-2xl">{projectData?.currentFunds} ETH</span>
                                    <p className="">Funds Raised</p>
                                </div>
                                <div>
                                    <span className="font-bold text-2xl">{projectData?.goal} ETH</span>
                                    <p className="">Funding Goal</p>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <span className="font-bold text-2xl">{projectData?.timeToFund}</span>
                                <p>Days To End</p>
                            </div>

                        </div>
                        <div className="mt-6 bg-gray-200 bg-opacity-25 rounded-lg shadow-lg p-3">
                            <label>
                                <span className="font-satohshi font-semibold text-base text-gray-700">
                                    Back up the project
                                </span>
                                <input
                                    type='number'
                                    onChange={(e) => {
                                        setFundAmount(e.target.value);
                                        //truncate number 2 points after '.' 
                                    }}
                                    placeholder="00.00$"
                                    required
                                    className="form_input" />
                            </label>
                            <p className="mt-4 text-sm text-gray-500">Please note that participating in blockchain-based crowdfunding carries risks. We cannot guarantee the delivery of rewards for backing a project. Factors like project failure or regulatory changes may impact outcomes. Conduct thorough research before contributing. By participating, you accept the inherent risks and agree not to hold us liable for any losses.</p>
                            <button className="btn-donate w-full mt-4 py-2" onClick={handleDonate}>Donate</button>
                            {error ? (
                                <ErrorMessage message={error.message}/>
                            ) : null}
                        </div>

                    </div>
                </div>
            </div>


            {/* Forum section */}
            <div className="mt-8 mx-auto w-3/4 bg-white bg-opacity-90 rounded-lg shadow-lg">

                {/* Navigation Bar */}
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap items-center justify-center -mb-px text-sm font-medium text-center w-full" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
                        <li className="w-full md:w-auto mx-6" role="presentation">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg" id="campaign-styled-tab" data-tabs-target="#styled-campaign" type="button" role="tab" aria-controls="campaign" aria-selected="false">Campaign</button>
                        </li>
                        <li className="w-full md:w-auto mx-6" role="presentation">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-green-300 dark:hover:text-gray-300" id="rewards-styled-tab" data-tabs-target="#styled-rewards" type="button" role="tab" aria-controls="rewards" aria-selected="false">Rewards</button>
                        </li>
                        <li className="w-full md:w-auto mx-6" role="presentation">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-green-300 dark:hover:text-gray-300" id="updates-styled-tab" data-tabs-target="#styled-updates" type="button" role="tab" aria-controls="updates" aria-selected="false">Updates</button>
                        </li>
                        <li className="w-full md:w-auto mx-6" role="presentation">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-green-300 dark:hover:text-gray-300" id="comments-styled-tab" data-tabs-target="#styled-comments" type="button" role="tab" aria-controls="comments" aria-selected="false">Comments</button>
                        </li>
                        <li className="w-full md:w-auto mx-6" role="presentation">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-green-300 dark:hover:text-gray-300" id="faq-styled-tab" data-tabs-target="#styled-faq" type="button" role="tab" aria-controls="faq" aria-selected="false">FAQ</button>
                        </li>
                    </ul>
                </div>

                {/* Content */}
                <div className="flex justify-between">
                    {/* Left Panel */}
                    <div className="w-1/4 pr-4 border-r border-gray-200 dark:border-gray-700">
                        <ul className="">
                            <li className="p-2 mx-4"><a href="#story" className="text-lg font-small text-gray-600 dark:text-gray-400 hover:text-black hover:font-medium dark:hover:text-gray-300">Story</a></li>
                            <li className="p-2 mx-4"><a href="#overview" className="text-lg font-small text-gray-600 dark:text-gray-400 hover:text-black hover:font-medium dark:hover:text-gray-300">Overview</a></li>
                            <li className="p-2 mx-4"><a href="#rewards" className="text-lg font-small text-gray-600 dark:text-gray-400 hover:text-black hover:font-medium dark:hover:text-gray-300">Rewards</a></li>
                            <li className="p-2 mx-4"><a href="#shipping" className="text-lg font-small text-gray-600 dark:text-gray-400 hover:text-black hover:font-medium dark:hover:text-gray-300">Shipping</a></li>
                            <li className="p-2 mx-4"><a href="#gameplay" className="text-lg font-small text-gray-600 dark:text-gray-400 hover:text-black hover:font-medium dark:hover:text-gray-300">Gameplay</a></li>
                        </ul>
                    </div>

                    {/* Main Panel */}
                    <div className="w-1/2 px-4">
                        <div id="default-styled-tab-content">
                            <p>TO BE DONE</p>
                            <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-campaign" role="tabpanel" aria-labelledby="campaign-tab">
                                <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                            <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-rewards" role="tabpanel" aria-labelledby="rewards-tab">
                                <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                            <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-faq" role="tabpanel" aria-labelledby="faq-tab">
                                <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                            <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-updates" role="tabpanel" aria-labelledby="updates-tab">
                                <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                            <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-comments" role="tabpanel" aria-labelledby="comments-tab">
                                <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                        </div>
                    </div>


                    {/* Right Panel */}
                    <div className="w-1/4 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-2">Creator</h2>
                        <p>Description about the creator...</p>
                        <h2 className="text-lg font-bold mt-4 mb-2">Support</h2>
                        <p>Description about the support...</p>
                        <h2 className="text-lg font-bold mt-4 mb-2">Rewards</h2>
                        <ul>
                            <li>Reward 1</li>
                            <li>Reward 2</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectInfo;