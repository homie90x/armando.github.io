import { Link, useParams } from 'react-router-dom'
import altoidsVideo from '../assets/altoids.mp4'
import keychainVideo from '../assets/keychain.mp4'
import monsterVideo from '../assets/monster.mp4'
import roboArmVideo from '../assets/roboarm.mp4'
import roboCatVideo from '../assets/robocat.mp4'
import ChromaGrid from '../components/ChromaGrid'

const publicAsset = filename => `${import.meta.env.BASE_URL}assets/${filename}`

const projects = [
  {
    slug: 'prison-realm-eyes',
    image: publicAsset('prison-realm-eyes.svg'),
    video: monsterVideo,
    title: 'Prison Realm Eyes',
    subtitle: 'Animatronic Halloween Build',
    accent: '#a98bff',
    description: [
      <>
        An animatronic piece inspired by the Prison Realm from <em>Jujutsu Kaisen</em>: three
        3D-printed eyeballs mounted at random heights around a white Monster Energy can, each
        glancing around independently. I designed the eyes in Fusion 360. Each one pans and tilts on
        a LEGO universal joint, driven by two SG90 micro servos linked with wire. An ESP32 controls
        all six servos through a PCA9685 16-channel PWM driver, and the whole build runs on battery
        power with an on/off switch.
      </>,
      <>
        The main challenge was mechanical. Every eye had its own range of motion, so I calibrated
        each servo’s low, center, and high positions individually. I also wrote the motion logic so
        only one servo per eye moves at a time, which prevents the linkages from jamming, while all
        three eyes still move randomly at once. I’m now building a second version: five eyes in flat
        pods mounted inside a cereal box.
      </>
    ],
    technologies: 'ESP32, PCA9685, SG90 servos, Fusion 360, 3D printing, Arduino/C++'
  },
  {
    slug: 'so-101-robot-arm',
    image: publicAsset('so-101-robot-arm.svg'),
    video: roboArmVideo,
    title: 'SO-101 Robot Arm',
    subtitle: 'Robot Arm',
    accent: '#3fb8ff',
    description: [
      <>
        A pair of open-source SO-101 robot arms built for teleoperation: when I move the leader arm
        by hand, the follower arm mirrors it in real time. I assembled both arms and configured the
        serial bus servo IDs. I then set up and calibrated the system on Windows using Python 3.12
        and Hugging Face’s LeRobot framework, which supports teleoperation, recording
        demonstrations, and training robot learning policies.
      </>,
      <>
        <strong>Next step:</strong> a handheld controller with a screen, joystick, and buttons,
        programmed in C, to run teleop, record, and replay from a menu instead of the command line.
      </>
    ],
    technologies: 'Python, LeRobot, Feetech serial bus servos, 3D printing, Windows'
  },
  {
    slug: 'bongo-cat-keychains',
    image: publicAsset('bongo-cat-keychains.svg'),
    video: keychainVideo,
    title: 'Bongo Cat Keychains',
    subtitle: 'OLED Keychain',
    accent: '#ff8a4c',
    description: [
      <>
        Pocket-sized keychains that play the Bongo Cat meme on a tiny OLED screen. Pressing the
        buttons makes the cat drum. The project is based on an open-source ESP32 Bongo Cat project,
        which I adapted for my hardware: an ESP32-C3 Super Mini, a 1.3&quot; SH1106 OLED display (the
        original code targeted a different display controller), push buttons, and a CR2032 coin-cell
        holder with a power switch.
      </>,
      <>
        I hand-soldered each board onto a protoboard and designed colorful 3D-printed cases. I made
        a batch and gave them away at a rave instead of kandi, and documented the build as an
        episode of my video series.
      </>
    ],
    technologies: 'ESP32-C3, SH1106 OLED (I2C), Arduino/C++, soldering, 3D printing'
  },
  {
    slug: 'robo-cat',
    image: publicAsset('robocat.svg'),
    video: roboCatVideo,
    title: 'RoboCat',
    accent: '#7cc4ff'
  },
  {
    slug: 'altoids-gameboy',
    image: publicAsset('altoids-gameboy.svg'),
    video: altoidsVideo,
    title: 'Altoids Gameboy',
    accent: '#ffb27a'
  }
]

export default function Projects() {
  const items = projects.map(project => ({
    image: project.image,
    title: project.title,
    subtitle: project.subtitle,
    accent: project.accent,
    url: `/projects/${project.slug}`
  }))

  return (
    <section className="projects-page">
      <h1>Projects</h1>
      <ChromaGrid
        className="projects-grid"
        items={items}
        columns={3}
        minCardWidth={220}
        gap={18}
        radius={280}
        cardRadius={20}
        aspectRatio="4 / 3"
      />
    </section>
  )
}

export function ProjectDetails() {
  const { projectId } = useParams()
  const project = projects.find(item => item.slug === projectId)

  if (!project) {
    return (
      <section className="project-detail">
        <h1>Project not found</h1>
        <Link className="project-detail__back" to="/projects">
          Back to projects
        </Link>
      </section>
    )
  }

  return (
    <article className="project-detail">
      <Link className="project-detail__back" to="/projects">
        <span aria-hidden="true">&larr;</span> All projects
      </Link>
      <video
        className="project-detail__video"
        src={project.video}
        controls
        playsInline
        preload="metadata"
        aria-label={`${project.title} project video`}
      />
      <header className="project-detail__header">
        {project.subtitle && <p className="eyebrow">{project.subtitle}</p>}
        <h1>{project.title}</h1>
      </header>
      {(project.description || project.technologies) && (
        <div className="project-detail__description">
          {project.description?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {project.technologies && (
            <p className="project-detail__tech">
              <strong>Tech:</strong> {project.technologies}
            </p>
          )}
        </div>
      )}
    </article>
  )
}
