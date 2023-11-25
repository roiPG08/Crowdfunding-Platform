'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

const ProjectCardList = ({ data, handleTagClick }) => {

  const [scrollIndex, setScrollIndex] = useState(0);

  const cardsPerPage = 3;
  const totalCards = data.length;

  const handlePrevClick = () => {
    const newIndex = (scrollIndex - 1 + totalCards) % totalCards;
    setScrollIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = (scrollIndex + 1) % totalCards;
    setScrollIndex(newIndex);
  };

  const cardContainerStyle = {
    transform: `translateX(-${(scrollIndex * 100) / cardsPerPage}%)`,
    transition: 'transform 300ms ease-in-out',
  };

  return (
    <div className='mt-16'>
      <div className='flex items-center space-x-4'>
        <button onClick={handlePrevClick} className='text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-full text-xl p-2.5 text-center me-2 mb-2'>
          &#8249;
        </button>
        <div className='flex space-x-4 overflow-x-hidden'>
          {totalCards > 0 && (
            <>
              {[...data, ...data, ...data].slice(scrollIndex, scrollIndex + cardsPerPage).map((post, index) => (
                <ProjectCard key={index} post={post} handleTagClick={handleTagClick} />
              ))}
            </>
          )}
        </div>
        <button onClick={handleNextClick} type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-full text-xl p-2.5 text-center me-2 mb-2">
          &#8250;
        </button>
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
      const response = await fetch('/api/project');
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

    </section>
  )
}

export default Feed;