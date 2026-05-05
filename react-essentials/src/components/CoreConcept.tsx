export type CoreConceptProps = {
  title: string;
  imgSrc: string;
  description: string;
};

export default function CoreConcept({ title, imgSrc, description }: CoreConceptProps) {
  return (
    <li>
      <img src={imgSrc} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}