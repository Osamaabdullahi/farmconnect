import Link from "next/link";

const HeroSection = () => (
  <section className="pt-16 bg-green-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
        <div className="py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connecting Farmers with Businesses, Fresh & Fast!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            FarmConnect helps farmers sell directly to restaurants & stores,
            ensuring fresh, local produce at fair prices.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={"sighup?role=farmer"}
              className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700"
            >
              Start Selling
            </Link>
            <Link
              href={"/browse"}
              className="bg-white text-green-600 px-8 py-3 rounded-full hover:bg-green-50 border border-green-600"
            >
              Browse Produce
            </Link>
          </div>
        </div>
        <div className="relative h-full min-h-[400px] md:min-h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://i.pinimg.com/474x/9c/3e/60/9c3e60990ab1c10db15ad2780c02e5b2.jpg"
              alt="Farmer with fresh produce"
              className="rounded-2xl shadow-lg object-cover w-full h-full max-h-[80vh]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
