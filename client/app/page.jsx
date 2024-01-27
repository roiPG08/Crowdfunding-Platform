import Feed from '../components/Feed';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <section className="w-full flex-col">
      <div className='flex-left pl-18 py-28'>
        <h1 className="head_text text-left ">
        <span className="gold-text text-left pb-1">DREAM</span>
        <br className="max-md:hidden" />
        <span className="gold-text text-left">FUND</span>
        <br className="max-md:hidden" />
        <span className="gold-text text-left">IMPACT</span>
        </h1>
      </div>
        

        <Feed />
        <Footer />
    </section>
  )
}

export default Home