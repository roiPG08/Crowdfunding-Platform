'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { getAllProjects } from "@src/api/projects";


const ProjectCardList = ({ data, handleTagClick }) => {

  return (
    <div className='w-full sm:px-6 sm:py-24 lg:px-4'>
      <p className='font-satohshi font-semibold text-white text-2xl my-5'>All Campaigns:</p>
      <div className='flex items-center space-x-4'>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
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

  const handleShowProject = (project) => {
    router.push(`/project-page?id=${project._id}`);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAllProjects();
      const data = await response.json();
      setPosts(data);
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