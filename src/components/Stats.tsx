
export default function Stats() {
  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section className="bg-adhirachna-light py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-adhirachna-blue mb-2">
                {stat.number}
              </div>
              <div className="text-adhirachna-gray font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
