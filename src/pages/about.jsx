export default function About() {
  return (
    <section className="about-page">
      <header className="about-header">
        <h1>About Me</h1>
        <p>
          I’m Armando, a Computer Science graduate and aspiring robotics engineer based in
          Northfield, Minnesota. I enjoy building projects that connect software with the physical
          world, from teleoperated robot arms to embedded devices.
        </p>
        <nav className="about-contact" aria-label="Contact and profile links">
          <a href="mailto:armando.avjavj@gmail.com">Email</a>
          <a href="tel:+15075813228">(507) 581-3228</a>
          <a href="https://linkedin.com/in/armando148" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/valde148" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
        <p className="about-citizenship">U.S. Citizen</p>
      </header>

      <div className="about-sections">
        <section className="about-card" aria-labelledby="about-skills">
          <h2 id="about-skills">Skills</h2>
          <dl className="about-skills">
            <div>
              <dt>Languages</dt>
              <dd>C, Python, Java, Rust, JavaScript, SQL (MySQL)</dd>
            </div>
            <div>
              <dt>Embedded &amp; Hardware</dt>
              <dd>Arduino, Raspberry Pi, ESP32, I2C/UART, servo control, soldering, sensor integration</dd>
            </div>
            <div>
              <dt>Tools &amp; Platforms</dt>
              <dd>Git, SolidWorks, Blender, Microsoft Excel</dd>
            </div>
            <div>
              <dt>Spoken Languages</dt>
              <dd>English (fluent), Spanish (fluent), Mandarin Chinese (intermediate)</dd>
            </div>
          </dl>
        </section>

        <section className="about-card" aria-labelledby="about-projects">
          <h2 id="about-projects">Selected Projects</h2>
          <div className="about-project-list">
            <article>
              <h3>SO-101 Leader/Follower Robot Arm</h3>
              <p className="about-technologies">Python · LeRobot · Serial servos</p>
              <p>
                Assembled, configured, and calibrated a pair of 6-DOF robot arms for real-time
                teleoperation, where the follower mirrors the leader’s movements.
              </p>
            </article>
            <article>
              <h3>Gesture-Controlled Robotic Hand</h3>
              <p className="about-technologies">Arduino UNO · Blender · Flex sensors · MG995 servos</p>
              <p>
                Built a robotic hand that mirrors finger movements by reading flex sensors in a
                glove and driving five servos. Designed and 3D-printed the hand with fishing-line
                tendons and elastic returns.
              </p>
            </article>
            <article>
              <h3>ESP32 OLED Keychain</h3>
              <p className="about-technologies">ESP32-C3 · C++ · I2C · SH1106 OLED</p>
              <p>
                Adapted open-source firmware to create a battery-powered animated keychain with a
                custom button input and a hand-soldered perfboard.
              </p>
            </article>
          </div>
        </section>

        <section className="about-card" aria-labelledby="about-education">
          <h2 id="about-education">Education</h2>
          <div className="about-education-entry">
            <div>
              <h3>University of Minnesota</h3>
              <p>B.S. in Computer Science · GPA: 3.9 · Dean’s List</p>
            </div>
            <p className="about-date">May 2025</p>
          </div>
          <div className="about-education-entry">
            <div>
              <h3>Shilin High School of Commerce</h3>
              <p>Rotary Youth Exchange, Taipei, Taiwan · Chinese Learning Certificate</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
