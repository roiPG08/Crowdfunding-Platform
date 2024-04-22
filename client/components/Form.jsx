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
            value={post.project_name || ''}
            onChange={(e) => setPost({ ...post, project_name: e.target.value })}
            placeholder="Write your project name here..."
            required
            className="form_input" />
        </label>

        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Upload Project Photos
          </span>
          <input className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
          id="default_size" 
          onChange={(e) => {
            const files = Array.from(e.target.files);
            setPost({ ...post, imageFiles: files });
          }}
          type="file"></input>
          {/* <div className="flex items-center justify-center w-full">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div> */}
        </label>

        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Project Description
          </span>
          <textarea
            value={post.description || ''}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder="Write description here..."
            required
            className="form_textarea" />
        </label>
        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Funding Goal
          </span>
          <input
            type="number"
            value={post.goal || ''}
            onChange={(e) => setPost({ ...post, goal: e.target.value })}
            placeholder="00.00$"
            required
            className="form_input" />
        </label>
        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Funding End Date
          </span>
          <input
            type="Date"
            value={post.timeToFund || ''}
            onChange={(e) => {
              console.log(e.target.value);
              setPost({ ...post, timeToFund: e.target.value });
            }}
            required
            className="form_input" />
        </label>
        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Category {` `}
            <span className='font-normal'>(game, product, idea)</span>
          </span>
          <input
            value={post.tag || ''}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="Category"
            required
            className="form_input" />
        </label>
        <label>
          <span className="font-satohshi font-semibold text-base text-gray-700">
            Location
          </span>
          <input
            value={post.location || ''}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            placeholder="Location"
            required
            className="form_input" />
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