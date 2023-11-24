import Feed from '../components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-col">
      <div className='flex-left p-32'>
        <h1 className="head_text text-left ">
        <span className="gold-text text-left pb-1">DREAM</span>
        <br className="max-md:hidden" />
        <span className="gold-text text-left">FUND</span>
        <br className="max-md:hidden" />
        <span className="gold-text text-left">IMPACT</span>
        </h1>
      </div>
        

        <Feed />
    </section>
  )
}

export default Home