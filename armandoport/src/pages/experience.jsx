export default function Experience() {
  return (
    <section className="experience-page">
      <h1>Experience</h1>

      <div className="experience-list">
        <article className="experience-card">
          <div className="experience-card__heading">
            <div>
              <h2>Post Consumer Brands</h2>
              <p className="experience-card__role">Operator</p>
            </div>
            <p className="experience-card__details">Northfield, MN · May 2024 – Present</p>
          </div>
          <ul>
            <li>
              Perform production changeovers across cereal SKUs, adjusting shells, carton sizes,
              and fill weights to meet order specifications.
            </li>
            <li>
              Operate and monitor a robotic palletizing system that builds pallets from finished
              cases, and troubleshoot faults to keep the line running.
            </li>
            <li>
              Run quality checks on fill weight, bag seal integrity, and moisture, and report
              results and sanitation status to shift leads.
            </li>
            <li>
              Configure laser coding equipment to print expiration dates and lot codes on
              packaging, verifying accuracy for traceability.
            </li>
            <li>Clean and sanitize the BSU to food safety standards.</li>
          </ul>
        </article>

        <article className="experience-card">
          <div className="experience-card__heading">
            <div>
              <h2>University of Minnesota</h2>
              <p className="experience-card__role">IT Help Desk Agent</p>
            </div>
            <p className="experience-card__details">Minneapolis, MN · August 2021 – May 2025</p>
          </div>
          <ul>
            <li>
              Diagnosed and resolved hardware, software, and account issues for students and
              faculty, keeping university systems running smoothly.
            </li>
            <li>
              Entered and maintained student records in Microsoft Excel with 100% accuracy across
              500+ records.
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}
