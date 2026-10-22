type PageHeroProps = { label: string; title: string; body: string; image: string };

export default function PageHero({ label, title, body, image }: PageHeroProps) {
  return (
    <section className="page-hero bg-[#F5F4FF] pb-20 pt-40">
      <div className="container-wide page-hero-grid grid items-end gap-10 lg:grid-cols-[1fr_.8fr]">
        <div className="page-hero-copy">
          <p className="eyebrow mb-5">{label}</p>
          <h1 className="section-title whitespace-pre-line">{title}</h1>
          <p className="body-copy mt-6 max-w-xl text-lg">{body}</p>
        </div>
        <div className="page-hero-image h-80 overflow-hidden rounded-[28px]">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
