import Link from "next/link";

const Form = ({ type, setPost, submitting, handleSubmit, post }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="neon_green_gradient">{type} Project</span>
      </h1>
      <p className="font-satohshi font-semibold text-base text-gray-700 text-lg mt-5 max-w-2xl text-left max-w-md">
        {type} crowdfunding for you project! Fill in some basic data and start collecting funds today
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Project Name
          </span>
          <input 
          value={post.project_name}
          onChange={(e) => setPost({ ...post, project_name: e.target.value})}
          placeholder="Write your project name here..."
          required
          className="form_input"/>
        </label>
        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Project Description
          </span>
          <textarea 
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value})}
          placeholder="Write description here..."
          required
          className="form_textarea"/>
        </label>
        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Funding Goal
          </span>
          <input 
          value={post.goal}
          onChange={(e) => setPost({ ...post, goal: e.target.value})}
          placeholder="00.00$"
          required
          className="form_input"/>
        </label>
        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className='font-normal'>(#game, #product, #idea)</span>
          </span>
          <input 
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value})}
          placeholder="#tag"
          required
          className="form_input"/>
        </label>
        
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 button33 text-white text-md font-bold"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form