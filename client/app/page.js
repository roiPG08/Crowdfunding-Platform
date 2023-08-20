import Feed from '../components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Discover our new
        <br className="max-md:hidden" />
        <span className="pink_gradient text-center"> Crowdfunding Platform</span>
        </h1>
        <p className="desc text-center">
            CP is utilizing blockchain technology for more secure payment transfers that current crowdfunding market have not seen before!
        </p>

        <Feed />
    </section>
  )
}

export default Home