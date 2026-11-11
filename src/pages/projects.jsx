export default function Projects() {
  return (
    <section className="projects-page">
      <h1>Projects</h1>

      <div className="project-list">
        <article className="project-card">
          <h2>Prison Realm Eyes — Animatronic Halloween Build</h2>
          <p>
            An animatronic piece inspired by the Prison Realm from <em>Jujutsu Kaisen</em>: three
            3D-printed eyeballs mounted at random heights around a white Monster Energy can, each
            glancing around independently. I designed the eyes in Fusion 360. Each one pans and
            tilts on a LEGO universal joint, driven by two SG90 micro servos linked with wire. An
            ESP32 controls all six servos through a PCA9685 16-channel PWM driver, and the whole
            build runs on battery power with an on/off switch.
          </p>
          <p>
            The main challenge was mechanical. Every eye had its own range of motion, so I
            calibrated each servo’s low, center, and high positions individually. I also wrote the
            motion logic so only one servo per eye moves at a time, which prevents the linkages
            from jamming, while all three eyes still move randomly at once. I’m now building a
            second version: five eyes in flat pods mounted inside a cereal box.
          </p>
          <p className="project-tech">
            <strong>Tech:</strong> ESP32, PCA9685, SG90 servos, Fusion 360, 3D printing,
            Arduino/C++
          </p>
        </article>

        <article className="project-card">
          <h2>SO-101 Robot Arm — Leader/Follower Teleoperation</h2>
          <p>
            A pair of open-source SO-101 robot arms built for teleoperation: when I move the
            leader arm by hand, the follower arm mirrors it in real time. I assembled both arms and
            configured the serial bus servo IDs. I then set up and calibrated the system on Windows
            using Python 3.12 and Hugging Face’s LeRobot framework, which supports teleoperation,
            recording demonstrations, and training robot learning policies.
          </p>
          <p>
            <strong>Next step:</strong> a handheld controller with a screen, joystick, and buttons,
            programmed in C, to run teleop, record, and replay from a menu instead of the command
            line.
          </p>
          <p className="project-tech">
            <strong>Tech:</strong> Python, LeRobot, Feetech serial bus servos, 3D printing, Windows
          </p>
        </article>

        <article className="project-card">
          <h2>Bongo Cat Keychains — Wearable OLED Gadget</h2>
          <p>
            Pocket-sized keychains that play the Bongo Cat meme on a tiny OLED screen. Pressing the
            buttons makes the cat drum. The project is based on an open-source ESP32 Bongo Cat
            project, which I adapted for my hardware: an ESP32-C3 Super Mini, a 1.3&quot; SH1106 OLED
            display (the original code targeted a different display controller), push buttons, and
            a CR2032 coin-cell holder with a power switch. I hand-soldered each board onto a
            protoboard and designed colorful 3D-printed cases. I made a batch and gave them away at
            a rave instead of kandi, and documented the build as an episode of my video series.
          </p>
          <p className="project-tech">
            <strong>Tech:</strong> ESP32-C3, SH1106 OLED (I2C), Arduino/C++, soldering, 3D printing
          </p>
        </article>
      </div>
    </section>
  )
}
