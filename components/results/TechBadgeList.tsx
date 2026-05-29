// components/results/TechBadgeList.tsx

interface TechBadgeListProps {
  technologies: string[];
}

export default function TechBadgeList({
  technologies,
}: TechBadgeListProps) {
  if (!technologies.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}