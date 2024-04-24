'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { ethers } from 'ethers';
import { abi }  from "../artifacts/contracts/Campaign.sol/Campaign.json";

const ProjectCardList = ({ data, handleTagClick }) => {

  return (
    <div className='w-full sm:px-8 sm:py-24 lg:px-4'>
      <div className='flex items-center space-x-8'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8'>
            {data.length > 0 && (
              <>
                {data.map((post, index) => (
                  <ProjectCard 
                    key={index} 
                    post={post} 
                    handleTagClick={handleTagClick} 
                  />
                ))}
              </>
            )}
          </div>
      </div>
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);


  const filterPrompts = (searchedText) => {
    const regex = new RegExp(searchedText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }

  const handleSearchChange = (e) => {
    try {
      setSearchText(e.target.value);

      const searchedPrompts = filterPrompts(e.target.value);
      setSearchedResults(searchedPrompts);
    } catch (error) {
      console.log(error);
    }

  }

  const handleTagClick = (e) => {

    setSearchText(e);

    const searchedPrompts = filterPrompts(e);
    setSearchedResults(searchedPrompts);

  }

  useEffect(() => {
    const fetchPosts = async () => {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const Campaign = new ethers.Contract(process.env.NEXT_PUBLIC_LOCALHOST_CONTRACT_ADDRESS, abi, signer);  

      const projects = await Campaign.getAllProjects();

      const formattedProjects = await Promise.all(projects.map(async (element) => {
        const fetchUserData = await fetch(`/api/users/${element.creatorId}`);
        const userData = await fetchUserData.json();
      
        return {
          id: element.id.toNumber(),
          creator: userData,
          project_name: element.name,
          description: element.description,
          projectOwner: element.projectOwner,
          isFunded: element.isFunded,
          status: element.status,
          goal: element.goal.toNumber(),
          tag: element.tag,
          images: element.images,
          timeToFund: element.unlockTime.toNumber(),
          creationDate: element.creationDate.toNumber(),
          currentFunds: ethers.utils.formatEther(element.currentFunds),
          transactions: element.transactions
        };
      }));

      setPosts(formattedProjects);
    }

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Find your dream project'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'>
        </input>
      </form>
      <div className='flex flex-wrap items-start'>
        {searchText ? (
          <ProjectCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <ProjectCardList
            data={posts}
            handleTagClick={handleTagClick}
          />
        )}
      </div>


    </section>
  )
}

export default Feed;