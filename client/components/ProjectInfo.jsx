import '../styles/globals.css';

const ProjectInfo = ({ projectData, handleDonate, handleAddToFavorite }) => {
    return (
        <section className='w-full'>
            <div className="mt-8 mx-auto w-3/4 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <div className="flex">
                    <div className="w-1/2 p-4">
                        <img src={'/assets/images/project.svg'} alt="Main Image" className="w-full" />
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            <img src={'/assets/images/project.svg'} alt="Image 1" />
                            <img src={'/assets/images/project.svg'} alt="Image 2" />
                            <img src={'/assets/images/project.svg'} alt="Image 3" />
                            <img src={'/assets/images/project.svg'} alt="Image 4" />
                        </div>
                        <p className="mt-4">Category: <span className="font-bold">Your Category</span></p>
                        <p>Location: <span className="font-bold">Your Location</span></p>
                    </div>


                    <div className="w-1/2 pl-8 p-4">
                        <h1 className="text-2xl font-bold text-black">Project Title</h1>
                        <p className="mt-2">Project description...</p>
                        <div className="mt-4">

                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                <div className="bg-green-600 h-2.5 rounded-full dark:bg-green-500" style={{ width: '45%' }}></div>
                            </div>

                            <p className="mt-2">Funds Raised: <span className="font-bold">$Amount</span></p>
                            <p>Days to End: <span className="font-bold">Number of Days</span></p>
                        </div>
                        <div className="flex">
                        <button className="btn-donate mt-4 py-2" onClick={handleDonate}>Donate</button>
                        <button className="mt-4 mx-4 px-4 py-2 btn-favorite" onClick={handleAddToFavorite}>❤ Save</button>
                        </div>

                        <p className="mt-4 text-sm text-gray-500">Please note that participating in blockchain-based crowdfunding carries risks. We cannot guarantee the delivery of rewards for backing a project. Factors like project failure or regulatory changes may impact outcomes. Conduct thorough research before contributing. By participating, you accept the inherent risks and agree not to hold us liable for any losses.</p>
                    </div>
                </div>
            </div>


            {/* Forum section */}
            <div className="mt-8 mx-auto w-3/4 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <div className="flex justify-between mb-4 p-4">
                    <a href="#campaign" className="text-blue-500">Campaign</a>
                    <a href="#rewards" className="text-blue-500">Rewards</a>
                    <a href="#faq" className="text-blue-500">FAQ</a>
                    <a href="#updates" className="text-blue-500">Updates</a>
                    <a href="#comments" className="text-blue-500">Comments</a>
                </div>

                <div className="flex justify-between">
                    <div className="w-1/4 pr-4">
                        <h2 className="text-lg font-bold mb-2">Navigation</h2>
                        <ul>
                            <li><a href="#story" className="text-blue-500">Story</a></li>
                            <li><a href="#overview" className="text-blue-500">Overview</a></li>
                            <li><a href="#rewards" className="text-blue-500">Rewards</a></li>
                            <li><a href="#shipping" className="text-blue-500">Shipping</a></li>
                            <li><a href="#gameplay" className="text-blue-500">Gameplay</a></li>
                        </ul>
                    </div>

                    <div className="w-1/2 px-4">
                    </div>

                    <div className="w-1/4 pl-4">
                        <h2 className="text-lg font-bold mb-2">Creator</h2>
                        <p>Description about the creator...</p>
                        <h2 className="text-lg font-bold mt-4 mb-2">Support</h2>
                        <p>Description about the support...</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Donate</button>
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