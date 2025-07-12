import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Welcome() {
  return (
    <div className="bg-[#F1DDCF] min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-[#B3446C] mb-2">Welcome to VelvetMuse</h1>
      <p className="text-lg text-[#874755] mb-6">Where elegance meets skincare 💫</p>

      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={4000}
        showStatus={false}
        className="w-full max-w-xl rounded-lg shadow-lg"
      >
        <div>
          <img
            src="https://images.unsplash.com/photo-1638301868496-43577744a46c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Serum"
            className="w-full h-[400px] object-cover"
          />
          <p className="legend">Hydrating Serums for that dewy glow ✨</p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1626895872564-b691b6877b83?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Lipstick"
            className="w-full h-[400px] object-cover"
          />
          <p className="legend">Bold matte lips. No smudge. 💄</p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Blush"
            className="w-full h-[400px] object-cover"
          />
          <p className="legend">Blush that looks like love 💕</p>
        </div>
      </Carousel>

      <Link to="/shop">
        <button className="mt-8 bg-[#B3446C] text-white px-6 py-2 rounded hover:bg-[#93354f] transition">
          Enter Store 🛍
        </button>
      </Link>
    </div>
  );
}

export default Welcome;
