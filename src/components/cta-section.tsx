export default function CTASection() {
  return (
    <section className="bg-neutral-100 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              LIKE WHAT YOU SEE? SIGN UP!
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't waste another minute. Create an account now and search right candidate.
            </p>
          </div>

          {/* Right Button */}
          <div className="flex-shrink-0">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
