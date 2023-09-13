'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

const ProjectCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <ProjectCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
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
      const response = await fetch('/api/prompt');
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
          placeholder='Search for a tag or a username'
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