
type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body?: string;
};

export default function SectionIntro({
  eyebrow,
  title,
  body,
}: SectionIntroProps) {
  return (
    <div className="mb-14 max-w-3xl">
      <p className="eyebrow mb-5">{eyebrow}</p>

      <h2 className="section-title whitespace-pre-line">
        {title}
      </h2>

      {body && (
        <p className="body-copy mt-6 max-w-2xl text-lg">
          {body}
        </p>
      )}
    </div>
  );
}
