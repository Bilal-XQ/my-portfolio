export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bilal EL AZZAM",
    alternateName: ["Bilal ELAZZAM", "بلال العزام"],
    jobTitle: [
      "Full-Stack Developer",
      "Computer Science Student", 
      "Web Developer",
      "Développeur Web",
      "مطور ويب"
    ],
    description: "Computer Science Student and Full-Stack Developer from Safi, Morocco, specializing in React, Next.js, and TypeScript.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Safi",
      addressRegion: "Marrakech-Safi",
      addressCountry: "MA"
    },
    knowsAbout: [
      "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
      "Web Development", "Frontend Development", "Backend Development",
      "Full-Stack Development", "Computer Science", "HTML", "CSS",
      "Python", "Git", "MongoDB", "PostgreSQL"
    ],
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Safi",
        addressRegion: "Marrakech-Safi", 
        addressCountry: "Morocco"
      }
    },
    nationality: "Moroccan",
    birthPlace: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
